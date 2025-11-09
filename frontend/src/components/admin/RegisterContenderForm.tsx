'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react'
import { useVotingContract } from '@/hooks/useVotingContract'
import type { Address } from 'viem'

interface RegisterContenderFormProps {
  onSuccess?: () => void
}

export function RegisterContenderForm({ onSuccess }: RegisterContenderFormProps) {
  const [contenderAddress, setContenderAddress] = useState('')
  const [code, setCode] = useState('')
  const { registerContender, isPending, isConfirming, isSuccess, error } = useVotingContract()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (contenderAddress && code) {
      registerContender(contenderAddress as Address, code)
    }
  }

  // Reset form on success
  if (isSuccess && onSuccess) {
    setTimeout(() => {
      setContenderAddress('')
      setCode('')
      onSuccess()
    }, 2000)
  }

  return (
    <div className="p-8 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-(--purple-primary) to-(--purple-light) flex items-center justify-center">
          <UserPlus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-(--purple-deep)">Register New Candidate</h3>
          <p className="text-sm text-gray-600">Add a new candidate to the election</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Candidate Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Candidate Wallet Address
          </label>
          <Input
            type="text"
            placeholder="0x..."
            value={contenderAddress}
            onChange={(e) => setContenderAddress(e.target.value)}
            className="w-full font-mono"
            required
          />
          <p className="mt-1 text-xs text-gray-500">Enter the Ethereum wallet address of the candidate</p>
        </div>

        {/* Candidate Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Candidate Code/Name
          </label>
          <Input
            type="text"
            placeholder="e.g., CANDIDATE-001"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full"
            required
          />
          <p className="mt-1 text-xs text-gray-500">A unique identifier for the candidate</p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm font-medium text-green-800">
                Candidate registered successfully!
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Registration failed</p>
                <p className="text-xs text-red-600 mt-1">{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending || isConfirming || !contenderAddress || !code}
          className="w-full bg-gradient-to-r from-(--purple-primary) to-(--purple-light) hover:from-(--purple-deep) hover:to-(--purple-primary) text-white"
        >
          {isPending || isConfirming ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              {isConfirming ? 'Confirming...' : 'Processing...'}
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Register Candidate
            </>
          )}
        </Button>
      </form>
    </div>
  )
}