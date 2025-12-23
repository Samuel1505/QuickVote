'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WalletGuard } from '@/components/shared/WalletGuard'
import { ContenderList } from '@/components/contender/ContenderList'
import { useContenders } from '@/hooks/useContenders'
import { Users, Award, TrendingUp } from 'lucide-react'
import type { Address } from 'viem'

export default function ContenderPage() {
  const { contenders, totalVotes, isLoading } = useContenders()

  const formatAddress = (addr: Address) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Sort contenders by vote count
  const sortedContenders = [...contenders].sort((a, b) => 
    Number(b.voteCount - a.voteCount)
  )

  const getPercentage = (voteCount: bigint) => {
    return totalVotes > 0 
      ? Number((voteCount * BigInt(100)) / totalVotes) 
      : 0
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-bg via-white to-purple-bg">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
              <Users className="w-5 h-5 text-purple-primary" />
              <span className="text-sm font-semibold text-purple-primary">CANDIDATES</span>
            </div>
            <h1 className="heading-hero text-purple-deep mb-4">
              Meet the Candidates
            </h1>
            <p className="text-lead text-gray-600 max-w-2xl mx-auto">
              View all registered candidates and their current vote standings.
            </p>
          </div>

          <WalletGuard message="Connect your wallet to view candidate information">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-(--purple-primary) to-(--purple-light) text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-(--purple-bg) mb-2">Total Candidates</p>
                    <p className="text-5xl font-bold">{contenders.length}</p>
                  </div>
                  <Users className="w-16 h-16 text-white/30" />
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-(--purple-light) to-(--purple-lighter) text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-(--purple-bg) mb-2">Total Votes</p>
                    <p className="text-5xl font-bold">{totalVotes.toString()}</p>
                  </div>
                  <TrendingUp className="w-16 h-16 text-white/30" />
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="text-center py-20">
                <div className="inline-block w-16 h-16 border-4 border-purple-primary border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-gray-600">Loading candidates...</p>
              </div>
            ) : contenders.length === 0 ? (
              <div className="text-center py-20">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No Candidates Yet</h3>
                <p className="text-gray-600">No candidates have been registered for this election.</p>
              </div>
            ) : (
              <ContenderList />

            )}
          </WalletGuard>
        </div>
      </main>

      <Footer />
    </div>
  )
}