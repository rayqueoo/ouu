"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    console.log("Password reset requested for:", email)

    try {
      // Mock API call - replace with real implementation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSuccess(true)
      console.log("Password reset email sent successfully")
      
      /*
      // Real API call would be:
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setIsSuccess(true)
      } else {
        setError(data.message || 'Erro ao enviar email')
      }
      */
    } catch (err) {
      console.error('Forgot password error:', err)
      setError('Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/login" className="inline-flex items-center text-hashblock-gold hover:text-hashblock-gold-muted transition-colors mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao login
            </Link>
          </div>

          <Card className="mining-card">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Email enviado!</h2>
              <p className="text-hashblock-text-muted mb-6">
                Enviamos um link de recuperação para <strong className="text-hashblock-gold">{email}</strong>
              </p>
              
              <div className="space-y-4">
                <p className="text-sm text-hashblock-text-muted">
                  Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                </p>
                
                <div className="bg-hashblock-dark/50 border border-hashblock-gold/20 rounded-lg p-4">
                  <p className="text-xs text-hashblock-text-muted">
                    💡 <strong>Dica:</strong> Não encontrou o email? Verifique a pasta de spam ou lixo eletrônico.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => {
                      setIsSuccess(false)
                      setEmail('')
                    }}
                    variant="outline"
                    className="border-hashblock-gold/30 text-hashblock-gold hover:bg-hashblock-gold hover:text-black"
                  >
                    Enviar novamente
                  </Button>
                  
                  <Link href="/login" className="flex-1">
                    <Button className="gold-button w-full">
                      Ir para Login
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center text-hashblock-gold hover:text-hashblock-gold-muted transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao login
          </Link>
          
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-2xl">#</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Esqueceu sua senha?</h1>
          <p className="text-hashblock-text-muted">
            Digite seu email e enviaremos um link para redefinir sua senha
          </p>
        </div>

        <Card className="mining-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white text-center">Recuperar Senha</CardTitle>
            <CardDescription className="text-center">
              Insira o email associado à sua conta
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-hashblock-text-muted" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-hashblock-dark border-hashblock-gold/20 text-white placeholder:text-hashblock-text-muted focus:border-hashblock-gold"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="gold-button w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="bg-hashblock-dark/50 border border-hashblock-gold/20 rounded-lg p-4">
                <p className="text-xs text-hashblock-text-muted">
                  <strong>Lembrou da senha?</strong> Você pode fazer login normalmente.
                </p>
              </div>
              
              <div className="text-sm text-hashblock-text-muted">
                Não tem uma conta?{' '}
                <Link href="/register" className="text-hashblock-gold hover:text-hashblock-gold-muted transition-colors">
                  Criar conta gratuita
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-hashblock-text-muted">
            Por motivos de segurança, o link de recuperação expira em 24 horas
          </p>
        </div>
      </div>
    </div>
  )
}