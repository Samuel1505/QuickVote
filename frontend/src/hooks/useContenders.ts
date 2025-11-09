'use client'

import { useReadContract } from 'wagmi'
import { VOTING_CONTRACT_ADDRESS, VOTING_CONTRACT_ABI } from '@/contracts/VotingContract'
import type { Address } from 'viem'

export interface Contender {
  contenderAddress: Address
  code: string
  voteCount: bigint
}

export function useContenders() {
  // Get all contenders
  const { data: contenders, isLoading, refetch } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'getAllContenders',
  })

  // Get total vote count
  const { data: totalVotes } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'totalVotes',
  })

  return {
    contenders: (contenders as Contender[]) || [],
    totalVotes: totalVotes as bigint || BigInt(0),
    isLoading,
    refetch
  }
}