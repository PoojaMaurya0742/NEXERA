'use client'

import { forwardRef, useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label: string
  error?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ label, error, id, className, ...props }, ref) {
    const [show, setShow] = useState(false)
    const inputId = id || props.name

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <div
          className={cn(
            'group flex items-center gap-2.5 rounded-xl border bg-secondary/50 px-3.5 transition-colors focus-within:border-brand/70 focus-within:bg-secondary/80',
            error ? 'border-destructive/70' : 'border-border',
          )}
        >
          <Lock className="size-[18px] text-muted-foreground group-focus-within:text-brand" />
          <input
            ref={ref}
            id={inputId}
            type={show ? 'text' : 'password'}
            className={cn(
              'h-11 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none',
              className,
            )}
            aria-invalid={!!error}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            {show ? (
              <EyeOff className="size-[18px]" />
            ) : (
              <Eye className="size-[18px]" />
            )}
          </button>
        </div>
        {error ? (
          <p className="text-xs text-destructive">{error}</p>
        ) : null}
      </div>
    )
  },
)
