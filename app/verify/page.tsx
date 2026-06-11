'use client'

import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AnimatedBackground,
  GlassCard,
  GlowButton,
  NFTCredentialCard,
  StatusBadge,
  Navbar,
  Footer,
} from '@/components/nexera'
import { Search, Shield, Link as LinkIcon, CheckCircle, ExternalLink } from 'lucide-react'

type SearchMode = 'wallet' | 'token'

interface VerifiedCredential {
  badgeType: 'course' | 'event' | 'hackathon' | 'workshop'
  holderName: string
  tokenId: string
  date: string
  txHash: string
}

export default function VerifyPage() {
  const [searchMode, setSearchMode] = useState<SearchMode>('wallet')
  const [searchValue, setSearchValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [verifiedCredential, setVerifiedCredential] = useState<VerifiedCredential | null>(null)
  const [error, setError] = useState('')

  const handleVerify = async () => {
    if (!searchValue) return

    setIsSearching(true)
    setError('')
    setVerifiedCredential(null)

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
    );

    let data;

    if (searchMode === "wallet") {
      data = await contract.verifyCredential(searchValue);
    } else {
      data = await contract.verifyByTokenId(searchValue);
    }

    const tokenId = data[0].toString();
    const name = data[1];
    const course = data[2];
    const ipfsHash = data[3];
    const verified = data[4];

    if (!verified) {
      setError("Credential not found");
      setIsSearching(false);
      return;
    }

    setVerifiedCredential({
      badgeType: "course",
      holderName: name,
      tokenId: tokenId,
      date: new Date().toLocaleDateString(),
      txHash: ipfsHash,
    });

    } catch (err) {
      console.error(err);
      setError("Verification failed");
    }

    setIsSearching(false);
  };

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left column - Search */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-[family-name:var(--font-display)] font-bold text-4xl text-white mb-4">
                  Verify a Credential
                </h1>
                <p className="text-white/60 mb-8 max-w-md">
                  Check if an NFT credential is authentic and on-chain
                </p>

                <GlassCard className="p-6" hover={false}>
                  {/* Search mode tabs */}
                  <div className="flex gap-2 p-1 bg-white/[0.03] rounded-xl mb-6">
                    <button
                      onClick={() => setSearchMode('wallet')}
                      className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                        searchMode === 'wallet'
                          ? 'bg-gradient-to-r from-[#00d4ff]/20 to-[#7c3aed]/20 text-white border border-white/10'
                          : 'text-white/50 hover:text-white'
                      }`}
                    >
                      By Wallet Address
                    </button>
                    <button
                      onClick={() => setSearchMode('token')}
                      className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                        searchMode === 'token'
                          ? 'bg-gradient-to-r from-[#00d4ff]/20 to-[#7c3aed]/20 text-white border border-white/10'
                          : 'text-white/50 hover:text-white'
                      }`}
                    >
                      By Token ID
                    </button>
                  </div>

                  {/* Search input */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder={
                        searchMode === 'wallet'
                          ? 'Enter wallet address (0x...)'
                          : 'Enter token ID'
                      }
                      className="w-full px-4 py-3 pl-12 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/50 transition-all font-mono"
                      onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  </div>

                  <GlowButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleVerify}
                    isLoading={isSearching}
                  >
                    {isSearching ? 'Verifying...' : 'Verify'}
                    {!isSearching && <ExternalLink className="w-4 h-4 ml-1" />}
                  </GlowButton>

                  {/* Error message */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-sm text-red-400 text-center"
                    >
                      {error}
                    </motion.p>
                  )}
                </GlassCard>

                {/* Verified credential result */}
                <AnimatePresence>
                  {verifiedCredential && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6"
                    >
                      <GlassCard className="p-6" glowColor="success" hover={false}>
                        {/* Verified badge */}
                        <div className="flex items-center justify-center mb-6">
                          <StatusBadge status="verified" label="VERIFIED ON-CHAIN" pulse />
                        </div>

                        {/* NFT details */}
                        <div className="flex justify-center mb-6">
                          <NFTCredentialCard
                            badgeType={verifiedCredential.badgeType}
                            holderName={verifiedCredential.holderName}
                            tokenId={verifiedCredential.tokenId}
                            date={verifiedCredential.date}
                            isPreview
                          />
                        </div>

                        {/* On-chain proof */}
                        <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/50">Transaction</span>
                            <a
                              href={`https://sepolia.basescan.org/tx/${verifiedCredential.txHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-sm text-[#00d4ff] hover:underline flex items-center gap-1"
                            >
                              {verifiedCredential.txHash.slice(0, 8)}...
                              {verifiedCredential.txHash.slice(-4)}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>

                        <p className="mt-4 text-center text-xs text-white/40">
                          Issued via Nexera · Gasless via UGF
                        </p>
                      </GlassCard>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right column - Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-8 h-fit lg:sticky lg:top-32" hover={false}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 border border-white/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <h2 className="font-[family-name:var(--font-display)] font-semibold text-xl text-white">
                    Why Trust Nexera Credentials?
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-[#00d4ff]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">
                        Immutable On-Chain Records
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        Every credential is permanently stored on Base Sepolia
                        blockchain, making it impossible to forge or alter.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center">
                      <LinkIcon className="w-4 h-4 text-[#7c3aed]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">
                        Transparent Verification
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        Anyone can verify credentials directly on the blockchain
                        using public explorers like BaseScan.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-[#10b981]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">
                        ERC-721 Standard
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        Built on the industry-standard NFT protocol, ensuring
                        compatibility across all Web3 platforms.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Animated chain blocks */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-center gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 rounded bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 border border-white/10"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                    <span className="text-white/30 text-xs ml-2">Verified</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
