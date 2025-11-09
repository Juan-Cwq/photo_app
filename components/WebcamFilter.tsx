'use client'

import { useRef, useEffect, useState } from 'react'
import { applyFilter } from '@/lib/filters'

interface WebcamFilterProps {
  currentFilter: string
  gaussianKernel: number
  gaussianSigma: number
  showSideBySide: boolean
}

export default function WebcamFilter({
  currentFilter,
  gaussianKernel,
  gaussianSigma,
  showSideBySide,
}: WebcamFilterProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    startWebcam()
    return () => {
      stopWebcam()
    }
  }, [])

  useEffect(() => {
    if (isStreaming) {
      processFrame()
    }
  }, [currentFilter, gaussianKernel, gaussianSigma, showSideBySide, isStreaming])

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
          setIsStreaming(true)
          processFrame()
        }
      }
    } catch (err) {
      setError('Unable to access webcam. Please grant camera permissions.')
      console.error('Error accessing webcam:', err)
    }
  }

  const stopWebcam = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
  }

  const processFrame = () => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animationRef.current = requestAnimationFrame(processFrame)
      return
    }

    // Set canvas size to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    if (showSideBySide) {
      // Side-by-side comparison
      const halfWidth = canvas.width / 2

      // Draw original on left half
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height, 0, 0, halfWidth, canvas.height)

      // Draw filtered on right half
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height, halfWidth, 0, halfWidth, canvas.height)
      
      const rightImageData = ctx.getImageData(halfWidth, 0, halfWidth, canvas.height)
      const filteredData = applyFilter(rightImageData, currentFilter, {
        kernelSize: gaussianKernel,
        sigma: gaussianSigma,
      })
      ctx.putImageData(filteredData, halfWidth, 0)

      // Draw dividing line
      ctx.strokeStyle = '#00FFFF'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(halfWidth, 0)
      ctx.lineTo(halfWidth, canvas.height)
      ctx.stroke()

      // Draw labels
      drawLabel(ctx, 'ORIGINAL', 20, 60, '#FFFFFF', '#666666')
      drawLabel(ctx, 'FILTERED', halfWidth + 20, 60, '#00FF00', '#00FF00')
    } else {
      // Full screen filtered view
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      if (currentFilter !== 'none') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const filteredData = applyFilter(imageData, currentFilter, {
          kernelSize: gaussianKernel,
          sigma: gaussianSigma,
        })
        ctx.putImageData(filteredData, 0, 0)
      }
    }

    // Draw filter info
    drawFilterInfo(ctx, canvas.width, currentFilter, gaussianKernel, gaussianSigma)

    animationRef.current = requestAnimationFrame(processFrame)
  }

  const drawLabel = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    textColor: string,
    borderColor: string
  ) => {
    ctx.font = 'bold 24px Arial'
    const metrics = ctx.measureText(text)
    const padding = 15

    // Background
    ctx.fillStyle = 'rgba(40, 40, 40, 0.9)'
    ctx.fillRect(x - 10, y - 30, metrics.width + padding * 2, 40)

    // Border
    ctx.strokeStyle = borderColor
    ctx.lineWidth = 2
    ctx.strokeRect(x - 10, y - 30, metrics.width + padding * 2, 40)

    // Text
    ctx.fillStyle = textColor
    ctx.fillText(text, x, y)
  }

  const drawFilterInfo = (
    ctx: CanvasRenderingContext2D,
    width: number,
    filter: string,
    kernel: number,
    sigma: number
  ) => {
    const text =
      filter === 'gaussian'
        ? `Filter: GAUSSIAN BLUR (K:${kernel}, S:${sigma})`
        : `Filter: ${filter.toUpperCase()}`

    ctx.font = 'bold 20px Arial'
    const metrics = ctx.measureText(text)
    const x = width - metrics.width - 30
    const y = 35

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.fillRect(x - 10, 10, metrics.width + 20, 35)

    // Text
    ctx.fillStyle = '#00FF00'
    ctx.fillText(text, x, y)
  }

  const downloadImage = () => {
    if (!canvasRef.current) return

    const link = document.createElement('a')
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    link.download = `photo-filter-${currentFilter}-${timestamp}.png`
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-8 text-center">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
        <video ref={videoRef} className="hidden" playsInline />
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
          style={{ maxHeight: '70vh' }}
        />
        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading webcam...</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={downloadImage}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          📸 Download Image
        </button>
      </div>
    </div>
  )
}
