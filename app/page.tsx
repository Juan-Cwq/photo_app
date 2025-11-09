'use client'

import { useState } from 'react'
import WebcamFilter from '@/components/WebcamFilter'
import ControlPanel from '@/components/ControlPanel'

export default function Home() {
  const [currentFilter, setCurrentFilter] = useState<string>('none')
  const [gaussianKernel, setGaussianKernel] = useState<number>(9)
  const [gaussianSigma, setGaussianSigma] = useState<number>(3)
  const [showSideBySide, setShowSideBySide] = useState<boolean>(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Photo Filter App
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time video filters with adjustable parameters
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
              gaussianKernel={gaussianKernel}
              setGaussianKernel={setGaussianKernel}
              gaussianSigma={gaussianSigma}
              setGaussianSigma={setGaussianSigma}
              showSideBySide={showSideBySide}
              setShowSideBySide={setShowSideBySide}
            />
          </div>

          {/* Webcam Display */}
          <div className="lg:col-span-3">
            <WebcamFilter
              currentFilter={currentFilter}
              gaussianKernel={gaussianKernel}
              gaussianSigma={gaussianSigma}
              showSideBySide={showSideBySide}
            />
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with Next.js • Real-time browser-based filters</p>
        </footer>
      </div>
    </main>
  )
}
