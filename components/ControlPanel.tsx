'use client'

interface ControlPanelProps {
  currentFilter: string
  setCurrentFilter: (filter: string) => void
  gaussianKernel: number
  setGaussianKernel: (value: number) => void
  gaussianSigma: number
  setGaussianSigma: (value: number) => void
  showSideBySide: boolean
  setShowSideBySide: (value: boolean) => void
}

export default function ControlPanel({
  currentFilter,
  setCurrentFilter,
  gaussianKernel,
  setGaussianKernel,
  gaussianSigma,
  setGaussianSigma,
  showSideBySide,
  setShowSideBySide,
}: ControlPanelProps) {
  const filters = [
    { id: 'none', name: 'No Filter', icon: '⭕' },
    { id: 'gaussian', name: 'Gaussian Blur', icon: '🌫️' },
    { id: 'box', name: 'Box Blur', icon: '📦' },
    { id: 'sharpen', name: 'Sharpen', icon: '🔪' },
    { id: 'edge', name: 'Edge Detection', icon: '🔲' },
    { id: 'grayscale', name: 'Grayscale', icon: '⚫' },
  ]

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
        <span>🎛️</span> Controls
      </h2>

      {/* Filters */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Filters</h3>
        <div className="space-y-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setCurrentFilter(filter.id)}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                currentFilter === filter.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:scale-102'
              }`}
            >
              <span className="text-xl">{filter.icon}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gaussian Controls */}
      {currentFilter === 'gaussian' && (
        <div className="mb-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">
            Gaussian Parameters
          </h3>

          {/* Kernel Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Blur Strength: {gaussianKernel}
            </label>
            <input
              type="range"
              min="3"
              max="15"
              step="2"
              value={gaussianKernel}
              onChange={(e) => setGaussianKernel(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Light</span>
              <span>Heavy</span>
            </div>
          </div>

          {/* Sigma */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Smoothness: {gaussianSigma}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={gaussianSigma}
              onChange={(e) => setGaussianSigma(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Sharp</span>
              <span>Smooth</span>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Toggle */}
      <div className="mb-6">
        <label className="flex items-center justify-between cursor-pointer p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <span className="text-gray-300 font-medium">Side-by-Side Preview</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={showSideBySide}
              onChange={(e) => setShowSideBySide(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
          </div>
        </label>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">ℹ️ Tips</h3>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• Select a filter to apply effects</li>
          <li>• Adjust Gaussian parameters in real-time</li>
          <li>• Toggle side-by-side to compare</li>
          <li>• Click download to save your image</li>
        </ul>
      </div>
    </div>
  )
}
