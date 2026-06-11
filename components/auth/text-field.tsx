'use client'

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  icon?: ReactNode
  error?: string
  valid?: boolean
  trailing?: ReactNode
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, icon, error, valid, trailing, className, id, ...props },
    ref,
  ) {
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
            error
              ? 'border-destructive/70'
              : valid
                ? 'border-success/50'
                : 'border-border',
          )}
        >
          {icon ? (
            <span className="text-muted-foreground group-focus-within:text-brand">
              {icon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'h-11 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none',
              className,
            )}
            aria-invalid={!!error}
            {...props}
          />
          {trailing}
          {!trailing && valid && !error ? (
            <CheckCircle2 className="size-4 shrink-0 text-success" />
          ) : null}
        </div>
        {error ? (
          <p className="flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="size-3.5" />
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)
