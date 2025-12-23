'use client'

import { useReadContract } from 'wagmi'
import { VOTING_CONTRACT_ADDRESS, VOTING_CONTRACT_ABI } from '@/contracts/VotingContract'
import { Users, Award } from 'lucide-react'
import type { Address } from 'viem'

interface ContenderItemProps {
  address: Address
  index: number
  totalVotes: bigint
}

function ContenderItem({ address, index, totalVotes }: ContenderItemProps) {
  const { data } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'getContenderByAddress',
    args: [address],
  })

  if (!data) {
    return (
      <div className="group relative p-6 rounded-2xl bg-white border-2 border-gray-100 animate-pulse">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    )
  }

  // ✅ Fixed: Object destructuring (data is { contender, code, votersNo, exists })
  const { code, votersNo } = data;
  const voteCount = BigInt(votersNo)
  const percentage = totalVotes > 0 ? Number((voteCount * BigInt(100)) / totalVotes) : 0
  const isLeading = index === 0 && voteCount > 0

  const formatAddress = (addr: Address) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <div className="group relative p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-(--purple-primary)/30 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-6">
        {/* Rank Badge */}
        <div className={`shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${
          isLeading 
            ? 'bg-linear-to-br from-yellow-400 to-orange-500 text-white' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {isLeading ? <Award className="w-8 h-8" /> : `#${index + 1}`}
        </div>

        {/* Candidate Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-purple-deep">{code}</h3>
            {isLeading && (
              <span className="px-3 py-1 bg-linear-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                LEADING
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 font-mono mb-4">
            {formatAddress(address)}
          </p>

          {/* Vote Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Vote Count</span>
              <span className="font-bold text-purple-primary">
                {voteCount.toString()} votes ({percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  isLeading 
                    ? 'bg-linear-to-r from-yellow-400 to-orange-500' 
                    : 'bg-linear-to-r from-purple-primary to-purple-light'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-(--purple-light)/5 to-transparent rounded-bl-full -z-10" />
    </div>
  )
}

export function ContenderList() {
  const { data: voteData, isLoading, refetch } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'getVoteCounts',
  })

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block w-16 h-16 border-4 border-purple-primary border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">Loading candidates...</p>
      </div>
    )
  }

  if (!voteData) {
    return (
      <div className="text-center py-20">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-700 mb-2">No Candidates Yet</h3>
        <p className="text-gray-600">No candidates have been registered for this election.</p>
      </div>
    )
  }

  // ✅ Fixed: Safe destructuring + conversion (voteData is readonly [readonly Address[], readonly number[]])
  const [readonlyAddresses, readonlyNumbers] = voteData;
  const addresses: Address[] = [...readonlyAddresses];
  const voteCounts: readonly bigint[] = readonlyNumbers.map((n): bigint => BigInt(n));

  if (addresses.length === 0) {
    return (
      <div className="text-center py-20">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-700 mb-2">No Candidates Yet</h3>
        <p className="text-gray-600">No candidates have been registered for this election.</p>
      </div>
    )
  }

  // Calculate total votes
  let totalVotes = BigInt(0)
  for (const count of voteCounts) {
    totalVotes += count
  }

  // Sort by vote count (✅ Fixed: Safe bigint comparison, no Number() loss)
  const sortedIndices = addresses
    .map((addr, idx) => ({ addr, idx, votes: voteCounts[idx] }))
    .sort((a, b) => (b.votes > a.votes ? 1 : b.votes < a.votes ? -1 : 0))

  return (
    <div className="space-y-4">
      {sortedIndices.map((item, displayIndex) => (
        <ContenderItem
          key={item.addr}
          address={item.addr}
          index={displayIndex}
          totalVotes={totalVotes}
        />
      ))}
    </div>
  )
}