'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { VOTING_CONTRACT_ADDRESS, VOTING_CONTRACT_ABI } from '@/contracts/VotingContract'
import type { Address } from 'viem'

export function useVotingContract() {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Register a contender
  const registerContender = (contenderAddress: Address, code: string) => {
    writeContract({
      address: VOTING_CONTRACT_ADDRESS,
      abi: VOTING_CONTRACT_ABI,
      functionName: 'registerContender',
      args: [contenderAddress, code],
    })
  }

  // Cast a vote
  const vote = (contenderAddress: Address) => {
    writeContract({
      address: VOTING_CONTRACT_ADDRESS,
      abi: VOTING_CONTRACT_ABI,
      functionName: 'vote',
      args: [contenderAddress],
    })
  }

  return {
    address,
    isConnected,
    registerContender,
    vote,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash
  }
}