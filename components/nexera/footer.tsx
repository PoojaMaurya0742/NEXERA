import Link from 'next/link'
import { Hexagon } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050810]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Hexagon className="w-6 h-6 text-[#00d4ff] fill-[#00d4ff]/20" />
              <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-display)] font-bold text-white text-[10px]">
                N
              </span>
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-lg text-white tracking-tight">
              NEXERA
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/claim" className="hover:text-white transition-colors">
              Claim
            </Link>
            <Link href="/verify" className="hover:text-white transition-colors">
              Verify
            </Link>
          </div>

          {/* Built on */}
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>Built on</span>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
              <div className="w-4 h-4 rounded-full bg-[#0052FF] flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">B</span>
              </div>
              <span className="text-white/60 text-xs">Base Sepolia</span>
            </div>
            <span className="text-white/30">·</span>
            <span>Powered by UGF</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-white/30">
            Making Web3 accessible to everyone — no ETH required.
          </p>
        </div>
      </div>
    </footer>
  )
}
