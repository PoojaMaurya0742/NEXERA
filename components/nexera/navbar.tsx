'use client'
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/components/context/WalletContext";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GlowButton } from './glow-button'
import { Menu, X, Hexagon } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/claim', label: 'Claim' },
  { href: '/verify', label: 'Verify' },
]

export function Navbar() {
  
  const {
  address,
  isConnected,
  connectWallet,
  disconnectWallet,
  } = useWallet();

  const [showProfileMenu,setShowProfileMenu] = useState(false);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");

  disconnectWallet();

  router.push("/login");
  };

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'py-3 bg-[#050810]/80 backdrop-blur-xl border-b border-white/5'
            : 'py-5 bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Hexagon className="w-8 h-8 text-[#00d4ff] fill-[#00d4ff]/20 transition-all duration-300 group-hover:fill-[#00d4ff]/40" />
                <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-display)] font-bold text-white text-xs">
                  N
                </span>
              </div>
              <span className="font-[family-name:var(--font-display)] font-bold text-xl text-white tracking-tight">
                NEXERA
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    pathname === link.href
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

<div className="relative">

  <button
    onClick={() =>
      setShowProfileMenu(!showProfileMenu)
    }
    className="
      w-15 h-15
      rounded-full
      bg-[#00d4ff]/20
      border border-[#00d4ff]/30
      flex items-center
      justify-center
    "
  >
    <User className="w-10 h-10 text-[#00d4ff]" />
  </button>

  {showProfileMenu && (
    <div
      className="
        absolute
        right-0
        mt-3
        w-48
        bg-[#0a0f1a]
        border border-white/10
        rounded-xl
        p-2
        shadow-xl
      "
    >
      <button
        onClick={() => router.push("/profile")}
        className="
          w-full
          text-left
          px-3 py-2
          rounded-lg
          hover:bg-white/5
        "
      >
        My Profile
      </button>

      <button
        onClick={handleLogout}
        className="
          w-full
          text-left
          px-3 py-2
          rounded-lg
          text-red-400
          hover:bg-white/5
        "
      >
        Logout
      </button>
    </div>
  )}

</div>


            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#050810]/95 backdrop-blur-xl" />
            <motion.div
              className="relative flex flex-col items-center justify-center h-full gap-8 p-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-[family-name:var(--font-display)] font-semibold text-white hover:text-[#00d4ff] transition-colors"
                    onClick={() => {
                      if (isConnected) {
                        disconnectWallet();
                      } else {
                        connectWallet();
                      }

                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <GlowButton
                    variant="primary"
                    size="lg"
                    onClick={
                      isConnected
                        ? disconnectWallet
                        : connectWallet
                    }
                  >
                    {isConnected
                      ? `${address.slice(0, 6)}...${address.slice(-4)}`
                      : "Connect Wallet"}
                  </GlowButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
