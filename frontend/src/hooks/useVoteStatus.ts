'use client'

import { useAccount, useReadContract } from 'wagmi'
import { VOTING_CONTRACT_ADDRESS, VOTING_CONTRACT_ABI } from '@/contracts/VotingContract'

export function useVoteStatus() {
  const { address, isConnected } = useAccount()

  // Check if user has voted
  const { data: hasVoted, isLoading, refetch } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'voted',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address && isConnected)
    }
  })

  return {
    hasVoted: Boolean(hasVoted),
    isLoading,
    refetch,
    isConnected
  }
}