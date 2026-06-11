'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWallet } from "@/components/context/WalletContext";
import { GlassCard } from "@/components/nexera";

import {
  User,
  Wallet,
  Trophy,
  ShieldCheck,
  Calendar,
  ArrowLeft,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [credentialsCount, setCredentialsCount] =
  useState(0);
  const {
    address,
    isConnected,
    disconnectWallet,
  } = useWallet();

  const [joinDate, setJoinDate] = useState("");

  useEffect(() => {
    let storedDate = localStorage.getItem("joinDate");

    if (!storedDate) {
      storedDate = new Date().toLocaleDateString();
      localStorage.setItem("joinDate", storedDate);
    }

    setJoinDate(storedDate);

    const storedCredentials =
  JSON.parse(
    localStorage.getItem("credentials") || "[]"
  );

    setCredentialsCount(
  storedCredentials.length
);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    disconnectWallet();

    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* Back Button */}

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#00d4ff] hover:text-white mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Profile Header */}

        <GlassCard className="p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-center gap-5">

            <div
            className="
            w-28 h-28
            rounded-full
            bg-cyan-400
            flex items-center
            justify-center
            shadow-[0_0_40px_rgba(34,211,238,0.8)]
            "
            >
            <User className="w-14 h-14 text-black" />
            </div>

              <div>
                <h1 className="text-3xl font-bold">
                {userName || "Nexera User"}
                </h1>

                <p>
                Credential Holder
                </p>
              </div>

            </div>

          </div>
        </GlassCard>

        {/* Wallet Info */}

        <GlassCard className="p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Account Information
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <Wallet className="text-[#00d4ff]" />

              <span className="text-white/60">
                Wallet Address:
              </span>

              <span className="break-all">
                {isConnected && address
                ? `${address.slice(0,6)}...${address.slice(-4)}`
                : "Wallet Not Connected"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-400" />

              <span className="text-white/60">
                Network:
              </span>

              <span>Base Sepolia</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-yellow-400" />

              <span className="text-white/60">
                Join Date:
              </span>

              <span>{joinDate}</span>
            </div>

          </div>
        </GlassCard>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <GlassCard className="p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto text-[#00d4ff] mb-3" />

            <h3 className="text-white/60 mb-2">
                {credentialsCount}
            </h3>

            <p className="text-4xl font-bold">
            {credentialsCount}
            </p>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto text-purple-400 mb-3" />

            <h3 className="text-white/60 mb-2">
              {credentialsCount}
            </h3>

            <p className="text-4xl font-bold">
               {credentialsCount}
            </p>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <ShieldCheck className="w-8 h-8 mx-auto text-green-400 mb-3" />

            <h3 className="text-white/60 mb-2">
              Verified
            </h3>

            <p className="text-4xl font-bold">
              100%
            </p>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <Wallet className="w-8 h-8 mx-auto text-yellow-400 mb-3" />

            <h3 className="text-white/60 mb-2">
              Network
            </h3>

            <p className="text-xl font-bold">
              Base Sepolia
            </p>
          </GlassCard>

        </div>

        {/* Recent Activity */}

        <GlassCard className="p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="border-l-2 border-[#00d4ff] pl-4">
              <p className="font-semibold">
                AI Skills Fest Credential Claimed
              </p>
              <p className="text-white/50 text-sm">
                08 Jun 2026
              </p>
            </div>

            <div className="border-l-2 border-green-400 pl-4">
              <p className="font-semibold">
                NFT Successfully Minted
              </p>
              <p className="text-white/50 text-sm">
                09 Jun 2026
              </p>
            </div>

            <div className="border-l-2 border-purple-400 pl-4">
              <p className="font-semibold">
                Credential Verified
              </p>
              <p className="text-white/50 text-sm">
                10 Jun 2026
              </p>
            </div>

          </div>

        </GlassCard>

      </div>

    </main>
  );
}

