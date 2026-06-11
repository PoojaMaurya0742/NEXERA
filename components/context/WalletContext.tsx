"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

type WalletContextType = {
  address: string;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext =
  createContext<WalletContextType | null>(null);

export function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem("walletAddress");

    if (saved) {
      setAddress(saved);
      setIsConnected(true);
    }
  }, []);

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      const provider =
        new ethers.BrowserProvider(
          window.ethereum
        );

      const accounts =
        await provider.send(
          "eth_requestAccounts",
          []
        );

      setAddress(accounts[0]);
      setIsConnected(true);

      localStorage.setItem(
        "walletAddress",
        accounts[0]
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );
    } catch (err) {
      console.error(err);
    }
  }

  function disconnectWallet() {
    setAddress("");
    setIsConnected(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem(
      "walletAddress"
    );
    
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context =
    useContext(WalletContext);

  if (!context) {
    throw new Error(
      "useWallet must be used inside WalletProvider"
    );
  }

  return context;
}