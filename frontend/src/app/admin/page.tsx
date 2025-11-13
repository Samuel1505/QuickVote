'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WalletGuard } from '@/components/shared/WalletGuard'
import { RegisterContenderForm } from '@/components/admin/RegisterContenderForm'
import { AdminContenderItem } from '@/components/admin/AdminContenderItem'
import { useIsRegistrar } from '@/hooks/useIsRegistrar'
import { useContenders } from '@/hooks/useContenders'
import { Shield, Users, TrendingUp, AlertTriangle } from 'lucide-react'

export default function AdminPage() {
  const { isRegistrar, isLoading: loadingRegistrar } = useIsRegistrar()
  const { contenders, totalVotes, refetch } = useContenders()

  if (loadingRegistrar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-(--purple-bg) via-white to-(--purple-bg)">
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="inline-block w-16 h-16 border-4 border-(--purple-primary) border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!isRegistrar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-(--purple-bg) via-white to-(--purple-bg)">
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-red-500 to-orange-500">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
            <h2 className="heading-section text-(--purple-deep)">
              Access Denied
            </h2>
            <p className="text-lead text-gray-600">
              You don't have permission to access the admin panel. Only registrars can manage elections.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-(--purple-bg) via-white to-(--purple-bg)">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
              <Shield className="w-5 h-5 text-(--purple-primary)" />
              <span className="text-sm font-semibold text-(--purple-primary)">ADMIN PANEL</span>
            </div>
            <h1 className="heading-hero text-(--purple-deep) mb-4">
              Election Management
            </h1>
            <p className="text-lead text-gray-600 max-w-2xl mx-auto">
              Manage candidates and monitor election statistics.
            </p>
          </div>

          <WalletGuard message="Connect your wallet to access the admin panel">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-(--purple-primary) to-(--purple-light) text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-(--purple-bg) mb-2 text-sm font-semibold">Total Candidates</p>
                    <p className="text-5xl font-bold">{contenders.length}</p>
                  </div>
                  <Users className="w-16 h-16 text-white/30" />
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-(--purple-light) to-(--purple-lighter) text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-(--purple-bg) mb-2 text-sm font-semibold">Total Votes</p>
                    <p className="text-5xl font-bold">{totalVotes.toString()}</p>
                  </div>
                  <TrendingUp className="w-16 h-16 text-white/30" />
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-(--purple-lighter) to-(--purple-bg) text-(--purple-deep) shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-(--purple-deep)/70 mb-2 text-sm font-semibold">Avg. Votes</p>
                    <p className="text-5xl font-bold">
                      {contenders.length > 0 ? Math.round(Number(totalVotes) / contenders.length) : 0}
                    </p>
                  </div>
                  <Shield className="w-16 h-16 text-(--purple-deep)/30" />
                </div>
              </div>
            </div>

            {/* Register Candidate Form */}
            <div className="mb-12">
              <RegisterContenderForm onSuccess={refetch} />
            </div>

            {/* Current Candidates */}
            <div className="p-8 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-(--purple-deep) mb-6">Registered Candidates</h3>
              
              {contenders.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No candidates registered yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {contenders.map((contender, index) => (
                    <AdminContenderItem
                      key={contender.contenderAddress}
                      address={contender.contenderAddress}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </WalletGuard>
        </div>
      </main>

      <Footer />
    </div>
  )
}