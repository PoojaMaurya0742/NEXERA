'use client'

import { forwardRef, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  glowColor?: 'cyan' | 'violet' | 'success' | 'none'
  hover?: boolean
  interactive?: boolean
}

const glowStyles = {
  cyan: {
    base: 'shadow-[0_0_20px_rgba(0,212,255,0.1)]',
    hover: 'hover:shadow-[0_0_40px_rgba(0,212,255,0.3)]',
    border: 'rgba(0,212,255,0.3)',
  },
  violet: {
    base: 'shadow-[0_0_20px_rgba(124,58,237,0.1)]',
    hover: 'hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]',
    border: 'rgba(124,58,237,0.3)',
  },
  success: {
    base: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]',
    hover: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]',
    border: 'rgba(16,185,129,0.3)',
  },
  none: {
    base: '',
    hover: '',
    border: 'transparent',
  },
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, glowColor = 'cyan', hover = true, interactive = true, ...props }, ref) => {
    const glow = glowStyles[glowColor]
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-2xl overflow-hidden group',
          'bg-white/[0.03] backdrop-blur-xl',
          'border border-white/10',
          glow.base,
          hover && glow.hover,
          className
        )}
        whileHover={interactive ? { 
          y: -5,
          transition: { duration: 0.2 }
        } : undefined}
        {...props}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${glow.border}, transparent, ${glow.border})`,
            backgroundSize: '200% 100%',
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
        
        {/* Corner accents that glow on hover */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-white/20 rounded-tl-2xl group-hover:border-[#00d4ff]/50 transition-colors duration-300" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-white/20 rounded-tr-2xl group-hover:border-[#00d4ff]/50 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-white/20 rounded-bl-2xl group-hover:border-[#7c3aed]/50 transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-white/20 rounded-br-2xl group-hover:border-[#7c3aed]/50 transition-colors duration-300" />
        
        <div className="relative z-10">{children}</div>
      </motion.div>
    )
  }
)

GlassCard.displayName = 'GlassCard'
