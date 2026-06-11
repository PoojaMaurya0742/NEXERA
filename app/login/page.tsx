'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from '@/components/auth/auth-form'
import { BrandPanel } from '@/components/auth/brand-panel'
import { NexeraWordmark } from '@/components/nexera-logo'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Page() {
  const [name, setName] = useState("");
  const router = useRouter();
  useEffect(() => {

  const loggedIn = localStorage.getItem("isLoggedIn");

  if (loggedIn) {
    router.push("/");
  }
  }, []);
  
  return (
    <main className="relative min-h-screen lg:grid lg:grid-cols-2">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan/20 blur-[120px] animate-blob" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet/20 blur-[120px] animate-blob" />
      
      {/* Theme toggle */}
      <div className="fixed right-6 top-6 z-50 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      {/* Left: brand panel (desktop) */}
      <section className="relative border-r border-border bg-background/60 backdrop-blur-xl">
        <BrandPanel />
      </section>

      {/* Right: auth form */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12 sm:px-8 bg-background">
        {/* mobile ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 left-1/2 size-64 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl lg:hidden"
        />

        {/* mobile logo */}
        <div className="relative z-10 mb-8 lg:hidden">
          <NexeraWordmark />
        </div>

        <div className="relative z-10 flex w-full flex-1 items-center justify-center">
          <AuthForm />
        </div>

        <p className="relative z-10 mt-8 text-center text-xs text-muted-foreground">
          Secured by Base Sepolia · ERC-721 · &copy; {new Date().getFullYear()}{' '}
          Nexera
        </p>
      </section>
    </main>
  )
}
