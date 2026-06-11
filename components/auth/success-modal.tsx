'use client'

import { useEffect } from 'react'
import { CheckCircle2, X } from 'lucide-react'
import { NexeraMark } from '@/components/nexera-logo'

type SuccessModalProps = {
  open: boolean
  name?: string
  email?: string
  onClose: () => void
}

export function SuccessModal({ open, name, email, onClose }: SuccessModalProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm animate-in fade-in"
      />

      {/* Card */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card p-7 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        {/* Animated check */}
        <span className="relative mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-success/15 text-success">
          <span className="absolute inset-0 animate-ping rounded-full bg-success/20" />
          <CheckCircle2 className="relative size-9" />
        </span>

        <h2
          id="success-title"
          className="font-heading text-xl font-bold tracking-tight text-balance"
        >
          Account created successfully!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          {name ? (
            <>
              Welcome to Nexera,{' '}
              <span className="font-medium text-foreground">{name}</span>.{' '}
            </>
          ) : (
            'Welcome to Nexera. '
          )}
          {email ? (
            <>
              A confirmation has been sent to{' '}
              <span className="font-medium text-foreground">{email}</span>.
            </>
          ) : (
            'Your account is ready to go.'
          )}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="bg-gradient-brand glow-brand mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl font-semibold text-primary-foreground transition-opacity hover:opacity-95"
        >
          <NexeraMark className="size-5" />
          Continue to Dashboard
        </button>
      </div>
    </div>
  )
}
