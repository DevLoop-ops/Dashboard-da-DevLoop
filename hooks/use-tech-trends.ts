import { useState, useEffect, useCallback } from "react"

export interface TrendingTopic {
  name: string
  trend?: number
}

export interface TechNews {
  id: string
  title: string
  description: string
  url: string
  publishedAt: string
  source: string
}

export interface Prediction {
  topic: string
  prediction: string
  confidence: number
}

export interface AIInsight {
  summary: string
  predictions: Prediction[]
  emergingTrends: string[]
}

export function useTechTrends() {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([])
  const [techNews, setTechNews] = useState<TechNews[]>([])
  const [aiInsights, setAiInsights] = useState<AIInsight | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [needsApiKey, setNeedsApiKey] = useState(false)

  const mockTrendingTopics: TrendingTopic[] = [
    { name: "Inteligência Artificial", trend: 15 },
    { name: "Machine Learning", trend: 12 },
    { name: "Blockchain", trend: 8 },
    { name: "Cloud Computing", trend: 10 },
    { name: "Cybersecurity", trend: 6 },
    { name: "IoT", trend: 4 },
    { name: "5G", trend: 3 },
    { name: "Edge Computing", trend: 5 }
  ]

  const mockTechNews: TechNews[] = [
    {
      id: "1",
      title: "OpenAI lança GPT-5 com capacidades revolucionárias",
      description: "A nova versão do modelo de linguagem traz melhorias significativas em compreensão e geração de texto.",
      url: "#",
      publishedAt: "2024-01-15T10:00:00Z",
      source: "TechCrunch"
    },
    {
      id: "2",
      title: "Google anuncia avanços em computação quântica",
      description: "Pesquisadores da Google alcançaram novo marco na supremacia quântica.",
      url: "#",
      publishedAt: "2024-01-14T15:30:00Z",
      source: "Wired"
    },
    {
      id: "3",
      title: "Microsoft investe $10 bilhões em IA",
      description: "A empresa planeja expandir suas capacidades de inteligência artificial nos próximos anos.",
      url: "#",
      publishedAt: "2024-01-13T09:15:00Z",
      source: "The Verge"
    },
    {
      id: "4",
      title: "Apple revela novos chips para Mac",
      description: "Os novos processadores M3 prometem performance excepcional para desenvolvedores.",
      url: "#",
      publishedAt: "2024-01-12T14:20:00Z",
      source: "Ars Technica"
    },
    {
      id: "5",
      title: "Meta anuncia avanços em realidade virtual",
      description: "Nova tecnologia de VR promete revolucionar a forma como interagimos com o mundo digital.",
      url: "#",
      publishedAt: "2024-01-11T11:45:00Z",
      source: "Engadget"
    }
  ]

  const mockAIInsights: AIInsight = {
    summary: "A inteligência artificial continua sendo o tópico dominante no setor de tecnologia, com avanços significativos em modelos de linguagem e aplicações práticas. O mercado está se movendo rapidamente em direção à automação e personalização baseada em IA.",
    predictions: [
      {
        topic: "Inteligência Artificial",
        prediction: "IA generativa se tornará mainstream em aplicações empresariais",
        confidence: 0.85
      },
      {
        topic: "Machine Learning",
        prediction: "AutoML democratizará o desenvolvimento de modelos ML",
        confidence: 0.78
      },
      {
        topic: "Blockchain",
        prediction: "Adoção crescente em setores financeiros tradicionais",
        confidence: 0.65
      }
    ],
    emergingTrends: [
      "IA multimodal (texto, imagem, áudio)",
      "Computação sustentável e verde",
      "Edge AI e processamento local",
      "IA explicável e responsável",
      "Automação inteligente de processos"
    ]
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setTrendingTopics(mockTrendingTopics)
      setTechNews(mockTechNews)
      setAiInsights(mockAIInsights)
      setNeedsApiKey(false)
    } catch (err) {
      setError("Erro ao carregar dados de tendências")
      console.error("Erro ao buscar dados:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refreshData = useCallback(() => {
    fetchData()
  }, [fetchData])

  const saveApiKey = useCallback((apiKey: string) => {
    // Em uma implementação real, aqui você salvaria a chave da API
    console.log("API Key salva:", apiKey)
    setNeedsApiKey(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    trendingTopics,
    techNews,
    aiInsights,
    isLoading,
    error,
    refreshData,
    needsApiKey,
    saveApiKey
  }
} 