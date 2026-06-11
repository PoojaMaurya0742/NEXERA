'use client'

import { useEffect } from "react";
import { useWallet } from "@/components/context/WalletContext";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState } from 'react'
import {
  AnimatedBackground,
  GlassCard,
  GlowButton,
  NFTCredentialCard,
  Navbar,
  Footer,
} from '@/components/nexera'
import { Link as LinkIcon, Target, Zap, Trophy, Check, ChevronDown, Sparkles } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle";


const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}


const steps = [
  {
    icon: LinkIcon,
    title: 'Connect Wallet',
    description: 'Connect your crypto wallet (no ETH needed)',
    step: 1,
  },
  {
    icon: Target,
    title: 'Choose Badge',
    description: 'Select your credential or event badge',
    step: 2,
  },
  {
    icon: Zap,
    title: 'One-Click Claim',
    description: 'UGF handles all gas automatically',
    step: 3,
  },
  {
    icon: Trophy,
    title: 'Own Your Proof',
    description: 'NFT minted on Base Sepolia instantly',
    step: 4,
  },
]

const trustIndicators = [
  'No ETH Required',
  'Base Sepolia',
  'NFT Certificate',
  'Instant Mint',
]

const marqueeItems = [
  'GASLESS MINTING',
  'BASE SEPOLIA',
  'ERC-721 NFT',
  'UGF POWERED',
  'BEGINNER FRIENDLY',
  'VERIFIABLE ON-CHAIN',
  'NO ETH REQUIRED',
]

const dashboardStats = [
  {
    title: "Credentials Claimed",
    value: "12",
  },
  {
    title: "NFTs Owned",
    value: "8",
  },
  {
    title: "Verified",
    value: "100%",
  },
  {
    title: "Gas Saved",
    value: "$42",
  },
];


// Typing animation component
function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>

    
  )
}

const credentials = [
  {
    title: "Hackathon Winner",
    date: "10 Jun 2026",
    status: "Verified",
  },
  {
    title: "AI Skills Fest",
    date: "8 Jun 2026",
    status: "Verified",
  },
  {
    title: "Blockchain Workshop",
    date: "1 Jun 2026",
    status: "Verified",
  },
];

export default function HomePage() {
  const { isConnected,address } = useWallet();
  const router = useRouter();

  const [time,setTime] = useState(
  new Date().toLocaleTimeString()
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString()
      );

    },1000);

    return () => clearInterval(interval);

  },[]);
  
  const containerRef = useRef<HTMLDivElement>(null)
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  useEffect(() => {
  const loggedIn =
    localStorage.getItem("isLoggedIn");

  if (!loggedIn) {
    router.push("/login");
  }
  }, [router]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  return (
    <main ref={containerRef} className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
        {showWalletPopup && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
            <div className="bg-[#0a0f1a] border border-[#00d4ff]/30 rounded-2xl p-6 w-[350px] text-center">

              <div className="flex justify-end mb-4">
                <ThemeToggle />
              </div>
              
              <h2 className="text-xl font-bold text-white mb-3">
                Wallet Required
              </h2>

              <p className="text-white/70 mb-5">
                Please connect your wallet before claiming a credential.
              </p>

              <button
                onClick={() => {
                  setShowWalletPopup(false);
                }}
                className="px-5 py-2 bg-[#00d4ff] text-black rounded-lg font-semibold"
              >
                OK
              </button>

            </div>
          </div>
        )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
          }}
          className="max-w-7xl mx-auto w-full"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="inline-block mb-6">
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0,212,255,0.5)' }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Zap className="w-4 h-4 text-[#00d4ff]" />
                  </motion.div>
                  <span className="text-sm text-white/70">
                    Powered by UGF · Base Sepolia
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]" />
                  </span>
                </motion.div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className="font-[family-name:var(--font-display)] font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6"
              >
                <span className="text-balance">
                  <TypeWriter text="Claim Verifiable Credentials" delay={0.3} />
                </span>
                <br />
                <motion.span 
                  className="gradient-text inline-block"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  <TypeWriter text="Without ETH." delay={1.2} />
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                className="text-lg text-white/60 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Nexera removes the gas fee barrier so anyone can claim blockchain
                credentials — no ETH, no friction, just Web3 made simple.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                
                  <GlowButton
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        if (!isConnected) {
                          setShowWalletPopup(true);
                          return;
                        }

                        router.push("/claim");
                      }}
                    >
                    <Sparkles className="w-5 h-5" />
                    Claim Your Credential
                    <motion.svg 
                      className="w-5 h-5 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </GlowButton>
                
                <Link href="/verify">
                  <GlowButton variant="outline" size="lg">
                    Verify a Credential
                  </GlowButton>
                </Link>
              </motion.div>

              {/* Trust indicators */}

              <motion.div
                variants={fadeInUp}
                className="mt-8"
              >
                <GlassCard className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Welcome Back,
                    {isConnected
                    ? address.slice(0,6)
                    : "Explorer"}
                  </h3>

                  <p className="text-white/60 mb-3">
                    Wallet Status:
                    <span
                      className={`ml-2 font-semibold ${
                        isConnected
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {isConnected ? "Connected" : "Disconnected"}
                    </span>
                  </p>

                  {isConnected && address && (
                    <p className="text-sm text-[#00d4ff] break-all">
                      {address.slice(0,6)}...{address.slice(-4)}
                    </p>
                  )}

                  <p className="text-white/60">
                    Current Time : {time}
                  </p>
                </GlassCard>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                {trustIndicators.map((indicator, index) => (
                  <motion.div
                    key={indicator}
                    className="flex items-center gap-1.5 text-sm text-white/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, color: 'rgba(255,255,255,0.8)' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5 + index * 0.1, type: 'spring' }}
                    >
                      <Check className="w-4 h-4 text-[#10b981]" />
                    </motion.div>
                    <span>{indicator}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right content - NFT Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5, type: 'spring' }}
              className="flex justify-center lg:justify-end relative"
            >
              {/* Decorative elements around card */}
              <motion.div
                className="absolute -top-10 -left-10 w-20 h-20 border border-[#00d4ff]/20 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-5 -right-5 w-32 h-32 border border-[#7c3aed]/20 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              />
              
              <NFTCredentialCard
                badgeType="hackathon"
                holderName="Alex Johnson"
                tokenId="0042"
                date="May 2025"
                isFloating
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/30" />
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">

    <h2 className="text-4xl font-bold text-center text-white mb-12">
      Dashboard Overview
    </h2>
    
    <div className="grid md:grid-cols-2 gap-6 mt-10">
  <GlassCard className="p-6">
    <h3 className="text-white font-semibold mb-3">
      Wallet Information
    </h3>

    <p className="text-white/60">
      Address:
    </p>

    <p className="text-[#00d4ff] break-all">
      {address || "Not Connected"}
    </p>

    <p className="text-white/60 mt-3">
      Network: Base Sepolia
    </p>
  </GlassCard>

  <GlassCard className="p-6">
    <h3 className="text-white font-semibold mb-3">
      Activity
    </h3>

    <p className="text-white/60">
      Last Login: {time}
    </p>

    <p className="text-white/60">
      Credentials Claimed: 12
    </p>

    <p className="text-white/60">
      NFTs Minted: 8
    </p>
  </GlassCard>
</div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardStats.map((item) => (
        <GlassCard
          key={item.title}
          className="p-6 text-center"
        >
          <h3 className="text-white/60 text-sm mb-3">
            {item.title}
          </h3>

          <p className="text-4xl font-bold text-[#00d4ff]">
            {item.value}
          </p>
        </GlassCard>
      ))}
    </div>
  </div>
</section>

      
      <section className="relative py-8 border-y border-white/5 overflow-hidden bg-[#080d1a]/50">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <motion.span
              key={index}
              className="mx-8 text-sm font-[family-name:var(--font-display)] font-medium text-[#00d4ff]/60 flex items-center gap-2"
              whileHover={{ scale: 1.1, color: 'rgba(0,212,255,1)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]/60" />
              {item}
            </motion.span>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative pt-0 pb-0 px-0 sm:px-3 lg:px-2">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="font-[family-name:var(--font-display)] font-bold text-4xl sm:text-5xl text-white mb-4"
              whileInView={{
                backgroundPosition: ['0% 50%', '100% 50%'],
              }}
              transition={{ duration: 3 }}
            >
              How Nexera Works
            </motion.h2>
            <motion.div 
              className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="relative">
                    {/* Step number */}
                    <motion.span 
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 border border-white/10 flex items-center justify-center text-sm font-mono text-white/50"
                      whileHover={{ scale: 1.2, borderColor: 'rgba(0,212,255,0.5)' }}
                    >
                      {step.step}
                    </motion.span>

                    {/* Icon */}
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 border border-white/10 flex items-center justify-center mb-4"
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: '0 0 30px rgba(0,212,255,0.4)',
                      }}
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(0,212,255,0.1)',
                          '0 0 20px rgba(0,212,255,0.2)',
                          '0 0 10px rgba(0,212,255,0.1)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <step.icon className="w-7 h-7 text-[#00d4ff]" />
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </GlassCard>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 right-0 w-6 h-[2px] transform translate-x-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.15 }}
                    style={{
                     backgroundImage: 'linear-gradient(to right, rgba(0,212,255,0.3), transparent)',
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <GlowButton
              onClick={() => router.push("/claim")}
            >
              Claim Credential
            </GlowButton>

            <GlowButton
              onClick={() => router.push("/verify")}
            >
              Verify NFT
            </GlowButton>

            <GlowButton
              onClick={() => router.push("/profile")}
            >
              View Profile
            </GlowButton>
          
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h2 className="text-3xl font-bold text-white mb-8">
            Recent Credentials
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {credentials.map((item) => (
              <GlassCard key={item.title} className="p-5">
                <h3 className="text-white font-semibold">
                  {item.title}
                </h3>

                <p className="text-white/60">
                  {item.date}
                </p>

                <span className="text-green-400">
                  {item.status}
                </span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-12 relative overflow-hidden">
              {/* Animated background particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#00d4ff]/20"
                    style={{
                      left: `${10 + i * 10}%` as string,
                      top: `${20 + (i % 3) * 30}%` as string,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

          
              <motion.h2
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              >
                Ready to claim your credential?
              </motion.h2>
              <p className="text-foreground/60 mb-8 max-w-md mx-auto relative z-10">
                Join thousands of users claiming verifiable blockchain credentials
                without paying gas fees.
              </p>
              <div className="flex flex-col gap-4">
                <Link href="/claim">
                <GlowButton variant="primary" size="lg">
                  <Sparkles className="w-5 h-5" />
                  Get Started Now
                  <Zap className="w-5 h-5 ml-1" />
                </GlowButton>
              </Link>
              <Link href="/login">
                <GlowButton>
                  Get Started
                </GlowButton>
              </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
