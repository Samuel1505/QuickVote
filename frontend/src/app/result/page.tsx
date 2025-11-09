'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WalletGuard } from '@/components/shared/WalletGuard'
import { ResultsChart } from '@/components/results/ResultsChart'
import { useContenders } from '@/hooks/useContenders'
import { Trophy, BarChart3, Users, TrendingUp } from 'lucide-react'
import type { Address } from 'viem'

export default function ResultPage() {
  const { contenders, totalVotes, isLoading } = useContenders()

  const formatAddress = (addr: Address) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Sort contenders by vote count to find winner
  const sortedContenders = [...contenders].sort((a, b) => 
    Number(b.voteCount - a.voteCount)
  )

  const winner = sortedContenders[0]
  const hasVotes = totalVotes > 0

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
              <BarChart3 className="w-5 h-5 text-(--purple-primary)" />
              <span className="text-sm font-semibold text-(--purple-primary)">ELECTION RESULTS</span>
            </div>
            <h1 className="heading-hero text-(--purple-deep) mb-4">
              Live Results
            </h1>
            <p className="text-lead text-gray-600 max-w-2xl mx-auto">
              Real-time election results updated on the blockchain.
            </p>
          </div>

          <WalletGuard message="Connect your wallet to view election results">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="inline-block w-16 h-16 border-4 border-(--purple-primary) border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-gray-600">Loading results...</p>
              </div>
            ) : contenders.length === 0 ? (
              <div className="text-center py-20">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No Results Yet</h3>
                <p className="text-gray-600">No votes have been cast in this election.</p>
              </div>
            ) : (
              <>
                {/* Winner Banner */}
                {hasVotes && winner && (
                  <div className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-2xl">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Trophy className="w-12 h-12 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/90 text-sm font-semibold mb-1">CURRENT LEADER</p>
                        <h2 className="text-4xl font-bold mb-2">{winner.code}</h2>
                        <p className="text-white/80 text-sm font-mono">{formatAddress(winner.contenderAddress)}</p>
                        <div className="mt-4 flex items-center gap-4">
                          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                            <p className="text-2xl font-bold">{winner.voteCount.toString()}</p>
                            <p className="text-xs text-white/80">Total Votes</p>
                          </div>
                          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                            <p className="text-2xl font-bold">{getPercentage(winner.voteCount)}%</p>
                            <p className="text-xs text-white/80">Vote Share</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-(--purple-primary) to-(--purple-light) flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Candidates</p>
                        <p className="text-2xl font-bold text-(--purple-primary)">{contenders.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-(--purple-primary) to-(--purple-light) flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Votes</p>
                        <p className="text-2xl font-bold text-(--purple-primary)">{totalVotes.toString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-(--purple-primary) to-(--purple-light) flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Avg. Votes</p>
                        <p className="text-2xl font-bold text-(--purple-primary)">
                          {contenders.length > 0 ? Math.round(Number(totalVotes) / contenders.length) : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="mb-12 p-8 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-(--purple-deep) mb-6">Vote Distribution</h3>
                  <div className="h-[400px]">
                    <ResultsChart contenders={sortedContenders} />
                  </div>
                </div>

                {/* Detailed Results Table */}
                <div className="p-8 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-(--purple-deep) mb-6">Detailed Results</h3>
                  <div className="space-y-4">
                    {sortedContenders.map((contender, index) => {
                      const percentage = getPercentage(contender.voteCount)
                      
                      return (
                        <div 
                          key={contender.contenderAddress}
                          className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          {/* Rank */}
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-(--purple-primary) to-(--purple-light) flex items-center justify-center">
                            <span className="text-white font-bold">#{index + 1}</span>
                          </div>

                          {/* Candidate Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold text-(--purple-deep)">{contender.code}</p>
                              <p className="text-xs text-gray-500 font-mono">{formatAddress(contender.contenderAddress)}</p>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-(--purple-primary) to-(--purple-light) transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>

                          {/* Vote Count */}
                          <div className="flex-shrink-0 text-right">
                            <p className="text-2xl font-bold text-(--purple-primary)">{contender.voteCount.toString()}</p>
                            <p className="text-sm text-gray-600">{percentage}%</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </WalletGuard>
        </div>
      </main>

      <Footer />
    </div>
  )
}