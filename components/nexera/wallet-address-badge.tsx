'use client'

import { cn } from '@/lib/utils'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface WalletAddressBadgeProps {
  address: string
  className?: string
  showCopy?: boolean
  isConnected?: boolean
}

export function WalletAddressBadge({
  address,
  className,
  showCopy = true,
  isConnected = true,
}: WalletAddressBadgeProps) {
  const [copied, setCopied] = useState(false)

  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg',
        'bg-white/[0.05] border border-white/10',
        'font-mono text-sm text-white/80',
        className
      )}
    >
      {isConnected && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
        </span>
      )}
      <span>{truncatedAddress}</span>
      {showCopy && (
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Copy address"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-[#10b981]" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-white/60 hover:text-white" />
          )}
        </button>
      )}
    </div>
  )
}
