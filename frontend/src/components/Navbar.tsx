'use client'

import Link from "next/link"
import { Vote, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsRegistrar } from "@/hooks/useIsRegistrar"

export function Navbar() {
  const { isRegistrar, isConnected } = useIsRegistrar()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-2">
            <Vote className="w-8 h-8 text-purple-primary" />
            <span className="text-xl font-bold text-purple-deep">QuickVote</span>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-purple-primary font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/vote" 
              className="text-gray-700 hover:text-purple-primary font-medium transition-colors"
            >
              Vote
            </Link>
            <Link 
              href="/contender" 
              className="text-gray-700 hover:text-purple-primary font-medium transition-colors"
            >
              Contenders
            </Link>
            <Link 
              href="/result" 
              className="text-gray-700 hover:text-purple-primary font-medium transition-colors"
            >
              Results
            </Link>
            
            {/* Admin Link - Only visible to registrar */}
            {isConnected && isRegistrar && (
              <Link 
                href="/admin" 
                className="flex items-center gap-2 text-gray-700 hover:text-purple-primary font-medium transition-colors"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
          </div>

          {/* Connect Wallet Button */}
          <Button 
            className="bg-(--purple-primary) hover:bg-purple-deep text-white"
          >
            <appkit-button />
          </Button>
        </div>
      </div>
    </nav>
  )
}