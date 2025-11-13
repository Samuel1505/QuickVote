'use client'

import { useReadContract } from 'wagmi'
import { VOTING_CONTRACT_ADDRESS, VOTING_CONTRACT_ABI } from '@/contracts/VotingContract'
import type { Address } from 'viem'

interface AdminContenderItemProps {
  address: Address
  index: number
}

export function AdminContenderItem({ address, index }: AdminContenderItemProps) {
  const { data } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'getContenderByAddress',
    args: [address],
  })

  if (!data) {
    return (
      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 animate-pulse">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
        <div className="w-16 h-8 bg-gray-200 rounded" />
      </div>
    )
  }

  // ✅ Fixed: Object destructuring (data is { contender, code, votersNo, exists })
  const { code, votersNo } = data;

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-(--purple-primary) to-(--purple-light) flex items-center justify-center">
          <span className="text-white font-bold text-sm">#{index + 1}</span>
        </div>
        <div>
          <p className="font-bold text-(--purple-deep)">{code}</p>
          <p className="text-xs text-gray-500 font-mono">{address}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-(--purple-primary)">{votersNo.toString()}</p>
        <p className="text-xs text-gray-600">votes</p>
      </div>
    </div>
  )
}