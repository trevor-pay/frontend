'use client'

import { useState, useCallback } from 'react'
import { api } from '@/lib/api'

export function useCredits(walletAddress: string | null) {
  const [credits, setCredits] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchCredits = useCallback(async () => {
    if (!walletAddress) return
    setIsLoading(true)
    try {
      const res = await api.getCredits(walletAddress)
      setCredits(res.credits)
    } catch (e) {
      console.error('Failed to fetch credits:', e)
    } finally {
      setIsLoading(false)
    }
  }, [walletAddress])

  return { credits, fetchCredits, setCredits, isLoading }
}
