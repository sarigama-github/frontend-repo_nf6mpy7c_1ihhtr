import UploadAndAnalyze from './components/UploadAndAnalyze'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-5xl w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <img
                src="/flame-icon.svg"
                alt="Flames"
                className="w-16 h-16 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              Photo Analyzer & iPhone Edit Guide
            </h1>

            <p className="text-lg md:text-xl text-blue-200 mb-2">
              Get pro-style feedback and exact slider values to level up your photo.
            </p>
            <p className="text-sm text-blue-300/80">Supports: Exposure, Brilliance, Highlights, Shadows, Contrast, Brightness, Black Point, Saturation.</p>
          </div>

          <UploadAndAnalyze />

          <div className="text-center">
            <p className="text-sm text-blue-300/60">
              Tip: Adjust Exposure first, then refine with Highlights/Shadows and finalize Black Point.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App