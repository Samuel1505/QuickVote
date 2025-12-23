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

  return (
    <div className="group relative p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-(--purple-primary)/30 transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-primary to-purple-light flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-purple-deep text-lg">{code}</h3>
            <p className="text-sm text-gray-500 font-mono">{formatAddress(contenderAddress)}</p>
          </div>
        </div>
      </div>

      {/* Vote Count */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Votes</span>
          <span className="text-lg font-bold text-purple-primary">
            {voteCount.toString()} ({percentage}%)
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-linear-to-r from-purple-primary to-purple-light transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Vote Button */}
      <Button
        onClick={() => onVote(contenderAddress)}
        disabled={hasVoted || isPending || !isConnected}
        className="w-full bg-gradient-to-r from-(--purple-primary) to-(--purple-light) hover:from-(--purple-deep) hover:to-(--purple-primary) text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          'Processing...'
        ) : hasVoted ? (
          'Already Voted'
        ) : (
          <>
            <VoteIcon className="w-4 h-4 mr-2" />
            Vote for {code}
          </>
        )}
      </Button>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-(--purple-light)/5 to-transparent rounded-bl-full -z-10" />
    </div>
  )
}