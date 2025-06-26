"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  CheckCircle, 
  Star, 
  ChevronRight, 
  ArrowLeft, 
  Zap, 
  Shield, 
  Users, 
  Clock,
  CreditCard,
  Smartphone
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const plans = [
    {
      id: 'free',
      name: "Gratuito",
      price: 0,
      originalPrice: 0,
      period: "para sempre",
      description: "Ideal para começar",
      features: [
        "Mineração básica",
        "Limite de saque: R$ 50/mês",
        "Suporte por email",
        "1 dispositivo",
        "IA básica"
      ],
      limitations: [
        "Velocidade de mineração limitada",
        "Suporte com menor prioridade"
      ],
      popular: false,
      color: "border-hashblock-gold/20"
    },
    {
      id: 'monthly',
      name: "Mensal",
      price: 89,
      originalPrice: 120,
      period: "/mês",
      description: "Perfeito para teste",
      features: [
        "Mineração acelerada 3x",
        "Limite de saque: R$ 500/mês",
        "Suporte prioritário",
        "5 dispositivos",
        "IA otimizada",
        "Relatórios detalhados"
      ],
      limitations: [],
      popular: true,
      color: "border-hashblock-gold ring-2 ring-hashblock-gold/50"
    },
    {
      id: 'quarterly',
      name: "Trimestral",
      price: 239,
      originalPrice: 267,
      period: "/3 meses",
      description: "Economie 10%",
      features: [
        "Mineração acelerada 5x",
        "Limite de saque: R$ 1.500/mês",
        "Suporte VIP 24/7",
        "Dispositivos ilimitados",
        "IA premium + análises",
        "Configurações avançadas",
        "Priority pool access"
      ],
      limitations: [],
      popular: false,
      color: "border-hashblock-gold/30"
    },
    {
      id: 'yearly',
      name: "Anual",
      price: 799,
      originalPrice: 1068,
      period: "/ano",
      description: "Economie 25%",
      features: [
        "Mineração acelerada 10x",
        "Saques ilimitados",
        "Gerente dedicado",
        "Todos os recursos",
        "Beta features",
        "API access",
        "Custom mining pools",
        "Suporte telefônico"
      ],
      limitations: [],
      popular: false,
      color: "border-purple-400/50"
    }
  ]

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId)
    setIsLoading(true)

    console.log("Plan selected:", planId)

    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      console.log("User not logged in, redirecting to login")
      router.push('/login')
      return
    }

    // Mock payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (planId === 'free') {
        console.log("Free plan activated")
        router.push('/dashboard')
      } else {
        console.log("Redirecting to payment for plan:", planId)
        router.push(`/payment?plan=${planId}`)
      }
    } catch (error) {
      console.error("Plan selection error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-hashblock-gold/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">#</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Hash Block.IA</h1>
              <p className="text-xs text-hashblock-text-muted">Escolha seu plano</p>
            </div>
          </Link>
          
          <Link href="/" className="text-hashblock-gold hover:text-hashblock-gold-muted transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-hashblock-gold/20 text-hashblock-gold border-hashblock-gold/30">
            <Star className="h-3 w-3 mr-1" />
            Planos Especiais
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-hashblock-gold bg-clip-text text-transparent">
            Escolha o plano ideal
          </h1>
          
          <p className="text-xl text-hashblock-text-muted max-w-2xl mx-auto">
            Maximize seus ganhos com mineração inteligente. Todos os planos incluem IA avançada e suporte especializado.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {plans.map((plan) => (
            <Card key={plan.id} className={`mining-card relative ${plan.color} ${selectedPlan === plan.id ? 'scale-105' : ''} transition-all duration-300`}>
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
                <CardDescription className="text-hashblock-text-muted">{plan.description}</CardDescription>
                
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-hashblock-gold">
                    R$ {plan.price}
                    <span className="text-sm text-hashblock-text-muted">{plan.period}</span>
                  </div>
                  {plan.originalPrice > plan.price && (
                    <div className="text-sm text-hashblock-text-muted line-through">
                      R$ {plan.originalPrice}{plan.period}
                    </div>
                  )}
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
                
                {plan.limitations.length > 0 && (
                  <div className="border-t border-hashblock-gold/20 pt-3">
                    <p className="text-xs text-hashblock-text-muted mb-2">Limitações:</p>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="text-xs text-hashblock-text-muted opacity-70">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Button 
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isLoading && selectedPlan === plan.id}
                  className={`w-full ${plan.popular ? 'gold-button' : 'bg-hashblock-dark border border-hashblock-gold/30 text-hashblock-gold hover:bg-hashblock-gold hover:text-black'}`}
                >
                  {isLoading && selectedPlan === plan.id ? (
                    'Processando...'
                  ) : (
                    <>
                      {plan.price === 0 ? 'Começar Grátis' : 'Assinar Plano'}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="max-w-4xl mx-auto">
          <Card className="mining-card">
            <CardHeader className="text-center">
              <CardTitle className="text-white">Métodos de Pagamento</CardTitle>
              <CardDescription>Escolha a forma mais conveniente para você</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pix" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-hashblock-dark">
                  <TabsTrigger value="pix" className="data-[state=active]:bg-hashblock-gold data-[state=active]:text-black">
                    PIX (Mercado Pago)
                  </TabsTrigger>
                  <TabsTrigger value="crypto" className="data-[state=active]:bg-hashblock-gold data-[state=active]:text-black">
                    Criptomoedas
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="pix" className="space-y-4">
                  <div className="flex items-center justify-center space-x-4 py-6">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">PIX Instantâneo</h3>
                      <p className="text-hashblock-text-muted text-sm">Pagamento aprovado em segundos</p>
                    </div>
                  </div>
                  <Alert className="border-green-500/30 bg-green-500/10">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <AlertDescription className="text-green-400">
                      Pagamento 100% seguro via Mercado Pago. Ativação automática após confirmação.
                    </AlertDescription>
                  </Alert>
                </TabsContent>
                
                <TabsContent value="crypto" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-orange-400 font-bold">₿</span>
                      </div>
                      <p className="text-sm text-hashblock-text-muted">Bitcoin</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-400 font-bold">Ξ</span>
                      </div>
                      <p className="text-sm text-hashblock-text-muted">Ethereum</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-yellow-400 font-bold">₮</span>
                      </div>
                      <p className="text-sm text-hashblock-text-muted">USDT</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-purple-400 font-bold">+</span>
                      </div>
                      <p className="text-sm text-hashblock-text-muted">Outras</p>
                    </div>
                  </div>
                  <Alert className="border-hashblock-gold/30 bg-hashblock-gold/10">
                    <Shield className="h-4 w-4 text-hashblock-gold" />
                    <AlertDescription className="text-hashblock-gold">
                      Pagamentos em criptomoedas via NOWPayments. Suporte a mais de 50 moedas.
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Perguntas Frequentes</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="mining-card">
              <CardHeader>
                <CardTitle className="text-white text-lg">Posso mudar de plano?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-hashblock-text-muted text-sm">
                  Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                  Ajustamos o valor proporcionalmente.
                </p>
              </CardContent>
            </Card>

            <Card className="mining-card">
              <CardHeader>
                <CardTitle className="text-white text-lg">Como funciona o cancelamento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-hashblock-text-muted text-sm">
                  Você pode cancelar a qualquer momento sem taxas. Seu plano permanece ativo 
                  até o final do período pago.
                </p>
              </CardContent>
            </Card>

            <Card className="mining-card">
              <CardHeader>
                <CardTitle className="text-white text-lg">Garantia de reembolso?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-hashblock-text-muted text-sm">
                  Oferecemos garantia de 7 dias para todos os planos pagos. 
                  Se não ficar satisfeito, devolvemos 100% do valor.
                </p>
              </CardContent>
            </Card>

            <Card className="mining-card">
              <CardHeader>
                <CardTitle className="text-white text-lg">Suporte técnico incluído?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-hashblock-text-muted text-sm">
                  Todos os planos incluem suporte técnico. Planos pagos têm 
                  prioridade e atendimento mais rápido.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}