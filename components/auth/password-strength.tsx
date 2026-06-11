'use client'

import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { evaluatePassword, passwordRules } from '@/lib/password'

const barColor: Record<string, string> = {
  Weak: 'bg-destructive',
  Fair: 'bg-chart-4',
  Good: 'bg-primary',
  Strong: 'bg-success',
}

const labelColor: Record<string, string> = {
  Weak: 'text-destructive',
  Fair: 'text-chart-4',
  Good: 'text-primary',
  Strong: 'text-success',
}

export function PasswordStrength({ value }: { value: string }) {
  const { results, strength } = evaluatePassword(value)
  if (value.length === 0) return null

  return (
    <div className="space-y-3 rounded-xl border border-border bg-secondary/40 p-3.5">
      <div className="flex items-center gap-3">
        <div className="flex h-1.5 flex-1 gap-1">
          {Array.from({ length: passwordRules.length }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-full flex-1 rounded-full transition-colors',
                i < strength.score
                  ? barColor[strength.label] ?? 'bg-muted'
                  : 'bg-muted',
              )}
            />
          ))}
        </div>
        <span
          className={cn(
            'w-12 text-right text-xs font-semibold',
            labelColor[strength.label] ?? 'text-muted-foreground',
          )}
        >
          {strength.label}
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {passwordRules.map((rule) => {
          const passed = results.find((r) => r.id === rule.id)?.passed
          return (
            <li
              key={rule.id}
              className={cn(
                'flex items-center gap-1.5 text-xs transition-colors',
                passed ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'flex size-4 shrink-0 items-center justify-center rounded-full',
                  passed
                    ? 'bg-success/15 text-success'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {passed ? (
                  <Check className="size-3" />
                ) : (
                  <X className="size-3" />
                )}
              </span>
              {rule.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
