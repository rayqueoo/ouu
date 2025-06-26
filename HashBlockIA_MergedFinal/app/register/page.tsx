"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Chrome, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    console.log("Registration attempt:", { name: formData.name, email: formData.email })

    // Validation
    if (!acceptTerms) {
      setError('Você deve aceitar os termos de uso')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setIsLoading(false)
      return
    }

    try {
      // Mock registration logic - replace with real API call
      console.log("User registration successful")
      setSuccess(true)
      
      // Auto-login after registration
      setTimeout(() => {
        localStorage.setItem('userType', 'user')
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          name: formData.name,
          isAdmin: false
        }))
        router.push('/dashboard')
      }, 2000)
      
      /*
      // Real API call would be:
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setError(data.message || 'Erro ao criar conta')
      }
      */
    } catch (err) {
      console.error('Registration error:', err)
      setError('Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = () => {
    console.log("Google registration initiated")
    localStorage.setItem('userType', 'user')
    localStorage.setItem('user', JSON.stringify({
      email: 'user@gmail.com',
      name: 'Usuário Google',
      isAdmin: false
    }))
    router.push('/dashboard')
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
        <Card className="mining-card w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Conta criada com sucesso!</h2>
            <p className="text-hashblock-text-muted mb-4">
              Bem-vindo à Hash Block.IA! Redirecionando para o dashboard...
            </p>
            <div className="animate-pulse text-hashblock-gold">Carregando...</div>
          </CardContent>
        </Card>
      </div>
    )
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
          
          <h1 className="text-2xl font-bold text-white mb-2">Criar sua conta</h1>
          <p className="text-hashblock-text-muted">Comece a minerar gratuitamente hoje</p>
        </div>

        <Card className="mining-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white text-center">Cadastro Gratuito</CardTitle>
            <CardDescription className="text-center">
              Preencha os dados para criar sua conta
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
                <Label htmlFor="name" className="text-white">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-hashblock-text-muted" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="pl-10 bg-hashblock-dark border-hashblock-gold/20 text-white placeholder:text-hashblock-text-muted focus:border-hashblock-gold"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Mínimo 6 caracteres"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirmar senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-hashblock-text-muted" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Digite novamente sua senha"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="pl-10 pr-10 bg-hashblock-dark border-hashblock-gold/20 text-white placeholder:text-hashblock-text-muted focus:border-hashblock-gold"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-hashblock-text-muted hover:text-hashblock-gold"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={setAcceptTerms}
                  className="border-hashblock-gold/30 data-[state=checked]:bg-hashblock-gold data-[state=checked]:text-black"
                />
                <Label htmlFor="terms" className="text-sm text-hashblock-text-muted">
                  Aceito os{' '}
                  <a href="#" className="text-hashblock-gold hover:underline">Termos de Uso</a>
                  {' '}e{' '}
                  <a href="#" className="text-hashblock-gold hover:underline">Política de Privacidade</a>
                </Label>
              </div>

              <Button 
                type="submit" 
                className="gold-button w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Criando conta...' : 'Criar conta gratuita'}
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
              onClick={handleGoogleRegister}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>

            <div className="text-center">
              <span className="text-hashblock-text-muted text-sm">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-hashblock-gold hover:text-hashblock-gold-muted transition-colors">
                  Fazer login
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-hashblock-text-muted">
            Seus dados estão protegidos com criptografia de ponta
          </p>
        </div>
      </div>
    </div>
  )
}