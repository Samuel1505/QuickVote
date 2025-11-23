'use client'

import { User, Vote as VoteIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Address } from 'viem'

interface ContenderCardProps {
  contenderAddress: Address
  code: string
  voteCount: bigint
  totalVotes: bigint
  onVote: (address: Address) => void
  hasVoted: boolean
  isPending: boolean
  isConnected: boolean
}

export function ContenderCard({
  contenderAddress,
  code,
  voteCount,
  totalVotes,
  onVote,
  hasVoted,
  isPending,
  isConnected
}: ContenderCardProps) {
  const percentage = totalVotes > 0 
    ? Number((voteCount * BigInt(100)) / totalVotes) 
    : 0

  const formatAddress = (addr: Address) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const isDisabled = hasVoted || isPending || !isConnected

  return (
    <div 
      className="group relative p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-(--purple-primary)/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      role="article"
      aria-label={`Candidate ${code}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-(--purple-primary) to-(--purple-light) flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-(--purple-deep) text-xl mb-1">{code}</h3>
            <p className="text-xs text-gray-500 font-mono">{formatAddress(contenderAddress)}</p>
          </div>
        </div>
      </div>

      {/* Vote Count */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Vote Count</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-(--purple-primary) block">
              {voteCount.toString()}
            </span>
            <span className="text-sm text-gray-500">
              {percentage.toFixed(1)}%
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-(--purple-primary) via-(--purple-light) to-(--purple-primary) transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Vote percentage: ${percentage}%`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      {/* Vote Button */}
      <Button
        onClick={() => onVote(contenderAddress)}
        disabled={isDisabled}
        className="w-full h-12 bg-gradient-to-r from-(--purple-primary) to-(--purple-light) hover:from-(--purple-deep) hover:to-(--purple-primary) text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-xl"
        aria-label={`Vote for ${code}`}
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        ) : hasVoted ? (
          <div className="flex items-center gap-2">
            <VoteIcon className="w-4 h-4" />
            Already Voted
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <VoteIcon className="w-5 h-5" />
            Vote for {code}
          </div>
        )}
      </Button>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-(--purple-light)/10 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-(--purple-primary)/5 to-transparent rounded-tr-full -z-10 group-hover:scale-110 transition-transform duration-300" />
    </div>
  )
}