'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { VOTING_CONTRACT_ADDRESS, VOTING_CONTRACT_ABI } from '@/contracts/VotingContract'
import { UserPlus, Loader2, CheckCircle, XCircle } from 'lucide-react'
import type { Address } from 'viem'

interface RegisterContenderFormProps {
  onSuccess?: () => void
}

export function RegisterContenderForm({ onSuccess }: RegisterContenderFormProps) {
  const { address } = useAccount()
  const [contenderAddress, setContenderAddress] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const { data: hash, writeContract, isPending, reset } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!contenderAddress || !code) {
      setError('Please fill in all fields')
      return
    }

    // Basic address validation
    if (!contenderAddress.startsWith('0x') || contenderAddress.length !== 42) {
      setError('Invalid Ethereum address')
      return
    }

    if (code.trim().length === 0) {
      setError('Code cannot be empty')
      return
    }

    try {
      writeContract({
        address: VOTING_CONTRACT_ADDRESS,
        abi: VOTING_CONTRACT_ABI,
        functionName: 'registerContender',
        args: [contenderAddress as Address, code],
      })
    } catch (err: any) {
      setError(err.message || 'Failed to register candidate')
    }
  }

  // Reset form after success
  if (isSuccess && hash) {
    setTimeout(() => {
      setContenderAddress('')
      setCode('')
      reset()
      onSuccess?.()
    }, 2000)
  }

  return (
    <div className="p-8 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-primary to-purple-light">
          <UserPlus className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-purple-deep">Register New Candidate</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Candidate Address Input */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-purple-deep mb-2">
            Candidate Address
          </label>
          <input
            id="address"
            type="text"
            value={contenderAddress}
            onChange={(e) => setContenderAddress(e.target.value)}
            placeholder="0x..."
            disabled={isPending || isConfirming}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-primary focus:outline-none transition-colors font-mono text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
          <p className="mt-2 text-xs text-gray-500">
            The Ethereum address of the candidate
          </p>
        </div>

        {/* Code Input */}
        <div>
          <label htmlFor="code" className="block text-sm font-semibold text-purple-deep mb-2">
            Candidate Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., CANDIDATE_001"
            disabled={isPending || isConfirming}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-primary focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
          <p className="mt-2 text-xs text-gray-500">
            A unique identifier for the candidate (e.g., name or code)
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200">
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-green-50 border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-sm text-green-700">
              Candidate registered successfully! The list will update shortly.
            </p>
          </div>
        )}

        {/* Transaction Status */}
        {(isPending || isConfirming) && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-blue-50 border border-blue-200">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin flex-shrink-0" />
            <p className="text-sm text-blue-700">
              {isPending && 'Waiting for wallet confirmation...'}
              {isConfirming && 'Transaction confirming...'}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || isConfirming || !address}
          className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-primary to-purple-light) text-white font-bold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>Register Candidate</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}