'use client'

import { useState } from 'react'

interface PaywallModalProps {
  isOpen: boolean
  onClose: () => void
  onPurchase: (amount: number, tokens: number) => void
}

const bundles = [
  { id: 'small', tokens: 10, price: 1.00, label: '10 prompts' },
  { id: 'medium', tokens: 50, price: 4.50, label: '50 prompts' },
  { id: 'large', tokens: 100, price: 8.00, label: '100 prompts' },
]

export default function PaywallModal({ isOpen, onClose, onPurchase }: PaywallModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  if (!isOpen) return null

  const handlePurchase = async (amount: number, tokens: number) => {
    setIsProcessing(true)
    try {
      await onPurchase(amount, tokens)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--accent)] mb-2">Credits Exhausted</h2>
          <p className="text-[var(--muted)] text-sm">
            Purchase more credits to continue your conversation.
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {bundles.map((bundle) => (
            <button
              key={bundle.id}
              disabled={isProcessing}
              onClick={() => handlePurchase(bundle.price, bundle.tokens)}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-[var(--border)] bg-transparent hover:border-[var(--muted)] hover:bg-white/5 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-sm font-medium text-[var(--text)]">{bundle.label}</span>
              <span className="text-sm text-[var(--muted)] group-hover:text-[var(--accent)] font-semibold">
                ${bundle.price.toFixed(2)} USDC
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {isProcessing ? (
            <button disabled className="w-full py-4 rounded-2xl bg-[var(--accent)] text-[var(--bg)] font-bold text-sm flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-t-transparent border-[var(--bg)] rounded-full animate-spin" />
              Processing payment...
            </button>
          ) : (
             <button
              onClick={onClose}
              className="w-full py-4 text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        <div className="mt-6 text-[10px] text-center text-[var(--disabled)] uppercase tracking-widest">
          Powered by Stellar Blockchain
        </div>
      </div>
      
      {/* Click outside to close */}
      {!isProcessing && <div className="absolute inset-0 -z-10" onClick={onClose} />}
    </div>
  )
}
