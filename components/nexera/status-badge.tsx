'use client'

import { cn } from '@/lib/utils'
import { Check, Clock, AlertCircle, Shield } from 'lucide-react'

type StatusType = 'success' | 'pending' | 'verified' | 'error'

interface StatusBadgeProps {
  status: StatusType
  label?: string
  className?: string
  pulse?: boolean
}

const statusConfig = {
  success: {
    icon: Check,
    bg: 'bg-[#10b981]/10',
    border: 'border-[#10b981]/30',
    text: 'text-[#10b981]',
    defaultLabel: 'Success',
  },
  pending: {
    icon: Clock,
    bg: 'bg-[#f59e0b]/10',
    border: 'border-[#f59e0b]/30',
    text: 'text-[#f59e0b]',
    defaultLabel: 'Pending',
  },
  verified: {
    icon: Shield,
    bg: 'bg-[#00d4ff]/10',
    border: 'border-[#00d4ff]/30',
    text: 'text-[#00d4ff]',
    defaultLabel: 'Verified',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-[#ef4444]/10',
    border: 'border-[#ef4444]/30',
    text: 'text-[#ef4444]',
    defaultLabel: 'Error',
  },
}

export function StatusBadge({
  status,
  label,
  className,
  pulse = false,
}: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
        'border text-sm font-medium',
        config.bg,
        config.border,
        config.text,
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              status === 'success' && 'bg-[#10b981]',
              status === 'pending' && 'bg-[#f59e0b]',
              status === 'verified' && 'bg-[#00d4ff]',
              status === 'error' && 'bg-[#ef4444]'
            )}
          />
          <span
            className={cn(
              'relative inline-flex rounded-full h-2 w-2',
              status === 'success' && 'bg-[#10b981]',
              status === 'pending' && 'bg-[#f59e0b]',
              status === 'verified' && 'bg-[#00d4ff]',
              status === 'error' && 'bg-[#ef4444]'
            )}
          />
        </span>
      )}
      {!pulse && <Icon className="w-4 h-4" />}
      <span>{label || config.defaultLabel}</span>
    </div>
  )
}
