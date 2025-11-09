'use client'

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts'
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
          fill="hsl(var(--purple-primary))" 
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  )
}