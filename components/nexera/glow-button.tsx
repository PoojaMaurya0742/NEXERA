'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ children, variant = 'primary', size = 'md', isLoading, className, disabled, ...props }, ref) => {
    const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl font-[family-name:var(--font-display)] overflow-hidden'
    
    const variants = {
      primary: cn(
        'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white',
        'shadow-[0_0_20px_rgba(0,212,255,0.3)]',
        'hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]',
      ),
      outline: cn(
        'bg-white/[0.03] backdrop-blur-sm border border-[#00d4ff]/50',
        'text-[#00d4ff]',
        'hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]',
        'hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]'
      ),
      ghost: cn(
        'bg-transparent text-white/80 hover:text-white',
        'hover:bg-white/[0.05]'
      ),
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-2.5',
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          (disabled || isLoading) && 'opacity-60 cursor-not-allowed pointer-events-none',
          className
        )}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Animated background gradient for primary */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#00d4ff]"
            style={{ backgroundSize: '200% 100%' }}
            animate={{
              backgroundPosition: ['0% 0', '200% 0'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Shine sweep effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ width: '50%' }}
          initial={{ x: '-100%' }}
          whileHover={{
            x: ['100%', '300%'],
            transition: { duration: 0.6, ease: 'easeInOut' }
          }}
        />

        {/* Border glow animation for outline */}
        {variant === 'outline' && (
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100"
            style={{
              background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #00d4ff)',
              backgroundSize: '200% 100%',
              padding: '1px',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
            }}
            animate={{
              backgroundPosition: ['0% 0', '200% 0'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {isLoading && (
            <motion.svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </motion.svg>
          )}
          {children}
        </span>

        {/* Particle burst on hover */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, (i - 1.5) * 30],
                y: [0, (i % 2 === 0 ? -1 : 1) * 15],
                transition: { duration: 0.4, delay: i * 0.05 }
              }}
            />
          ))}
        </div>
      </motion.button>
    )
  }
)

GlowButton.displayName = 'GlowButton'
