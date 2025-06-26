"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Chrome } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    console.log("Login attempt:", { email: formData.email })

    try {
      // Mock login logic - replace with real API call
      if (formData.email === 'rayque542@gmail.com' && formData.password === 'Milionario8') {
        console.log("Admin login successful")
        // Store admin status
        localStorage.setItem('userType', 'admin')
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          name: 'Administrador',
          isAdmin: true
        }))
        router.push('/dashboard')
      } else if (formData.email && formData.password) {
        console.log("User login successful")
        // Store user status
        localStorage.setItem('userType', 'user')
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          name: 'Usuário',
          isAdmin: false
        }))
        router.push('/dashboard')
      } else {
        setError('Email e senha são obrigatórios')
      }
      
      /*
      // Real API call would be:
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/dashboard')
      } else {
        setError(data.message || 'Erro ao fazer login')
      }
      */
    } catch (err) {
      console.error('Login error:', err)
      setError('Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log("Google login initiated")
    // Mock Google login
    localStorage.setItem('userType', 'user')
    localStorage.setItem('user', JSON.stringify({
      email: 'user@gmail.com',
      name: 'Usuário Google',
      isAdmin: false
    }))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-hashblock-gold hover:text-hashblock-gold-muted transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Link>
          
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-2xl">#</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta</h1>
          <p className="text-hashblock-text-muted">Entre na sua conta Hash Block.IA</p>
        </div>

        <Card className="mining-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white text-center">Fazer Login</CardTitle>
            <CardDescription className="text-center">
              Entre com email e senha ou Google
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
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
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10 bg-hashblock-dark border-hashblock-gold/20 text-white placeholder:text-hashblock-text-muted focus:border-hashblock-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-hashblock-text-muted" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="pl-10 pr-10 bg-hashblock-dark border-hashblock-gold/20 text-white placeholder:text-hashblock-text-muted focus:border-hashblock-gold"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-hashblock-text-muted hover:text-hashblock-gold"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-hashblock-gold hover:text-hashblock-gold-muted transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="gold-button w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-hashblock-gold/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-hashblock-dark px-2 text-hashblock-text-muted">ou continue com</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-hashblock-gold/30 text-white hover:bg-hashblock-gold hover:text-black"
              onClick={handleGoogleLogin}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>

            <div className="text-center">
              <span className="text-hashblock-text-muted text-sm">
                Não tem uma conta?{' '}
                <Link href="/register" className="text-hashblock-gold hover:text-hashblock-gold-muted transition-colors">
                  Criar conta
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-hashblock-text-muted">
            Ao fazer login, você concorda com nossos{' '}
            <a href="#" className="text-hashblock-gold hover:underline">Termos de Uso</a>
            {' '}e{' '}
            <a href="#" className="text-hashblock-gold hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  )
}