'use client'

import { wagmiAdapter, projectId } from '../config/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { baseSepolia } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'QuickVote',
  description: 'Decentralized Voting Platform - Make voting accessible anytime, everywhere',
  url: 'https://quickvote.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal with purple theme
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [baseSepolia],
  defaultNetwork: baseSepolia,
  metadata: metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#591a97',
    '--w3m-accent': '#591a97',
    '--w3m-color-mix-strength': 40,
    '--w3m-border-radius-master': '8px'
  }
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider