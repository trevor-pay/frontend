'use client'

import { useState, useCallback } from 'react'
import { api } from '@/lib/api'
import { Message, Session } from '@/types'

interface UseChatReturn {
  messages: Message[]
  session: Session | null
  isLoading: boolean
  isPaymentRequired: boolean
  sendMessage: (content: string) => Promise<void>
  initSession: (walletAddress: string) => Promise<void>
  clearPaymentRequired: () => void
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export function useChat(walletAddress: string | null): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentRequired, setIsPaymentRequired] = useState(false)

  const initSession = useCallback(async (address: string) => {
    try {
      const newSession = await api.createSession(address)
      setSession(newSession)
      // fetch history if needed
      const history = await api.getHistory(newSession.id)
      setMessages(history)
    } catch (e) {
      console.error('Failed to init session:', e)
    }
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    if (!session || !walletAddress) return
    setIsLoading(true)

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    }
    
    // optimistic update
    setMessages(prev => [...prev, userMessage])

    try {
      const res = await api.sendMessage(session.id, walletAddress, content)

      if (res.status === 402) {
        setIsPaymentRequired(true)
        // remove optimistic message since it wasn't processed
        setMessages(prev => prev.filter(m => m.id !== userMessage.id))
        return
      }

      if (res.data) {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: res.data.content,
          createdAt: new Date().toISOString(),
        }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (e) {
      console.error('Failed to send message:', e)
      setMessages(prev => prev.filter(m => m.id !== userMessage.id))
    } finally {
      setIsLoading(false)
    }
  }, [session, walletAddress])

  return {
    messages,
    session,
    isLoading,
    isPaymentRequired,
    sendMessage,
    initSession,
    clearPaymentRequired: () => setIsPaymentRequired(false),
    setMessages
  }
}
