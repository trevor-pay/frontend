'use client'

import { Message } from '@/types'

export default function MessageBubble({ message }: { message: Message }) {
  const isAssistant = message.role === 'assistant'

  return (
    <div className={`flex w-full mb-6 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
          isAssistant
            ? 'bg-transparent text-[var(--text)] border-none'
            : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)]'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  )
}
