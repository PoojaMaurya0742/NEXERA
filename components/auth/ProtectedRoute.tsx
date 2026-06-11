'use client'

import { useWallet } from "@/components/context/WalletContext";
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {

  const { isConnected } = useWallet()
  const router = useRouter()

  useEffect(() => {

    if (!isConnected) {
      router.push("/")
    }

  }, [isConnected, router])

  if (!isConnected) {
    return null
  }

  return <>{children}</>
}