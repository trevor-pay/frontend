'use client'

import { useEffect, useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { useChat } from '@/hooks/useChat'
import { useCredits } from '@/hooks/useCredits'
import { api } from '@/lib/api'
import ChatContainer from '@/components/chat/ChatContainer'
import ConnectButton from '@/components/wallet/ConnectButton'
import CreditDisplay from '@/components/credits/CreditDisplay'
import PaywallModal from '@/components/payment/PaywallModal'

export default function Home() {
  const { isConnected, publicKey, isLoading: isWalletLoading } = useWallet()
  const { 
    messages, 
    sendMessage, 
    isLoading: isChatLoading, 
    isPaymentRequired, 
    initSession,
    clearPaymentRequired,
    setMessages 
  } = useChat(publicKey)
  const { credits, fetchCredits, setCredits } = useCredits(publicKey)

  // Auto-init session and fetch credits when wallet connects
  useEffect(() => {
    if (isConnected && publicKey) {
      initSession(publicKey)
      fetchCredits()
    }
  }, [isConnected, publicKey, initSession, fetchCredits])

  const handleSendMessage = async (content: string) => {
    await sendMessage(content)
    // Refresh credits after each message (success or 402)
    if (publicKey) fetchCredits()
  }

  const handlePurchaseCredits = async (amount: number, tokens: number) => {
    if (!publicKey) return

    try {
      // TODO: implement MPP payment signing via Freighter
      // For now, stubbing payment verification
      const res = await api.verifyPayment(publicKey, 'stub-hash-' + Date.now(), tokens)
      
      if (res.success) {
        setCredits(prev => (prev || 0) + res.creditsAdded)
        clearPaymentRequired()
      }
    } catch (e) {
      console.error('Payment failed:', e)
    }
  }

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-[var(--border)] bg-[var(--bg)]/50 backdrop-blur-sm z-20">
        <div className="flex items-center gap-4">
           {/* Logo or name could go here */}
           <span className="text-xs font-bold tracking-widest text-[var(--accent)] uppercase">Trevor Pay</span>
        </div>
        <div className="flex items-center gap-3">
          <CreditDisplay credits={credits} />
          <ConnectButton />
        </div>
      </nav>

      {/* Chat Area */}
      <div className="flex-1 relative overflow-hidden bg-[var(--bg)]">
        <ChatContainer 
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isChatLoading}
          isWalletConnected={isConnected}
        />
      </div>

      {/* Paywall Overlay */}
      <PaywallModal 
        isOpen={isPaymentRequired}
        onClose={clearPaymentRequired}
        onPurchase={handlePurchaseCredits}
      />
      
      {/* Loading overlay for initial wallet check */}
      {isWalletLoading && !isConnected && (
         <div className="fixed inset-0 bg-[var(--bg)] flex items-center justify-center z-[100]">
            <div className="w-12 h-12 border-4 border-t-transparent border-[var(--accent)] rounded-full animate-spin" />
         </div>
      )}
    </main>
  )
}
