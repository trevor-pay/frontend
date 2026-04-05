'use client'

import { useEffect, useRef } from 'react'
import { Message } from '@/types'
import MessageBubble from './MessageBubble'

export default function MessageList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar">
      <div className="max-w-3xl mx-auto w-full">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  )
}
