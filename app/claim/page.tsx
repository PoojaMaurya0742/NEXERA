'use client'

import { ethers } from "ethers";
declare global {
  interface Window {
    ethereum?: any
  }
}
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AnimatedBackground,
  GlassCard,
  GlowButton,
  WalletAddressBadge,
  StepIndicator,
  NFTCredentialCard,
  Navbar,
  Footer,
} from '@/components/nexera'
import { ChevronRight, GraduationCap, Award, Rocket, Lightbulb, Check, Sparkles, Zap, Shield, Clock } from 'lucide-react'
import { useWallet } from "@/components/context/WalletContext";

type BadgeType = 'course' | 'event' | 'hackathon' | 'workshop'

const badgeOptions: { value: BadgeType; label: string; icon: typeof GraduationCap; color: string }[] = [
  { value: 'course', label: 'Course Completion Certificate', icon: GraduationCap, color: '#00d4ff' },
  { value: 'event', label: 'Event Attendance Badge', icon: Award, color: '#a855f7' },
  { value: 'hackathon', label: 'Hackathon Participant Badge', icon: Rocket, color: '#f59e0b' },
  { value: 'workshop', label: 'Workshop Completion Badge', icon: Lightbulb, color: '#10b981' },
]

const steps = ['Details', 'Claim', 'Success']

const mintingMessages = [
  'Connecting to Base Sepolia...',
  'Preparing transaction...',
  'Uploading metadata to IPFS...',
  'Minting your NFT...',
  'Finalizing on-chain...',
]

export default function ClaimPage() {
  const router = useRouter()
  const [currentStep] = useState(0)
  const [name, setName] = useState('')
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | ''>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [mintingStep, setMintingStep] = useState(0)
  const [inputFocused, setInputFocused] = useState(false)
  const { address, isConnected, connectWallet } = useWallet()
  const [tokenId, setTokenId] = useState<number | null>(null);
  
  // Minting progress animation
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setMintingStep((prev) => (prev + 1) % mintingMessages.length)
      }, 600)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  const handleClaim = async () => {
    if (!isConnected) {
      return;
    }
   try {

    if (!name || !selectedBadge) {
      return;
    }

    setIsLoading(true);

    const provider = new ethers.BrowserProvider(window.ethereum);
    
    const network = await provider.getNetwork();
    console.log("CHAIN ID:", network.chainId);

    console.log("CONTRACT_ADDRESS =", CONTRACT_ADDRESS);
    console.log("TYPE =", typeof CONTRACT_ADDRESS);
    console.log("LENGTH =", CONTRACT_ADDRESS.length);
    console.log("VALID =", ethers.isAddress(CONTRACT_ADDRESS));

    const code = await provider.getCode(CONTRACT_ADDRESS);
    console.log("CODE:", code);

    console.log("Wallet Address:", address);
    console.log(
      "Wallet valid:",
      ethers.isAddress(address)
    );

    console.log(
      "Contract valid:",
      ethers.isAddress(CONTRACT_ADDRESS)
    );
    console.log("Contract Address:", CONTRACT_ADDRESS);

    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    console.log("Contract Address:", CONTRACT_ADDRESS);

    const nextId = await contract.nextTokenId();

    console.log("NEXT TOKEN ID:", nextId.toString());
   
    console.log("ADDRESS:", address);
    console.log("TYPE:", typeof address);
    console.log("CONNECTED:", isConnected);

    const tx = await contract.issueCredential(
      address,
      name,
      selectedBadge,
      "bafkreidhqmagqp2nekjxtnk5kop2reo3zaghp65glqdcw5gq4qkmhlzldi"
    );
    console.log("TX HASH:", tx.hash);
    console.log(tx);

    await tx.wait();
    console.log("MINT SUCCESS");

    const owner = await contract.ownerOf(1);
    console.log("OWNER OF TOKEN 1:", owner);

    const nextTokenId = await contract.nextTokenId();
    const mintedTokenId = Number(nextTokenId) - 1;

    console.log("MINTED TOKEN ID:", mintedTokenId);
    setTokenId(mintedTokenId);
    
    const params = new URLSearchParams({
      name: name.trim(),
      badge: selectedBadge.trim(),
      txHash: tx.hash,
      tokenId: mintedTokenId.toString(),
    })

    router.push(`/success?${params.toString()}`)
   

  } catch (err: any) {
    if (err.code === 4001) return;
    console.error("FULL ERROR:", err);

    alert(
      err?.reason ||
      err?.shortMessage ||
      err?.message ||
      "Mint failed"
    );

  } finally {

    setIsLoading(false);

  }
};



  const selectedBadgeOption = badgeOptions.find((b) => b.value === selectedBadge)
  const isFormValid = name.length > 0 && selectedBadge !== ''

  return (
  <ProtectedRoute>
      <main className="relative min-h-screen">
        <AnimatedBackground />
        <Navbar />

        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-white/50 mb-8"
            >
              <Link href="/" className="hover:text-[#00d4ff] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{!isConnected ? "Connect Wallet First" : "Claim Credential"}</span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="p-8" hover={false} interactive={false}>
                  {/* Header */}
                  <div className="mb-8">
                    <motion.div 
                      className="flex items-center gap-3 mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-6 h-6 text-[#00d4ff]" />
                      </motion.div>
                      <h1 className="font-[family-name:var(--font-display)] font-bold text-2xl text-white">
                        Claim Your Credential
                      </h1>
                    </motion.div>
                    <motion.div 
                      className="w-12 h-1 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3 }}
                    />
                  </div>

                  {/* Step indicator */}
                  <div className="mb-8">
                    <StepIndicator steps={steps} currentStep={currentStep} />
                  </div>

                  {/* Form */}
                  <div className="space-y-6">
                    {/* Name input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] opacity-0 blur-sm -z-10"
                          animate={{ opacity: inputFocused ? 0.3 : 0 }}
                          transition={{ duration: 0.2 }}
                        />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={() => setInputFocused(true)}
                          onBlur={() => setInputFocused(false)}
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/50 transition-all"
                        />
                        <AnimatePresence>
                          {name.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                              <Check className="w-5 h-5 text-[#10b981]" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Badge selector */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Select Badge Type
                      </label>
                      <div className="relative">
                        <motion.button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-left flex items-center justify-between focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/50 transition-all"
                          whileHover={{ borderColor: 'rgba(0,212,255,0.5)' }}
                          whileTap={{ scale: 0.99 }}
                        >
                          {selectedBadgeOption ? (
                            <motion.span 
                              className="flex items-center gap-2 text-white"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 0.5 }}
                              >
                                <selectedBadgeOption.icon 
                                  className="w-5 h-5" 
                                  style={{ color: selectedBadgeOption.color }}
                                />
                              </motion.div>
                              {selectedBadgeOption.label}
                            </motion.span>
                          ) : (
                            <span className="text-white/30">Choose a badge type</span>
                          )}
                          <motion.div
                            animate={{ rotate: isDropdownOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-5 h-5 text-white/30" />
                          </motion.div>
                        </motion.button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-[#0a0f1a]/95 backdrop-blur-xl border border-white/10 overflow-hidden z-20"
                            >
                              {badgeOptions.map((option, index) => (
                                <motion.button
                                  key={option.value}
                                  type="button"
                                  onClick={() => {
                                    setSelectedBadge(option.value)
                                    setIsDropdownOpen(false)
                                  }}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left group"
                                  whileHover={{ x: 5 }}
                                >
                                  <motion.div
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <option.icon className="w-5 h-5" style={{ color: option.color }} />
                                  </motion.div>
                                  <span className="text-white group-hover:text-[#00d4ff] transition-colors">
                                    {option.label}
                                  </span>
                                  {selectedBadge === option.value && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="ml-auto"
                                    >
                                      <Check className="w-4 h-4 text-[#10b981]" />
                                    </motion.div>
                                  )}
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Info cards */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-2 gap-3"
                    >
                      <motion.div 
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                        whileHover={{ borderColor: 'rgba(0,212,255,0.3)', y: -2 }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="w-4 h-4 text-[#00d4ff]" />
                          <span className="text-xs text-white/50">Network</span>
                        </div>
                        <span className="text-sm text-white font-medium">Base Sepolia</span>
                      </motion.div>
                      <motion.div 
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                        whileHover={{ borderColor: 'rgba(124,58,237,0.3)', y: -2 }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-[#7c3aed]" />
                          <span className="text-xs text-white/50">Mint Time</span>
                        </div>
                        <span className="text-sm text-white font-medium">~3 seconds</span>
                      </motion.div>
                    </motion.div>

                    {/* Wallet status */}
                    <motion.div 
                      className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ borderColor: 'rgba(0,212,255,0.2)' }}
                    >
                      <span className="text-sm text-white/50">Wallet</span>
                      {
                        isConnected ? (
                          <WalletAddressBadge
                            address={address}
                            showCopy={false}
                          />
                        ) : (
                          <span className="text-red-400">
                            Not Connected
                          </span>
                        )
                      }
                    </motion.div>

                    {/* Gas fee row */}
                    <motion.div 
                      className="flex items-center justify-between p-4 rounded-xl bg-[#10b981]/5 border border-[#10b981]/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#10b981]" />
                        <span className="text-sm text-white/50">Gas Fee</span>
                        <span className="text-sm text-white/30 line-through">~$2.40</span>
                      </div>
                      <motion.div 
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/30"
                        animate={{
                          boxShadow: [
                            '0 0 10px rgba(16,185,129,0.2)',
                            '0 0 20px rgba(16,185,129,0.4)',
                            '0 0 10px rgba(16,185,129,0.2)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Check className="w-4 h-4 text-[#10b981]" />
                        <span className="text-sm font-medium text-[#10b981]">FREE via UGF</span>
                      </motion.div>
                    </motion.div>

                    {/* Submit button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <GlowButton
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={handleClaim}
                        disabled={!isFormValid}
                        isLoading={isLoading}
                      >
                        {isLoading ? (
                          <motion.span
                            key={mintingStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                          >
                            {mintingMessages[mintingStep]}
                          </motion.span>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            {!isConnected ? "Connect Wallet First" : "Claim Credential"}
                            <motion.svg 
                              className="w-5 h-5" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </motion.svg>
                          </>
                        )}
                      </GlowButton>
                    </motion.div>
                  </div>

                  {/* Reassurance text */}
                  <motion.p 
                    className="mt-6 text-center text-sm text-white/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    Your credential will be minted as an ERC-721 NFT. No ETH required.
                  </motion.p>
                </GlassCard>
              </motion.div>

              {/* Preview Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:sticky lg:top-32"
              >
                <motion.div 
                  className="text-center mb-6"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider flex items-center justify-center gap-2">
                    <motion.span
                      className="w-2 h-2 rounded-full bg-[#00d4ff]"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Live Preview
                  </h3>
                </motion.div>
                
                <AnimatePresence mode="wait">
                  {selectedBadge ? (
                    <motion.div
                      key={selectedBadge}
                      initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <NFTCredentialCard
                        badgeType={selectedBadge}
                        holderName={name || 'Your Name'}
                        isPreview
                        isFloating
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <GlassCard className="p-12 text-center" hover={false} interactive={false}>
                        <motion.div 
                          className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center"
                          animate={{
                            borderColor: ['rgba(255,255,255,0.1)', 'rgba(0,212,255,0.3)', 'rgba(255,255,255,0.1)'],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <Award className="w-10 h-10 text-white/20" />
                          </motion.div>
                        </motion.div>
                        <p className="text-white/40">
                          Select a badge type to see a preview
                        </p>
                      </GlassCard>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ProtectedRoute>
  
  )
}
