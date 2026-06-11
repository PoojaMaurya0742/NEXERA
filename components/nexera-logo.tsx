import { cn } from '@/lib/utils'

export function NexeraMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center',
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className="h-full w-full">
        <defs>
          <linearGradient id="nx-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.14 210)" />
            <stop offset="100%" stopColor="oklch(0.62 0.2 295)" />
          </linearGradient>
        </defs>
        <path
          d="M24 2 41 12v24L24 46 7 36V12z"
          fill="url(#nx-grad)"
          opacity="0.18"
        />
        <path
          d="M24 2 41 12v24L24 46 7 36V12z"
          fill="none"
          stroke="url(#nx-grad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M17 33V15l14 18V15"
          fill="none"
          stroke="url(#nx-grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function NexeraWordmark({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <NexeraMark className="size-9" />
      <span className="font-heading text-xl font-bold tracking-tight">
        Nexera
      </span>
    </div>
  )
}
