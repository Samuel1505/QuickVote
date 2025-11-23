'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Vote, CheckCircle } from 'lucide-react'
import type { Address } from 'viem'

interface VoteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  candidateCode: string
  candidateAddress: Address
  isPending: boolean
}

export function VoteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  candidateCode,
  candidateAddress,
  isPending
}: VoteConfirmDialogProps) {
  const formatAddress = (addr: Address) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-(--purple-primary) to-(--purple-light) flex items-center justify-center mb-4">
            <Vote className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-center text-2xl">Confirm Your Vote</DialogTitle>
          <DialogDescription className="text-center">
            You are about to cast your vote for the following candidate
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 rounded-xl bg-gradient-to-br from-(--purple-bg) to-white border-2 border-(--purple-primary)/20">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-(--purple-primary) to-(--purple-light)">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Candidate Code</p>
              <p className="text-2xl font-bold text-(--purple-deep)">{candidateCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Address</p>
              <p className="text-sm font-mono text-gray-700">{formatAddress(candidateAddress)}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">Important Notice</p>
            <p>Once you cast your vote, it cannot be changed. Please ensure you've selected the correct candidate.</p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isPending}
            className="w-full sm:w-auto bg-gradient-to-r from-(--purple-primary) to-(--purple-light) hover:from-(--purple-deep) hover:to-(--purple-primary)"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Confirming...
              </>
            ) : (
              <>
                <Vote className="w-4 h-4 mr-2" />
                Confirm Vote
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}