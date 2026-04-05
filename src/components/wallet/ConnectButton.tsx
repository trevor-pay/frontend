'use client'

import { useWallet } from '@/hooks/useWallet'
import { useState } from 'react'

export default function ConnectButton() {
  const { isConnected, publicKey, isLoading, connect } = useWallet()

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (isLoading) {
    return (
      <button className="px-4 py-2 border border-[var(--border)] rounded-md text-sm text-[var(--muted)] cursor-wait">
        <div className="w-4 h-4 border-2 border-t-transparent border-[var(--text)] rounded-full animate-spin"></div>
      </button>
    )
  }

  if (isConnected && publicKey) {
    return (
      <button 
        disabled
        className="px-4 py-2 border border-[var(--border)] rounded-md text-sm text-[var(--text)] bg-[var(--surface)]"
      >
        {truncateAddress(publicKey)}
      </button>
    )
  }

  return (
    <button
      onClick={connect}
      className="px-4 py-2 border border-[var(--text)] bg-transparent text-[var(--text)] rounded-md text-sm font-medium hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all duration-200"
    >
      Connect Wallet
    </button>
  )
}
