'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WalletGuard } from '@/components/shared/WalletGuard'
import { ContenderCard } from '@/components/voting/ContenderCard'
import { useContenders } from '@/hooks/useContenders'
import { useVoteStatus } from '@/hooks/useVoteStatus'
import { useVotingContract } from '@/hooks/useVotingContract'
import { Vote as VoteIcon, CheckCircle, AlertCircle } from 'lucide-react'
import type { Address } from 'viem'

export default function VotePage() {
  const { contenders, totalVotes, isLoading: loadingContenders, refetch } = useContenders()
  const { hasVoted, isLoading: loadingVoteStatus, refetch: refetchVoteStatus } = useVoteStatus()
  const { vote, isPending, isConfirming, isSuccess, error, isConnected } = useVotingContract()
  const [selectedContender, setSelectedContender] = useState<Address | null>(null)

  const handleVote = (contenderAddress: Address) => {
    setSelectedContender(contenderAddress)
    vote(contenderAddress)
  }

  // Refetch data after successful vote
  if (isSuccess) {
    setTimeout(() => {
      refetch()
      refetchVoteStatus()
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-(--purple-bg) via-white to-(--purple-bg)">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
              <VoteIcon className="w-5 h-5 text-(--purple-primary)" />
              <span className="text-sm font-semibold text-(--purple-primary)">CAST YOUR VOTE</span>
            </div>
            <h1 className="heading-hero text-(--purple-deep) mb-4">
              Vote for Your Candidate
            </h1>
            <p className="text-lead text-gray-600 max-w-2xl mx-auto">
              Select your preferred candidate and cast your vote securely on the blockchain.
            </p>
          </div>

          <WalletGuard message="Connect your wallet to view candidates and cast your vote">
            {/* Vote Status Banner */}
            {hasVoted && (
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900 text-lg">Vote Recorded!</h3>
                    <p className="text-green-700">Your vote has been successfully recorded on the blockchain.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-(--purple-bg) to-white border-2 border-(--purple-primary)/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-(--purple-primary) to-(--purple-light) flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-(--purple-deep) text-lg">Transaction Successful!</h3>
                    <p className="text-gray-700">Your vote has been confirmed on the blockchain.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-900 text-lg">Transaction Failed</h3>
                    <p className="text-red-700 text-sm">{error.message}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">Total Candidates</p>
                  <p className="text-4xl font-bold text-(--purple-primary)">{contenders.length}</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">Total Votes Cast</p>
                  <p className="text-4xl font-bold text-(--purple-primary)">{totalVotes.toString()}</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">Your Status</p>
                  <p className="text-2xl font-bold text-(--purple-primary)">
                    {hasVoted ? '✓ Voted' : 'Not Voted'}
                  </p>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loadingContenders || loadingVoteStatus ? (
              <div className="text-center py-20">
                <div className="inline-block w-16 h-16 border-4 border-(--purple-primary) border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-gray-600">Loading candidates...</p>
              </div>
            ) : contenders.length === 0 ? (
              <div className="text-center py-20">
                <VoteIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No Candidates Yet</h3>
                <p className="text-gray-600">No candidates have been registered for this election.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contenders.map((contender) => (
                  <ContenderCard
                    key={contender.contenderAddress}
                    contenderAddress={contender.contenderAddress}
                    code={contender.code}
                    voteCount={contender.voteCount}
                    totalVotes={totalVotes}
                    onVote={handleVote}
                    hasVoted={hasVoted}
                    isPending={isPending && selectedContender === contender.contenderAddress}
                    isConnected={isConnected}
                  />
                ))}
              </div>
            )}
          </WalletGuard>
        </div>
      </main>

      <Footer />
    </div>
  )
}