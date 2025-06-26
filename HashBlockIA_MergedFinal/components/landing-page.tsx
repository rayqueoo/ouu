"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Shield, Zap, TrendingUp, Users, Globe, ChevronRight, Star, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const [miningStats, setMiningStats] = useState({
    totalMiners: 12847,
    totalMined: 1250000,
    blocksResolved: 8945,
    activeNow: 3421
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMiningStats(prev => ({
        totalMiners: prev.totalMiners + Math.floor(Math.random() * 3),
        totalMined: prev.totalMined + Math.floor(Math.random() * 100),
        blocksResolved: prev.blocksResolved + (Math.random() > 0.95 ? 1 : 0),
        activeNow: prev.activeNow + Math.floor(Math.random() * 5) - 2
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "para sempre",
      features: [
        "Mineração básica",
        "Limite de saque: R$ 50/mês",
        "Suporte por email",
        "1 dispositivo"
      ],
      popular: false
    },
    {
      name: "Mensal",
      price: "R$ 89",
      period: "/mês",
      features: [
        "Mineração acelerada 3x",
        "Limite de saque: R$ 500/mês",
        "Suporte prioritário",
        "5 dispositivos",
        "IA otimizada"
      ],
      popular: true
    },
    {
      name: "Trimestral",
      price: "R$ 239",
      period: "/3 meses",
      features: [
        "Mineração acelerada 5x",
        "Limite de saque: R$ 1.500/mês",
        "Suporte VIP 24/7",
        "Dispositivos ilimitados",
        "IA premium + análises"
      ],
      popular: false
    },
    {
      name: "Anual",
      price: "R$ 799",
      period: "/ano",
      features: [
        "Mineração acelerada 10x",
        "Saques ilimitados",
        "Gerente dedicado",
        "Todos os recursos",
        "Beta features"
      ],
      popular: false
    }
  ]

  console.log("Landing page rendered with stats:", miningStats)

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-hashblock-gold/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">#</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Hash Block.IA</h1>
              <p className="text-xs text-hashblock-text-muted">Crypto Mining Platform</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link">Recursos</a>
            <a href="#plans" className="nav-link">Planos</a>
            <a href="#stats" className="nav-link">Estatísticas</a>
            <Link href="/login">
              <Button variant="outline" className="border-hashblock-gold text-hashblock-gold hover:bg-hashblock-gold hover:text-black">
                Entrar
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-hashblock-gold/20 text-hashblock-gold border-hashblock-gold/30">
            🚀 IA Revolucionária
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-hashblock-gold bg-clip-text text-transparent">
            Mineração Inteligente
            <br />com IA Avançada
          </h1>
          
          <p className="text-xl text-hashblock-text-muted mb-8 max-w-3xl mx-auto">
            Nossa IA analisa seu hardware e escolhe automaticamente a criptomoeda mais lucrativa. 
            Transforme seu dispositivo em uma máquina de gerar renda passiva.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/register">
              <Button size="lg" className="gold-button w-full sm:w-auto">
                <Play className="mr-2 h-5 w-5" />
                Começar Agora Grátis
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
              Ver Demonstração
            </Button>
          </div>

          {/* Real-time Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-hashblock-gold">{miningStats.totalMiners.toLocaleString()}</div>
              <div className="text-sm text-hashblock-text-muted">Mineradores Ativos</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-hashblock-gold">R$ {(miningStats.totalMined).toLocaleString()}</div>
              <div className="text-sm text-hashblock-text-muted">Total Minerado</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-hashblock-gold">{miningStats.blocksResolved.toLocaleString()}</div>
              <div className="text-sm text-hashblock-text-muted">Blocos Resolvidos</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-bold text-hashblock-gold animate-pulse-gold">{miningStats.activeNow.toLocaleString()}</div>
              <div className="text-sm text-hashblock-text-muted">Minerando Agora</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Por que escolher Hash Block.IA?
            </h2>
            <p className="text-hashblock-text-muted text-lg max-w-2xl mx-auto">
              Tecnologia de ponta com IA que maximiza seus lucros automaticamente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="mining-card group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-mining-pulse">
                  <Zap className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-white text-center">IA Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Nossa IA detecta seu hardware e seleciona automaticamente a criptomoeda mais lucrativa para seu perfil específico.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="mining-card group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-mining-pulse">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-white text-center">100% Seguro</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Mineração segura com pagamentos via Mercado Pago e NOWPayments. Seus ganhos protegidos e garantidos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="mining-card group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-mining-pulse">
                  <TrendingUp className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-white text-center">Renda Passiva</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Transforme qualquer dispositivo em uma fonte de renda. Mine enquanto trabalha, estuda ou descansa.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Escolha seu plano
            </h2>
            <p className="text-hashblock-text-muted text-lg">
              Comece grátis e evolua conforme seus ganhos crescem
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`mining-card relative ${plan.popular ? 'border-hashblock-gold ring-2 ring-hashblock-gold/50' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-hashblock-gold text-black font-semibold">
                      <Star className="h-3 w-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-white">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-hashblock-gold">
                    {plan.price}
                    <span className="text-sm text-hashblock-text-muted">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-hashblock-gold mr-2 flex-shrink-0" />
                        <span className="text-hashblock-text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/register" className="block">
                    <Button className={`w-full ${plan.popular ? 'gold-button' : 'bg-hashblock-dark border border-hashblock-gold/30 text-hashblock-gold hover:bg-hashblock-gold hover:text-black'}`}>
                      {plan.name === 'Gratuito' ? 'Começar Grátis' : 'Assinar Plano'}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="mining-card max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Pronto para começar a minerar?
              </h2>
              <p className="text-hashblock-text-muted text-lg mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de mineradores que já estão gerando renda passiva com nossa plataforma IA.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="gold-button">
                    <Play className="mr-2 h-5 w-5" />
                    Começar Mineração Gratuita
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="border-hashblock-gold text-hashblock-gold hover:bg-hashblock-gold hover:text-black">
                    Já tenho conta
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hashblock-gold/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">#</span>
                </div>
                <span className="text-white font-bold">Hash Block.IA</span>
              </div>
              <p className="text-hashblock-text-muted text-sm">
                Plataforma de mineração inteligente com IA avançada para maximizar seus lucros.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-hashblock-text-muted hover:text-hashblock-gold">Recursos</a></li>
                <li><a href="#" className="text-hashblock-text-muted hover:text-hashblock-gold">Planos</a></li>
                <li><a href="#" className="text-hashblock-text-muted hover:text-hashblock-gold">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-hashblock-text-muted hover:text-hashblock-gold">Central de Ajuda</a></li>
                <li><a href="#" className="text-hashblock-text-muted hover:text-hashblock-gold">Contato</a></li>
                <li><a href="#" className="text-hashblock-text-muted hover:text-hashblock-gold">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-hashblock-text-muted hover:text-hashblock-gold">Privacidade</a></li>
                <li><a href="#" className="text-hashblock-text-muted hover:text-hashblock-gold">Termos</a></li>
                <li><a href="#" className="text-hashblock-text-muted hover:text-hashblock-gold">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-hashblock-gold/20 mt-8 pt-8 text-center">
            <p className="text-hashblock-text-muted text-sm">
              © 2024 Hash Block.IA. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}