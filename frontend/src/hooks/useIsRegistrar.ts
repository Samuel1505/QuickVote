'use client'

import { useAccount, useReadContract } from 'wagmi'
import { VOTING_CONTRACT_ADDRESS, VOTING_CONTRACT_ABI } from '@/contracts/VotingContract'
import { keccak256, toHex } from 'viem'

export function useIsRegistrar() {
  const { address, isConnected } = useAccount()
  
  // Compute REGISTRAR_ROLE hash client-side (standard OpenZeppelin pattern, avoids extra RPC call)
  const REGISTRAR_ROLE = keccak256(toHex('REGISTRAR_ROLE'))
  
  const { data: hasRegistrarRole, isLoading } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'hasRole',
    args: address ? [REGISTRAR_ROLE, address] : undefined,
    query: {
      enabled: Boolean(address && isConnected),
    },
  })

  return {
    isRegistrar: Boolean(hasRegistrarRole),
    isLoading,
    isConnected,
  }
}