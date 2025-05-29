"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Leaf, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const [formData, setFormData] = useState<{ username: string; password: string }>({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onLogin = async () => {
    if (!formData.username || !formData.password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await axios.post("/api/login", formData)
      router.push("/dashboard")
    } catch (error: any) {
      console.log("Login failed", error.response?.data?.error || "Erro ao fazer login")
      setError(error.response?.data?.error || "Credenciais inválidas")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onLogin()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-green-100 p-3">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-black">HortUM</CardTitle>
          <CardDescription className="text-black">Entre com suas credenciais para acessar o sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-lg font-semibold text-black">
              Nome de Utilizador:
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Digite seu nome de usuário"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="focus-visible:ring-green-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-lg font-semibold text-black">
                Palavra-passe:
              </label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="focus-visible:ring-green-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={onLogin} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
