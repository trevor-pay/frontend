export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: string
  role: MessageRole
  content: string
  createdAt: string
}

export interface Session {
  id: string
  walletAddress: string
  createdAt: string
}

export interface ChatResponse {
  content: string
}

export interface CreditsResponse {
  credits: number
}

export interface PaymentVerifyResponse {
  success: boolean
  creditsAdded: number
}

export interface ApiResponse<T> {
  status: number
  data: T | null
}
