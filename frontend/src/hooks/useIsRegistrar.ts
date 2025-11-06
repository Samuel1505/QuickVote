'use client'

import { useAccount, useReadContract } from 'wagmi'
import { VOTING_CONTRACT_ADDRESS, VOTING_CONTRACT_ABI } from '@/contracts/VotingContract'

export function useIsRegistrar() {
  const { address, isConnected } = useAccount()

  // First, get the REGISTRAR_ROLE hash
  const { data: registrarRole } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'REGISTRAR_ROLE',
  })

  // Then check if the connected address has the registrar role
  const { data: hasRegistrarRole, isLoading } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'hasRole',
    args: registrarRole && address ? [registrarRole, address] : undefined,
    query: {
      enabled: Boolean(registrarRole && address && isConnected)
    }
  })

  return {
    isRegistrar: Boolean(hasRegistrarRole),
    isLoading,
    isConnected
  }
}