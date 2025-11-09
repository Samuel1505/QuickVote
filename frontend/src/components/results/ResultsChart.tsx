'use client'

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { Address } from 'viem'

interface ResultsChartProps {
  contenders: Array<{
    contenderAddress: Address
    code: string
    voteCount: bigint
  }>
}

export function ResultsChart({ contenders }: ResultsChartProps) {
  const chartData = contenders.map((contender) => ({
    name: contender.code,
    votes: Number(contender.voteCount),
  }))

  const chartConfig = {
    votes: {
      label: 'Votes',
      color: 'hsl(var(--purple-primary))',
    },
  }

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="name" 
          stroke="hsl(var(--foreground))"
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="hsl(var(--foreground))"
          fontSize={12}
          tickLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar 
          dataKey="votes" 
          fill="url(#colorGradient)" 
          radius={[8, 8, 0, 0]}
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--purple-primary))" />
            <stop offset="100%" stopColor="hsl(var(--purple-light))" />
          </linearGradient>
        </defs>
      </BarChart>
    </ChartContainer>
  )
}