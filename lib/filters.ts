// Filter application functions for canvas ImageData

interface FilterOptions {
  kernelSize?: number
  sigma?: number
}

export function applyFilter(
  imageData: ImageData,
  filterType: string,
  options: FilterOptions = {}
): ImageData {
  switch (filterType) {
    case 'gaussian':
      return applyGaussianBlur(imageData, options.kernelSize || 15, options.sigma || 5)
    case 'box':
      return applyBoxBlur(imageData)
    case 'sharpen':
      return applySharpen(imageData)
    case 'edge':
      return applyEdgeDetection(imageData)
    case 'grayscale':
      return applyGrayscale(imageData)
    default:
      return imageData
  }
}

// Gaussian Blur Filter
function applyGaussianBlur(
  imageData: ImageData,
  kernelSize: number,
  sigma: number
): ImageData {
  const kernel = createGaussianKernel(kernelSize, sigma)
  return applyConvolution(imageData, kernel, kernelSize)
}

// Create Gaussian kernel
function createGaussianKernel(size: number, sigma: number): number[] {
  const kernel: number[] = []
  const mean = Math.floor(size / 2)
  let sum = 0

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const exponent = -((x - mean) ** 2 + (y - mean) ** 2) / (2 * sigma ** 2)
      const value = Math.exp(exponent) / (2 * Math.PI * sigma ** 2)
      kernel.push(value)
      sum += value
    }
  }

  // Normalize
  return kernel.map((v) => v / sum)
}

// Box Blur (5x5)
function applyBoxBlur(imageData: ImageData): ImageData {
  const kernelSize = 5
  const kernel = new Array(kernelSize * kernelSize).fill(1 / 25)
  return applyConvolution(imageData, kernel, kernelSize)
}

// Sharpen Filter
function applySharpen(imageData: ImageData): ImageData {
  const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0]
  return applyConvolution(imageData, kernel, 3)
}

// Edge Detection (Sobel)
function applyEdgeDetection(imageData: ImageData): ImageData {
  const width = imageData.width
  const height = imageData.height
  const data = imageData.data
  const output = new ImageData(width, height)

  // Convert to grayscale first
  const gray = new Uint8ClampedArray(width * height)
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
    gray[i / 4] = avg
  }

  // Sobel kernels
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1]

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let gx = 0
      let gy = 0

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = (y + ky) * width + (x + kx)
          const kernelIdx = (ky + 1) * 3 + (kx + 1)
          gx += gray[idx] * sobelX[kernelIdx]
          gy += gray[idx] * sobelY[kernelIdx]
        }
      }

      const magnitude = Math.sqrt(gx * gx + gy * gy)
      const idx = (y * width + x) * 4
      output.data[idx] = magnitude
      output.data[idx + 1] = magnitude
      output.data[idx + 2] = magnitude
      output.data[idx + 3] = 255
    }
  }

  return output
}

// Grayscale Filter
function applyGrayscale(imageData: ImageData): ImageData {
  const data = imageData.data
  const output = new ImageData(imageData.width, imageData.height)

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
    output.data[i] = avg
    output.data[i + 1] = avg
    output.data[i + 2] = avg
    output.data[i + 3] = data[i + 3]
  }

  return output
}

// Generic convolution function
function applyConvolution(
  imageData: ImageData,
  kernel: number[],
  kernelSize: number
): ImageData {
  const width = imageData.width
  const height = imageData.height
  const data = imageData.data
  const output = new ImageData(width, height)
  const half = Math.floor(kernelSize / 2)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0

      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const pixelY = Math.min(Math.max(y + ky - half, 0), height - 1)
          const pixelX = Math.min(Math.max(x + kx - half, 0), width - 1)
          const idx = (pixelY * width + pixelX) * 4
          const kernelIdx = ky * kernelSize + kx

          r += data[idx] * kernel[kernelIdx]
          g += data[idx + 1] * kernel[kernelIdx]
          b += data[idx + 2] * kernel[kernelIdx]
        }
      }

      const outIdx = (y * width + x) * 4
      output.data[outIdx] = Math.min(Math.max(r, 0), 255)
      output.data[outIdx + 1] = Math.min(Math.max(g, 0), 255)
      output.data[outIdx + 2] = Math.min(Math.max(b, 0), 255)
      output.data[outIdx + 3] = data[outIdx + 3]
    }
  }

  return output
}
