import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Settings } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            Dashboard DevLoop
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Plataforma completa para gerenciamento pessoal e empresarial com análise de tendências tecnológicas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Dashboard Empresarial</CardTitle>
              <CardDescription>
                Análise completa de vendas, finanças e métricas de negócio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/empresarial">
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Dashboard Pessoal</CardTitle>
              <CardDescription>
                Controle de despesas, metas e planejamento financeiro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/pessoal">
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Tendências Tech</CardTitle>
              <CardDescription>
                Análise de tendências tecnológicas com IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/tendencias">
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>
                Personalize suas preferências e configurações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/configuracoes">
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Recursos Principais
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Análise Avançada</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Gráficos interativos e relatórios detalhados para tomada de decisões
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Tendências em Tempo Real</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Acompanhe as últimas tendências tecnológicas com análise de IA
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Gestão Completa</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Controle total sobre suas finanças pessoais e empresariais
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 