import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function UploadAndAnalyze() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const onFileChange = (e) => {
    setError('')
    setResult(null)
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }

  const submit = async () => {
    if (!file) {
      setError('Please choose an image first')
      return
    }
    setLoading(true)
    setError('')
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || 'Failed to analyze image')
      }
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-white text-2xl font-semibold mb-4">Photo Analyzer</h2>
        <p className="text-blue-200/80 mb-6">Upload a picture. You'll get pros & cons plus suggested iPhone-style adjustments like Exposure, Brilliance, Highlights, Shadows, Contrast, Brightness, and Black Point.</p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input type="file" accept="image/*" onChange={onFileChange} className="text-blue-100" />
          <button onClick={submit} disabled={loading} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50">
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        {error && <p className="text-red-300 mt-3">{error}</p>}
      </div>

      {result && (
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg mb-2">Pros</h3>
            <ul className="list-disc list-inside text-blue-100 space-y-1">
              {result.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <h3 className="text-white font-semibold text-lg mt-4 mb-2">Cons</h3>
            <ul className="list-disc list-inside text-blue-100 space-y-1">
              {result.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg mb-2">Suggested Adjustments</h3>
            <ul className="space-y-3">
              {result.suggestions.map((s, i) => (
                <li key={i} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white font-medium">{s.name}</p>
                    <p className="text-blue-200 text-sm">{s.rationale}</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-200">{s.value > 0 ? '+' : ''}{s.value}</span>
                </li>
              ))}
            </ul>
            <p className="text-blue-300/70 text-sm mt-4">Values are on a -100 to +100 scale to match iPhone editing controls.</p>
          </div>
        </div>
      )}
    </div>
  )
}
