"use client"
import * as React from "react"
import { Card } from "@/components/ui/card"
import type { TrendingTopic } from "@/hooks/use-tech-trends"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088fe",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#a4de6c",
  "#d0ed57",
]

interface TrendVisualizationProps {
  trendingTopics: TrendingTopic[]
  className?: string
}

export function TrendVisualization({ trendingTopics, className }: TrendVisualizationProps) {
  const barData = trendingTopics.map((topic, index) => ({
    name: topic.name,
    trend: topic.trend || 0,
    fill: COLORS[index % COLORS.length]
  }))

  const pieData = trendingTopics.slice(0, 5).map((topic, index) => ({
    name: topic.name,
    value: topic.trend || 0,
    fill: COLORS[index % COLORS.length]
  }))

  const lineData = trendingTopics.slice(0, 6).map((topic, index) => ({
    name: topic.name,
    trend: topic.trend || 0,
    month: `M${index + 1}`
  }))

  return (
    <Card className={cn("p-4 h-full overflow-hidden", className)}>
      <Tabs defaultValue="bar" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Visualização de Tendências</h3>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bar">Barras</TabsTrigger>
            <TabsTrigger value="pie">Pizza</TabsTrigger>
            <TabsTrigger value="line">Linha</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="bar" className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="trend" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="pie" className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="line" className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="trend" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

