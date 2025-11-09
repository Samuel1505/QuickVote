'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WalletGuard } from '@/components/shared/WalletGuard'
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
    <div className="min-h-screen bg-gradient-to-br from-(--purple-bg) via-white to-(--purple-bg)">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
              <Users className="w-5 h-5 text-(--purple-primary)" />
              <span className="text-sm font-semibold text-(--purple-primary)">CANDIDATES</span>
            </div>
            <h1 className="heading-hero text-(--purple-deep) mb-4">
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
                <div className="inline-block w-16 h-16 border-4 border-(--purple-primary) border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-gray-600">Loading candidates...</p>
              </div>
            ) : contenders.length === 0 ? (
              <div className="text-center py-20">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No Candidates Yet</h3>
                <p className="text-gray-600">No candidates have been registered for this election.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedContenders.map((contender, index) => {
                  const percentage = getPercentage(contender.voteCount)
                  const isLeading = index === 0 && contender.voteCount > 0

                  return (
                    <div 
                      key={contender.contenderAddress}
                      className="group relative p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-(--purple-primary)/30 transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="flex items-center gap-6">
                        {/* Rank Badge */}
                        <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${
                          isLeading 
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {isLeading ? <Award className="w-8 h-8" /> : `#${index + 1}`}
                        </div>

                        {/* Candidate Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-(--purple-deep)">{contender.code}</h3>
                            {isLeading && (
                              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                                LEADING
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 font-mono mb-4">
                            {formatAddress(contender.contenderAddress)}
                          </p>

                          {/* Vote Progress */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Vote Count</span>
                              <span className="font-bold text-(--purple-primary)">
                                {contender.voteCount.toString()} votes ({percentage}%)
                              </span>
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${
                                  isLeading 
                                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                                    : 'bg-gradient-to-r from-(--purple-primary) to-(--purple-light)'
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-(--purple-light)/5 to-transparent rounded-bl-full -z-10" />
                    </div>
                  )
                })}
              </div>
            )}
          </WalletGuard>
        </div>
      </main>

      <Footer />
    </div>
  )
}