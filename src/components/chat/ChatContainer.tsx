'use client'

import { Message } from '@/types'
import MessageList from './MessageList'
import InputBox from './InputBox'
import ModelSelector from '../ui/ModelSelector'

interface ChatContainerProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  isLoading: boolean
  isWalletConnected: boolean
}

export default function ChatContainer({ 
  messages, 
  onSendMessage, 
  isLoading, 
  isWalletConnected 
}: ChatContainerProps) {
  const hasMessages = messages.length > 0

  return (
    <div className={`flex flex-col w-full h-full chat-container-transition ${hasMessages ? 'justify-between' : 'justify-center items-center'}`}>
      
      {!hasMessages && (
        <div className="flex flex-col items-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--accent)] mb-4">Trevor Pay</h1>
          <p className="text-[var(--muted)] text-sm mb-8 text-center max-w-sm">
            The simplest way to use top-tier AI models with pay-per-prompt infrastructure.
          </p>
          <ModelSelector />
        </div>
      )}

      {hasMessages && (
        <>
          <div className="sticky top-0 z-10 w-full py-4 bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]">
             <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Active Conversation</span>
                <ModelSelector />
             </div>
          </div>
          <MessageList messages={messages} />
        </>
      )}

      <div className={`w-full ${hasMessages ? 'pt-4' : 'max-w-3xl'}`}>
        <InputBox 
          onSend={onSendMessage} 
          isLoading={isLoading} 
          disabled={!isWalletConnected}
          placeholder={isWalletConnected ? "Message Trevor Pay..." : "Connect wallet to start..."}
        />
      </div>

      {!hasMessages && (
        <div className="mt-8 flex gap-4 text-[10px] text-[var(--disabled)] uppercase tracking-wider">
           <span>No Subscriptions</span>
           <span>•</span>
           <span>Pay-per-prompt</span>
           <span>•</span>
           <span>Self-Custody</span>
        </div>
      )}
    </div>
  )
}
