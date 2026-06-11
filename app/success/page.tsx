'use client'

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  AnimatedBackground,
  GlassCard,
  GlowButton,
  NFTCredentialCard,
  Navbar,
  Footer,
} from '@/components/nexera'
import { Check, Zap } from 'lucide-react'

type BadgeType = 'course' | 'event' | 'hackathon' | 'workshop'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [showConfetti, setShowConfetti] = useState(true)

  const name = searchParams.get("name")?.trim() || "User"
  const txHash =  searchParams.get("txHash")?.trim()
  const tokenId = searchParams.get("tokenId") || "--"
  const badge =
  (searchParams.get("badge")?.trim() as BadgeType) || "hackathon"

  console.log("NAME:", name)
  console.log("BADGE:", badge)
  console.log("TX:", txHash)
  console.log("TOKEN:", searchParams.get("tokenId"))

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])



  return (
    <ProtectedRoute>
      <main className="relative min-h-screen">
        <AnimatedBackground />
        <Navbar />

        {/* Confetti */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#a855f7'][
                    Math.floor(Math.random() * 5)
                  ],
                }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{
                  y: '100vh',
                  opacity: 0,
                  rotate: Math.random() * 720 - 360,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        )}

        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative inline-block mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-[#10b981] flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                <Check className="w-12 h-12 text-white" />
              </div>
              {/* Expanding ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#10b981]"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, repeat: 2 }}
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-[family-name:var(--font-display)] font-bold text-4xl sm:text-5xl text-white mb-4"
            >
              Credential Minted!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-lg mb-8"
            >
              Your verifiable credential is now live on Base Sepolia.
            </motion.p>

            {/* Gasless badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 mb-12"
            >
              <Zap className="w-4 h-4 text-[#10b981]" />
              <span className="text-[#10b981] font-medium">
                Gasless Transaction · Powered by UGF
              </span>
            </motion.div>

            {/* NFT Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center mb-8"
            >
              <NFTCredentialCard
                badgeType={badge}
                holderName={name}
                tokenId={tokenId}
                date={new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
                isFloating
              />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <GlassCard className="p-6 max-w-md mx-auto" hover={false}>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Credential Successfully Issued
                  </h3>
                  <div className="mt-4">
                    <p className="text-[#00d4ff] font-semibold">
                      NFT ID: {tokenId}
                    </p>
                  </div>
                  <p className="text-white/70">
                    Your credential has been issued and linked to your wallet on Base Sepolia.
                  </p>
                </GlassCard>
              </motion.div>


            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center mt-8"
            >
            <a
              href={`https://sepolia.basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlowButton variant="outline" size="md">
                View on BaseScan
              </GlowButton>
            </a>

              <Link href="/claim">
                <GlowButton variant="primary" size="md">
                  Claim Another
                </GlowButton>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </ProtectedRoute>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="relative min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#00d4ff] border-t-transparent rounded-full" />
      </main>
    }>
      <SuccessContent />
    </Suspense>
    
  )
}
