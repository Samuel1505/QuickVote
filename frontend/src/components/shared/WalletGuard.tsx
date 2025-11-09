'use client'

import { useAccount } from 'wagmi'
import { Wallet } from 'lucide-react'
import type { ReactNode } from 'react'

interface WalletGuardProps {
  children: ReactNode
  message?: string
}

export function WalletGuard({ children, message = "Please connect your wallet to continue" }: WalletGuardProps) {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-(--purple-primary) to-(--purple-light)">
            <Wallet className="w-12 h-12 text-white" />
          </div>
          <h2 className="heading-section text-(--purple-deep)">
            Wallet Not Connected
          </h2>
          <p className="text-lead text-gray-600">
            {message}
          </p>
          <div className="pt-4">
            <appkit-button />
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}