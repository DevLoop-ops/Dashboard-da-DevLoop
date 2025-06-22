"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, LineChart, Newspaper, Zap, TrendingUp as Trending, AlertCircle } from "lucide-react"
import { TechNewsCard } from "@/components/dashboard/tech-news-card"
import { TrendVisualization } from "@/components/dashboard/trend-visualization"
import { AITrendAnalysis } from "@/components/dashboard/ai-trend-analysis"
import { ApiKeyRequest } from "@/components/dashboard/api-key-request"
import { useTechTrends } from "@/hooks/use-tech-trends"

export default function TendenciasPage() {
  const { trendingTopics, techNews, aiInsights, isLoading, error, refreshData, needsApiKey, saveApiKey } =
    useTechTrends()
  const [activeTab, setActiveTab] = useState("noticias")

  useEffect(() => {
    // Auto-refresh data every 30 minutes
    const intervalId = setInterval(
      () => {
        refreshData()
      },
      30 * 60 * 1000,
    )

    return () => clearInterval(intervalId)
  }, [refreshData])

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tendências Tech</h2>
          <p className="text-muted-foreground">Acompanhe as tendências e notícias mais recentes de tecnologia</p>
        </div>

        <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
          <CardContent className="flex items-center gap-4 pt-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <div>
              <h3 className="text-lg font-medium">Erro ao carregar dados</h3>
              <p className="text-sm text-muted-foreground">
                Não foi possível carregar as tendências tecnológicas. Por favor, tente novamente mais tarde.
              </p>
              <Button variant="outline" className="mt-2" onClick={refreshData}>
                Tentar novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tendências Tech</h2>
          <p className="text-muted-foreground">Acompanhe as tendências e notícias mais recentes de tecnologia</p>
        </div>
        <Button onClick={refreshData} className="w-full sm:w-auto" disabled={isLoading}>
          {isLoading ? "Atualizando..." : "Atualizar dados"}
        </Button>
      </div>

      {needsApiKey && activeTab === "analiseIA" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Configuração da API OpenAI</CardTitle>
            <CardDescription>
              Para utilizar os recursos de análise de IA, é necessário fornecer uma chave da API OpenAI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApiKeyRequest onApiKeySubmit={saveApiKey} />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-1/2 mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))
        ) : (
          <>
            <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Trending className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-sm font-medium">Tópicos em Alta</CardTitle>
                </div>
                <CardDescription>Assuntos mais discutidos em tecnologia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics?.map((topic, index) => (
                    <Badge
                      key={index}
                      variant={index < 3 ? "default" : "outline"}
                      className={index < 3 ? "bg-purple-500 hover:bg-purple-600" : ""}
                    >
                      {topic.name}
                      {topic.trend && (
                        <span className="ml-1 text-xs">{topic.trend > 0 ? `+${topic.trend}%` : `${topic.trend}%`}</span>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-sm font-medium">Atualizado</CardTitle>
                </div>
                <CardDescription>Última atualização dos dados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-blue-700 dark:text-blue-400">
                  {new Date().toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
                  Atualizações automáticas a cada 30 minutos
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-sm font-medium">Análise de IA</CardTitle>
                </div>
                <CardDescription>Insights baseados em IA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-700 dark:text-green-400 line-clamp-4">
                  {aiInsights?.summary ||
                    (needsApiKey ? "Chave da API OpenAI necessária para análise de IA" : "Carregando análise de IA...")}
                </div>
                {needsApiKey && (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs text-green-700 dark:text-green-400"
                    onClick={() => setActiveTab("analiseIA")}
                  >
                    Configurar API
                  </Button>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados de Tendências</CardTitle>
          <CardDescription>Explore notícias, visualizações e análises de tendências tecnológicas</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="noticias" value={activeTab} onValueChange={setActiveTab} className="p-4">
            <TabsList className="mb-4 bg-muted/50">
              <TabsTrigger
                value="noticias"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
              >
                <Newspaper className="h-4 w-4 mr-2" />
                Notícias
              </TabsTrigger>
              <TabsTrigger
                value="visualizacao"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
              >
                <LineChart className="h-4 w-4 mr-2" />
                Visualização
              </TabsTrigger>
              <TabsTrigger
                value="analiseIA"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Análise de IA
              </TabsTrigger>
            </TabsList>

            <TabsContent value="noticias" className="mt-0 border-t pt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading
                  ? Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="space-y-3">
                          <Skeleton className="h-[180px] w-full rounded-xl" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                          </div>
                        </div>
                      ))
                  : techNews?.map((news, index) => <TechNewsCard key={index} news={news} />)}
              </div>
            </TabsContent>

            <TabsContent value="visualizacao" className="mt-0 border-t pt-4">
              <div className="h-[500px]">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <Skeleton className="h-[90%] w-[95%] rounded-xl" />
                  </div>
                ) : (
                  <TrendVisualization data={trendingTopics || []} />
                )}
              </div>
            </TabsContent>

            <TabsContent value="analiseIA" className="mt-0 border-t pt-4">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-32 w-full" />
                </div>
              ) : needsApiKey ? (
                <div className="py-8">
                  <ApiKeyRequest onApiKeySubmit={saveApiKey} />
                </div>
              ) : (
                <AITrendAnalysis insights={aiInsights} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

