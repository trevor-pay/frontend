'use client'

import { useState } from 'react'

const models = [
  { id: 'claude-sonnet-4-20250514', label: 'Sonnet 4.6', available: true },
  { id: 'claude-opus-4', label: 'Opus 4', available: false },
  { id: 'claude-haiku-4', label: 'Haiku 4', available: false },
]

export default function ModelSelector() {
  const [selected, setSelected] = useState(models[0].id)

  return (
    <div className="flex gap-2">
      {models.map((model) => (
        <button
          key={model.id}
          disabled={!model.available}
          onClick={() => setSelected(model.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selected === model.id
              ? 'bg-[var(--text)] text-[var(--bg)] border-transparent'
              : model.available
              ? 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--muted)]'
              : 'bg-[var(--surface)] text-[var(--disabled)] border border-[var(--border)] opacity-40 cursor-not-allowed'
          }`}
        >
          {model.label}
        </button>
      ))}
    </div>
  )
}
