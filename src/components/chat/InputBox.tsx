'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowUpIcon } from 'lucide-react'

interface InputBoxProps {
  onSend: (content: string) => void
  disabled?: boolean
  isLoading?: boolean
  placeholder?: string
}

export default function InputBox({ onSend, disabled, isLoading, placeholder }: InputBoxProps) {
  const [content, setContent] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [content])

  const handleSend = () => {
    if (content.trim() && !disabled && !isLoading) {
      onSend(content.trim())
      setContent('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-8">
      <div className="relative flex items-end w-full p-2 bg-[var(--surface)] border border-[var(--border)] rounded-2xl focus-within:border-[var(--muted)] transition-all">
        <textarea
          ref={textareaRef}
          rows={1}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Message Trevor Pay..."}
          disabled={disabled || isLoading}
          className="w-full px-4 py-3 bg-transparent text-[var(--text)] text-sm resize-none focus:outline-none placeholder-[var(--muted)] disabled:cursor-not-allowed"
          style={{ minHeight: '44px' }}
        />
        <button
          onClick={handleSend}
          disabled={!content.trim() || disabled || isLoading}
          className={`p-2 rounded-xl transition-all ${
            content.trim() && !disabled && !isLoading
              ? 'bg-[var(--text)] text-[var(--bg)] hover:opacity-90'
              : 'bg-[var(--border)] text-[var(--muted)] cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin" />
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
