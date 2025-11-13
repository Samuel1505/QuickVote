import { useReadContract } from 'wagmi'
import { VOTING_CONTRACT_ADDRESS, VOTING_CONTRACT_ABI } from '@/contracts/VotingContract'
import type { Address } from 'viem'

interface Contender {
  contenderAddress: Address
  code: string
  voteCount: bigint
  exists: boolean
}

export function useContenders() {
  const { 
    data: voteData, 
    isLoading, 
    refetch: refetchVotes 
  } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'getVoteCounts',
  })

  const contenders: Contender[] = []
  let totalVotes = BigInt(0)

  if (voteData) {
    // Safe destructuring into readonly intermediates
    const [readonlyAddresses, readonlyNumbers] = voteData;

    // Mutable copy of addresses
    const addresses: Address[] = [...readonlyAddresses];

    // Convert numbers to bigints (new readonly array)
    const voteCounts: readonly bigint[] = readonlyNumbers.map((n): bigint => BigInt(n));
    
    for (let i = 0; i < addresses.length; i++) {
      const voteCount = voteCounts[i]
      totalVotes += voteCount

      contenders.push({
        contenderAddress: addresses[i],
        code: '', // Will be loaded by individual components
        voteCount,
        exists: true,
      })
    }
  }

  const refetch = async () => {
    await refetchVotes()
  }

  return {
    contenders,
    totalVotes,
    isLoading,
    refetch,
  }
}

// Hook to get individual contender details
export function useContenderDetails(address: Address | undefined) {
  const { data, isLoading } = useReadContract({
    address: VOTING_CONTRACT_ADDRESS,
    abi: VOTING_CONTRACT_ABI,
    functionName: 'getContenderByAddress',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  if (!data || !address) {
    return { 
      contenderAddress: address || ('0x0' as Address),
      code: '', 
      voteCount: BigInt(0), 
      exists: false,
      isLoading,
    }
  }

  const { contender: contenderAddress, code, votersNo, exists} = data;

  return {
    contenderAddress,
    code,
    voteCount: BigInt(votersNo),
    exists,
    isLoading,
  }
}