"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import type { AIInsight } from "@/hooks/use-tech-trends"
import { Lightbulb, TrendingUp as Trending, BrainCircuit } from "lucide-react"
import { motion } from "framer-motion"

interface AITrendAnalysisProps {
  insights: AIInsight | null
}

export function AITrendAnalysis({ insights }: AITrendAnalysisProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  if (!insights) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Nenhuma análise de IA disponível no momento.</p>
      </div>
    )
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleToggle = (value: string) => {
    setExpandedItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BrainCircuit className="h-5 w-5 text-indigo-600" />
              Resumo de Tendências IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">{insights.summary}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trending className="h-5 w-5 text-blue-600" />
              Previsões para Principais Tópicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" value={expandedItems} className="w-full">
              {insights.predictions.map((prediction, index) => (
                <AccordionItem key={index} value={`prediction-${index}`} className="border-b last:border-0">
                  <AccordionTrigger
                    onClick={() => handleToggle(`prediction-${index}`)}
                    className="py-4 hover:no-underline"
                  >
                    <div className="flex items-center gap-2 text-left">
                      <span className="font-medium">{prediction.topic}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "ml-2",
                          prediction.confidence >= 0.8
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : prediction.confidence >= 0.6
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                        )}
                      >
                        Confiança: {(prediction.confidence * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2 px-4">
                    <p className="text-muted-foreground">{prediction.prediction}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Tendências Emergentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.emergingTrends.map((trend, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-900 dark:bg-amber-900/20 dark:text-amber-400">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-base">{trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

// Helper function to conditionally join class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

