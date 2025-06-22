import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Key } from "lucide-react"

interface ApiKeyRequestProps {
  onApiKeySubmit: (apiKey: string) => void
}

export function ApiKeyRequest({ onApiKeySubmit }: ApiKeyRequestProps) {
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!apiKey.trim()) return

    setIsSubmitting(true)
    try {
      onApiKeySubmit(apiKey.trim())
    } catch (error) {
      console.error("Erro ao salvar API key:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="api-key" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          Chave da API OpenAI
        </Label>
        <div className="relative">
          <Input
            id="api-key"
            type={showKey ? "text" : "password"}
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>
          Para obter sua chave da API OpenAI:
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Acesse <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com/api-keys</a></li>
          <li>Faça login na sua conta OpenAI</li>
          <li>Clique em "Create new secret key"</li>
          <li>Copie a chave gerada e cole aqui</li>
        </ol>
      </div>

      <Button type="submit" disabled={!apiKey.trim() || isSubmitting} className="w-full">
        {isSubmitting ? "Salvando..." : "Salvar Chave da API"}
      </Button>
    </form>
  )
} 