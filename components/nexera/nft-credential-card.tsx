'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Award, GraduationCap, Lightbulb, Rocket } from 'lucide-react'

type BadgeType = 'course' | 'event' | 'hackathon' | 'workshop'

interface NFTCredentialCardProps {
  badgeType: BadgeType
  holderName: string
  tokenId?: string
  date?: string
  className?: string
  isPreview?: boolean
  isFloating?: boolean
}

const badgeConfig = {
  course: {
    icon: GraduationCap,
    title: 'Course Completion Certificate',
    color: 'from-[#00d4ff] to-[#0099cc]',
    glow: 'rgba(0,212,255,0.4)',
  },
  event: {
    icon: Award,
    title: 'Event Attendance Badge',
    color: 'from-[#a855f7] to-[#7c3aed]',
    glow: 'rgba(168,85,247,0.4)',
  },
  hackathon: {
    icon: Rocket,
    title: 'Hackathon Participant Badge',
    color: 'from-[#f59e0b] to-[#ea580c]',
    glow: 'rgba(245,158,11,0.4)',
  },
  workshop: {
    icon: Lightbulb,
    title: 'Workshop Completion Badge',
    color: 'from-[#10b981] to-[#059669]',
    glow: 'rgba(16,185,129,0.4)',
  },
}

export function NFTCredentialCard({
  badgeType,
  holderName,
  tokenId,
  date,
  className,
  isPreview = false,
  isFloating = false,
}: NFTCredentialCardProps) {
  console.log("BADGETYPE =", badgeType)
  console.log("BADGECONFIG =", badgeConfig)
  console.log("CONFIG =", badgeConfig[badgeType])
  const config = badgeConfig[badgeType]

  if (!config) {
  return (
    <div className="text-red-500">
      Invalid badge type: {badgeType}
    </div>
  )
}

const Icon = config.icon

  return (
    <motion.div
      className={cn(
        'relative w-full max-w-sm rounded-2xl overflow-hidden group cursor-pointer',
        'bg-gradient-to-br from-white/[0.08] to-white/[0.02]',
        'backdrop-blur-xl border border-white/20',
        isPreview && 'scale-90',
        className
      )}
      style={{ 
        perspective: '1000px',
        boxShadow: `0 0 60px ${config.glow}`,
      }}
      initial={isFloating ? { y: 0, rotateY: 0, rotateX: 0 } : false}
      animate={isFloating ? {
        y: [0, -15, 0],
        rotateY: [0, 5, 0, -5, 0],
        rotateX: [0, 2, 0, -2, 0],
      } : undefined}
      transition={isFloating ? {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      } : undefined}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: `0 0 80px ${config.glow}`,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Holographic shimmer overlay */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 55%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Rainbow border effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #f59e0b, #10b981, #00d4ff)',
          backgroundSize: '400% 100%',
          padding: '2px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        }}
        animate={{
          backgroundPosition: ['0% 0', '400% 0'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Card content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-lg flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(0,212,255,0.3)',
                  '0 0 20px rgba(0,212,255,0.6)',
                  '0 0 10px rgba(0,212,255,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-[family-name:var(--font-display)] font-bold text-white text-xs">N</span>
            </motion.div>
            <span className="font-[family-name:var(--font-display)] font-semibold text-white/90 text-sm">NEXERA</span>
          </motion.div>
          <motion.span 
            className="text-xs text-white/50 font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Official Credential
          </motion.span>
        </div>

        {/* Badge icon with pulse effect */}
        <div className="flex justify-center mb-6 relative">
          {/* Pulse rings */}
          <motion.div
            className={cn('absolute w-24 h-24 rounded-2xl bg-gradient-to-br', config.color)}
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.4, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className={cn('absolute w-24 h-24 rounded-2xl bg-gradient-to-br', config.color)}
            animate={{
              scale: [1, 1.2, 1.2],
              opacity: [0.6, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.3,
            }}
          />
          <motion.div
            className={cn(
              'relative w-24 h-24 rounded-2xl flex items-center justify-center',
              'bg-gradient-to-br',
              config.color,
            )}
            style={{
              boxShadow: `0 0 40px ${config.glow}`,
            }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Icon className="w-12 h-12 text-white drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>

        {/* Credential info with typing effect simulation */}
        <div className="text-center space-y-3">
          <motion.h3 
            className="font-[family-name:var(--font-display)] font-semibold text-white text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {config.title}
          </motion.h3>
          <motion.p 
            className="text-white/90 font-medium text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            key={holderName}
          >
            {holderName || 'Your Name'}
          </motion.p>
          {date && (
            <motion.p 
              className="text-white/50 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Issued {date}
            </motion.p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          {tokenId && (
            <motion.span 
              className="font-mono text-xs text-[#00d4ff]"
              animate={{
                textShadow: [
                  '0 0 5px rgba(0,212,255,0.5)',
                  '0 0 15px rgba(0,212,255,0.8)',
                  '0 0 5px rgba(0,212,255,0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              #{tokenId}
            </motion.span>
          )}
          <motion.div 
            className="flex items-center gap-1.5"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-4 h-4 rounded-full bg-[#0052FF] flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 5px rgba(0,82,255,0.5)',
                  '0 0 15px rgba(0,82,255,0.8)',
                  '0 0 5px rgba(0,82,255,0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white text-[8px] font-bold">B</span>
            </motion.div>
            <span className="text-xs text-white/50">Base Sepolia</span>
          </motion.div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#00d4ff]/30 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#00d4ff]/30 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#7c3aed]/30 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#7c3aed]/30 rounded-br-2xl" />
    </motion.div>
  )
}
