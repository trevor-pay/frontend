'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  isConnected,
  getAddress,
  isAllowed,
  setAllowed,
} from '@stellar/freighter-api'

interface WalletState {
  isConnected: boolean
  publicKey: string | null
  isLoading: boolean
  connect: () => Promise<void>
}

export function useWallet(): WalletState {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkConnection = useCallback(async () => {
    try {
      const connectedRes = await isConnected()
      if (connectedRes.isConnected) {
        const allowed = await isAllowed()
        if (allowed.isAllowed) {
          const { address } = await getAddress()
          if (address) {
            setPublicKey(address)
            setConnected(true)
          }
        }
      }
    } catch (e) {
      console.error('Freighter connection check failed:', e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkConnection()
  }, [checkConnection])

  const connect = useCallback(async () => {
    setIsLoading(true)
    try {
      const allowed = await setAllowed()
      if (allowed.isAllowed) {
        const { address } = await getAddress()
        if (address) {
          setPublicKey(address)
          setConnected(true)
        }
      }
    } catch (e) {
      console.error('Failed to connect wallet:', e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isConnected: connected, publicKey, isLoading, connect }
}
