'use client'

import { useState } from 'react';
import { CoverageRequest, CoverageResult, PetType } from '@/types/coverage';
import ResultCard from './ResultCard';

export default function CoverageChecker() {
  const [form, setForm] = useState<CoverageRequest>({
    petName: '',
    petType: 'dog',
    condition: '',
    coveragePercentage: 80,
  })
  const [result, setResult] = useState<CoverageResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/coverage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
        
        {/* Pet Type Toggle */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            My pet is a
          </label>
          <div className="flex gap-3">
            {(['dog', 'cat'] as PetType[]).map((type) => (
              <button
                key={type}
                onClick={() => setForm({ ...form, petType: type })}
                className={`flex-1 py-3 px-4 rounded-2xl border-2 font-semibold text-lg transition-all ${
                  form.petType === type
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
              >
                {type === 'dog' ? '🐶 Dog' : '🐱 Cat'}
              </button>
            ))}
          </div>
        </div>

        {/* Pet Name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Pet's name
          </label>
          <input
            type="text"
            placeholder="e.g. Biscuit"
            value={form.petName}
            onChange={(e) => setForm({ ...form, petName: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-800 text-lg transition-colors"
          />
        </div>

        {/* Condition */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            What happened or what condition?
          </label>
          <textarea
            placeholder="e.g. My dog ate something and needs surgery, my cat has a skin infection, cruciate ligament tear..."
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-800 text-lg transition-colors resize-none"
          />
        </div>

        {/* Coverage Percentage */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Your coverage percentage
          </label>
          <div className="flex gap-3">
            {([60, 70, 80, 90] as const).map((pct) => (
              <button
                key={pct}
                onClick={() => setForm({ ...form, coveragePercentage: pct })}
                className={`flex-1 py-3 rounded-2xl border-2 font-bold text-lg transition-all ${
                  form.coveragePercentage === pct
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading || !form.petName || !form.condition}
          className="w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-lg rounded-2xl transition-all"
        >
          {loading ? 'Checking coverage...' : 'Check my coverage →'}
        </button>

        {error && (
          <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
        )}
      </div>

      {/* Result */}
      {result && <ResultCard result={result} petName={form.petName} />}
    </div>
  )
}