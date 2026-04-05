'use client'

interface CreditDisplayProps {
  credits: number | null
}

export default function CreditDisplay({ credits }: CreditDisplayProps) {
  if (credits === null) return null

  const isLow = credits === 0

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium bg-[var(--surface)] ${isLow ? 'border-[var(--danger)] text-[var(--danger)]' : 'border-[var(--border)] text-[var(--text)]'}`}>
      <span className="opacity-70">⬡</span>
      <span>{credits} credits</span>
    </div>
  )
}
