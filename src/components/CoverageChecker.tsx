'use client'

import { useState } from 'react'
import { CoverageRequest, CoverageResult, PetType } from '@/types/coverage'
import ResultCard from './ResultCard'

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
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '2px solid #111', marginBottom: '20px' }}>

        {/* Pet type */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', letterSpacing: '0.12em', marginBottom: '10px' }}>
            MY PET IS A
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {(['dog', 'cat'] as PetType[]).map((type) => (
              <button key={type} onClick={() => setForm({ ...form, petType: type })}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: `2px solid ${form.petType === type ? '#111' : '#e5e7eb'}`, background: form.petType === type ? '#f9a8d4' : '#fff', fontWeight: 700, fontSize: '15px', cursor: 'pointer', color: '#111', transition: 'all 0.15s' }}>
                {type === 'dog' ? '🐶 Dog' : '🐱 Cat'}
              </button>
            ))}
          </div>
        </div>

        {/* Pet name */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', letterSpacing: '0.12em', marginBottom: '10px' }}>
            PET'S NAME
          </label>
          <input type="text" placeholder="e.g. Biscuit" value={form.petName}
            onChange={(e) => setForm({ ...form, petName: e.target.value })}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e5e7eb', fontSize: '15px', color: '#111', outline: 'none', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#111'}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* Condition */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', letterSpacing: '0.12em', marginBottom: '10px' }}>
            WHAT HAPPENED OR WHAT CONDITION?
          </label>
          <textarea placeholder="e.g. My dog ate something and needs surgery..." value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            rows={3}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e5e7eb', fontSize: '15px', color: '#111', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#111'}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* Coverage % */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', letterSpacing: '0.12em', marginBottom: '10px' }}>
            YOUR COVERAGE PERCENTAGE
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {([60, 70, 80, 90] as const).map((pct) => (
              <button key={pct} onClick={() => setForm({ ...form, coveragePercentage: pct })}
                style={{ flex: 1, padding: '12px 0', borderRadius: '12px', border: `2px solid ${form.coveragePercentage === pct ? '#111' : '#e5e7eb'}`, background: form.coveragePercentage === pct ? '#f9a8d4' : '#fff', fontWeight: 700, fontSize: '15px', cursor: 'pointer', color: '#111', transition: 'all 0.15s' }}>
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading || !form.petName || !form.condition}
          style={{ width: '100%', padding: '16px', background: '#c7d0f8', color: '#111', borderRadius: '12px', border: '2px solid #111', fontWeight: 700, fontSize: '16px', cursor: loading || !form.petName || !form.condition ? 'not-allowed' : 'pointer', transition: 'all 0.15s', opacity: loading || !form.petName || !form.condition ? 0.6 : 1 }}>
          {loading ? 'Checking coverage...' : 'Check my coverage 🔍'}
        </button>

        {error && <p style={{ marginTop: '14px', textAlign: 'center', color: '#ef4444', fontSize: '14px' }}>{error}</p>}
      </div>

      {result && <ResultCard result={result} petName={form.petName} />}
    </div>
  )
}