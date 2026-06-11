'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface AnimatedBackgroundProps {
  className?: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface ShootingStar {
  id: number
  x: number
  y: number
  angle: number
  delay: number
}

export function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 3,
    }))
    setParticles(newParticles)

    // Generate shooting stars
    const newShootingStars = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 50,
      angle: 15 + Math.random() * 30,
      delay: i * 3 + Math.random() * 2,
    }))
    setShootingStars(newShootingStars)
  }, [])

  return (
    <div className={cn('fixed inset-0 -z-10 overflow-hidden', className)}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#050810]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 150, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -120, 0],
          y: [0, 120, 0],
          scale: [1, 0.8, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,153,204,0.12) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Pulsing ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#00d4ff]/20"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
      
      {/* Floating particles / stars */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: particle.size > 2 
                ? 'radial-gradient(circle, rgba(0,212,255,0.9) 0%, rgba(0,212,255,0) 70%)'
                : 'rgba(255,255,255,0.6)',
              boxShadow: particle.size > 2 ? '0 0 10px rgba(0,212,255,0.5)' : 'none',
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-[100px] h-[2px]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            background: 'linear-gradient(90deg, rgba(0,212,255,0.8), transparent)',
            transform: `rotate(${star.angle}deg)`,
          }}
          initial={{ x: 0, opacity: 0 }}
          animate={{
            x: [0, 300],
            y: [0, 150],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: star.delay,
            repeatDelay: 5,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-16 h-16 border border-[#00d4ff]/20 rotate-45"
        animate={{
          rotate: [45, 90, 45],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-12 h-12 border border-[#7c3aed]/20 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-[60%] right-[25%] w-8 h-8 bg-[#00d4ff]/5 rotate-12"
        animate={{
          rotate: [12, -12, 12],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(5,8,16,0.8) 100%)',
        }}
      />
    </div>
  )
}
