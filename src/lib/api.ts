import { 
  Message, 
  Session, 
  ChatResponse, 
  CreditsResponse, 
  PaymentVerifyResponse,
  ApiResponse
} from '@/types'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export const api = {
  createSession: async (walletAddress: string): Promise<Session> => {
    const res = await fetch(`${BACKEND_URL}/chat/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress }),
    })
    if (!res.ok) throw new Error('Failed to create session')
    return res.json()
  },

  sendMessage: async (
    sessionId: string,
    walletAddress: string,
    content: string,
  ): Promise<ApiResponse<ChatResponse>> => {
    const res = await fetch(`${BACKEND_URL}/chat/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, walletAddress, content }),
    })
    // 402 or other non-ok status will be handled by the hook
    return { 
      status: res.status, 
      data: res.ok ? await res.json() : null 
    }
  },

  getCredits: async (walletAddress: string): Promise<CreditsResponse> => {
    const res = await fetch(`${BACKEND_URL}/credits/${walletAddress}`)
    if (!res.ok) throw new Error('Failed to fetch credits')
    return res.json()
  },

  verifyPayment: async (
    walletAddress: string,
    transactionHash: string,
    creditAmount: number,
  ): Promise<PaymentVerifyResponse> => {
    const res = await fetch(`${BACKEND_URL}/payment/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, transactionHash, creditAmount }),
    })
    if (!res.ok) throw new Error('Payment verification failed')
    return res.json()
  },

  getHistory: async (sessionId: string): Promise<Message[]> => {
    const res = await fetch(`${BACKEND_URL}/chat/session/${sessionId}`)
    if (!res.ok) throw new Error('Failed to fetch history')
    return res.json()
  },
}
