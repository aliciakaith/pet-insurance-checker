'use client'

import { CoverageResult } from '@/types/coverage'

interface Props { result: CoverageResult; petName: string }

const verdictConfig = {
  covered: { icon: '✅', label: 'Covered', bg: '#f0fdf4', border: '#86efac', text: '#15803d', badge: '#dcfce7', badgeText: '#166534' },
  partial: { icon: '⚠️', label: 'Partially Covered', bg: '#fffbeb', border: '#fcd34d', text: '#b45309', badge: '#fef3c7', badgeText: '#92400e' },
  not_covered: { icon: '❌', label: 'Not Covered', bg: '#fff1f2', border: '#fca5a5', text: '#b91c1c', badge: '#fee2e2', badgeText: '#991b1b' },
}

const confidenceLabel = {
  high: 'High confidence',
  medium: 'Medium confidence',
  low: 'Low confidence — check with Fetch',
}

export default function ResultCard({ result, petName }: Props) {
  const c = verdictConfig[result.verdict]
  return (
    <div style={{ background: c.bg, border: `2px solid ${c.border}`, borderRadius: '24px', padding: '32px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '40px' }}>{c.icon}</span>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '0.1em', marginBottom: '4px' }}>RESULT FOR {petName.toUpperCase()}</p>
            <h2 style={{ fontSize: '26px', fontWeight: 700, color: c.text, margin: 0 }}>{c.label}</h2>
          </div>
        </div>
        <span style={{ background: c.badge, color: c.badgeText, fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '999px' }}>
          {confidenceLabel[result.confidence]}
        </span>
      </div>

      {/* Explanation */}
      <p style={{ color: '#333', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px', fontWeight: 400 }}>
        {result.explanation}
      </p>

      {/* Reimbursement */}
      <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(0,0,0,0.06)' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '0.12em', marginBottom: '10px' }}>ESTIMATED REIMBURSEMENT</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '36px', fontWeight: 700, color: '#111' }}>
            ${result.estimatedReimbursement.min.toLocaleString()} – ${result.estimatedReimbursement.max.toLocaleString()}
          </span>
          <span style={{ color: '#999', fontSize: '15px' }}>AUD</span>
        </div>
        <p style={{ fontSize: '13px', color: '#aaa', marginTop: '6px', fontWeight: 400 }}>
          Based on {result.estimatedReimbursement.percentage}% coverage after excess
        </p>
      </div>

      {/* Next steps */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '0.12em', marginBottom: '14px' }}>WHAT TO DO NEXT</p>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {result.whatToDoNext.map((step, i) => (
            <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%', background: '#111', color: '#fff', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              <span style={{ color: '#333', fontSize: '15px', lineHeight: 1.5, paddingTop: '3px', fontWeight: 400 }}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Caveats */}
      {result.importantCaveats.length > 0 && (
        <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', border: '1px solid rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '0.12em', marginBottom: '12px' }}>⚠️ IMPORTANT CAVEATS</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {result.importantCaveats.map((cav, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#555', lineHeight: 1.5, fontWeight: 400 }}>
                <span style={{ color: '#ddd', flexShrink: 0 }}>•</span>{cav}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p style={{ fontSize: '12px', color: '#bbb', textAlign: 'center', lineHeight: 1.6, fontWeight: 400 }}>
        AI estimate based on Fetch's PDS. Always confirm with Fetch directly before making healthcare decisions for your pet.
      </p>
    </div>
  )
}