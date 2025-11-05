import Link from "next/link"
import { Vote } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-2">
            <Vote className="w-8 h-8 text-(--purple-primary)" />
            <span className="text-xl font-bold text-(--purple-deep)">QuickVote</span>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-(--purple-primary) font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/ongoing-election" 
              className="text-gray-700 hover:text-(--purple-primary) font-medium transition-colors"
            >
              Ongoing Election
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-(--purple-primary) font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-(--purple-primary) font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Connect Wallet Button */}
          <Button 
            className="bg-(--purple-primary) hover:bg-(--purple-deep) text-white"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  )
}