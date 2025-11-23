'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WalletGuard } from '@/components/shared/WalletGuard'
import { ContenderCard } from '@/components/voting/ContenderCard'
import { VoteConfirmDialog } from '@/components/voting/VoteConfirmDialog'
import { useContenders } from '@/hooks/useContenders'
import { useVoteStatus } from '@/hooks/useVoteStatus'
import { useVotingContract } from '@/hooks/useVotingContract'
import { Vote as VoteIcon, CheckCircle, AlertCircle, Search, Filter, X, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Address } from 'viem'

export default function VotePage() {
  const { contenders, totalVotes, isLoading: loadingContenders, refetch } = useContenders()
  const { hasVoted, isLoading: loadingVoteStatus, refetch: refetchVoteStatus } = useVoteStatus()
  const { vote, isPending, isConfirming, isSuccess, error, isConnected } = useVotingContract()
  
  const [selectedContender, setSelectedContender] = useState<Address | null>(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'votes' | 'code'>('votes')
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

  // Filter and sort contenders
  const filteredContenders = useMemo(() => {
    let filtered = contenders.filter(c => 
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contenderAddress.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (sortBy === 'votes') {
      filtered.sort((a, b) => Number(b.voteCount - a.voteCount))
    } else {
      filtered.sort((a, b) => a.code.localeCompare(b.code))
    }

    return filtered
  }, [contenders, searchQuery, sortBy])

  const handleVoteClick = (contenderAddress: Address) => {
    setSelectedContender(contenderAddress)
    setConfirmDialogOpen(true)
  }

  const handleConfirmVote = () => {
    if (selectedContender) {
      vote(selectedContender)
      setConfirmDialogOpen(false)
    }
  }

  // Handle success animation
  if (isSuccess && !showSuccessAnimation) {
    setShowSuccessAnimation(true)
    setTimeout(() => {
      refetch()
      refetchVoteStatus()
      setShowSuccessAnimation(false)
    }, 3000)
  }

  const selectedContenderData = contenders.find(c => c.contenderAddress === selectedContender)

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
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-green-900 text-lg">Vote Recorded!</h3>
                    <p className="text-green-700">Your vote has been successfully recorded on the blockchain.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Animation */}
            {showSuccessAnimation && (
              <div className="mb-8 p-8 rounded-2xl bg-gradient-to-r from-(--purple-primary) to-(--purple-light) text-white animate-in zoom-in duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-pink-400/20 animate-pulse" />
                <div className="relative flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-1">🎉 Vote Confirmed!</h3>
                    <p className="text-white/90">Your vote has been successfully recorded on the blockchain.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction Processing */}
            {(isPending || isConfirming) && (
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900 text-lg">
                      {isPending ? 'Waiting for Confirmation...' : 'Processing Transaction...'}
                    </h3>
                    <p className="text-blue-700 text-sm">
                      {isPending ? 'Please confirm the transaction in your wallet' : 'Your vote is being recorded on the blockchain'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-red-900 text-lg mb-1">Transaction Failed</h3>
                    <p className="text-red-700 text-sm break-words">{error.message}</p>
                  </div>
                  <button 
                    onClick={() => window.location.reload()}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Dismiss error"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">Total Candidates</p>
                  <p className="text-4xl font-bold text-(--purple-primary)">{contenders.length}</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">Total Votes Cast</p>
                  <p className="text-4xl font-bold text-(--purple-primary)">{totalVotes.toString()}</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">Your Status</p>
                  <p className="text-2xl font-bold text-(--purple-primary)">
                    {hasVoted ? '✓ Voted' : 'Not Voted'}
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Filter Controls */}
            {!loadingContenders && contenders.length > 0 && (
              <div className="mb-8 p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search by candidate code or address..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-(--purple-primary)"
                      aria-label="Search candidates"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="Clear search"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Sort */}
                  <div className="flex gap-2">
                    <Button
                      variant={sortBy === 'votes' ? 'default' : 'outline'}
                      onClick={() => setSortBy('votes')}
                      className="h-12"
                      aria-pressed={sortBy === 'votes'}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      By Votes
                    </Button>
                    <Button
                      variant={sortBy === 'code' ? 'default' : 'outline'}
                      onClick={() => setSortBy('code')}
                      className="h-12"
                      aria-pressed={sortBy === 'code'}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      By Code
                    </Button>
                  </div>
                </div>

                {/* Results count */}
                {searchQuery && (
                  <p className="mt-4 text-sm text-gray-600">
                    Found {filteredContenders.length} of {contenders.length} candidates
                  </p>
                )}
              </div>
            )}

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
            ) : filteredContenders.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No Results Found</h3>
                <p className="text-gray-600">Try adjusting your search query</p>
                <Button
                  onClick={() => setSearchQuery('')}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredContenders.map((contender) => (
                  <ContenderCard
                    key={contender.contenderAddress}
                    contenderAddress={contender.contenderAddress}
                    code={contender.code}
                    voteCount={contender.voteCount}
                    totalVotes={totalVotes}
                    onVote={handleVoteClick}
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

      {/* Vote Confirmation Dialog */}
      <VoteConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        onConfirm={handleConfirmVote}
        candidateCode={selectedContenderData?.code || ''}
        candidateAddress={selectedContender || '0x'}
        isPending={isPending}
      />

      <Footer />
    </div>
  )
}