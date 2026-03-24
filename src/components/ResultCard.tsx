'use client'

import { CoverageResult } from '@/types/coverage'

interface ResultCardProps {
  result: CoverageResult
  petName: string
}

const verdictConfig = {
  covered: {
    icon: '✅',
    label: 'Covered',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-800',
  },
  partial: {
    icon: '⚠️',
    label: 'Partially Covered',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-700',
    badge: 'bg-yellow-100 text-yellow-800',
  },
  not_covered: {
    icon: '❌',
    label: 'Not Covered',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-800',
  },
}

const confidenceLabel = {
  high: 'High confidence',
  medium: 'Medium confidence',
  low: 'Low confidence — check with Fetch directly',
}

export default function ResultCard({ result, petName }: ResultCardProps) {
  const config = verdictConfig[result.verdict]

  return (
    <div className={`rounded-3xl border-2 ${config.border} ${config.bg} p-8 animate-fade-in`}>
      
      {/* Verdict Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{config.icon}</span>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Result for {petName}</p>
            <h2 className={`text-2xl font-bold ${config.text}`}>{config.label}</h2>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${config.badge}`}>
          {confidenceLabel[result.confidence]}
        </span>
      </div>

      {/* Explanation */}
      <p className="text-gray-700 text-base leading-relaxed mb-6">
        {result.explanation}
      </p>

      {/* Reimbursement Estimate */}
      <div className="bg-white rounded-2xl p-5 mb-6 border border-gray-100">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Estimated reimbursement
        </p>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-gray-800">
            ${result.estimatedReimbursement.min.toLocaleString()} – ${result.estimatedReimbursement.max.toLocaleString()}
          </span>
          <span className="text-gray-500 mb-1">AUD</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Based on {result.estimatedReimbursement.percentage}% coverage after excess
        </p>
      </div>

      {/* What To Do Next */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          What to do next
        </p>
        <ol className="space-y-2">
          {result.whatToDoNext.map((step, i) => (
            <li key={i} className="flex gap-3 text-gray-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Caveats */}
      {result.importantCaveats.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            ⚠️ Important caveats
          </p>
          <ul className="space-y-2">
            {result.importantCaveats.map((caveat, i) => (
              <li key={i} className="text-sm text-gray-600 flex gap-2">
                <span className="text-gray-300 mt-0.5">•</span>
                {caveat}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 mt-6 text-center leading-relaxed">
        This is an AI estimate based on Fetch's PDS. Always confirm with Fetch directly before making healthcare decisions for your pet.
      </p>
    </div>
  )
}