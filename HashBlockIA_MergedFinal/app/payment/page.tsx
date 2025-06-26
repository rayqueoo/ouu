"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  CheckCircle, 
  ArrowLeft,
  Copy,
  QrCode,
  Clock,
  AlertCircle,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes
  const router = useRouter()
  const searchParams = useSearchParams()

  const plans = {
    monthly: { name: 'Mensal', price: 89, period: '/mês' },
    quarterly: { name: 'Trimestral', price: 239, period: '/3 meses' },
    yearly: { name: 'Anual', price: 799, period: '/ano' }
  }

  useEffect(() => {
    const planId = searchParams.get('plan')
    if (planId && plans[planId as keyof typeof plans]) {
      setSelectedPlan({ id: planId, ...plans[planId as keyof typeof plans] })
    } else {
      router.push('/plans')
    }
  }, [searchParams, router])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    console.log("Processing payment for plan:", selectedPlan?.id, "method:", paymentMethod)

    try {
      if (paymentMethod === 'pix') {
        // Mock Mercado Pago PIX
        await new Promise(resolve => setTimeout(resolve, 2000))
        setPaymentData({
          type: 'pix',
          qrCode: 'https://via.placeholder.com/200x200?text=QR+CODE',
          pixKey: '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000',
          amount: selectedPlan?.price,
          id: 'HASHBLOCK_' + Date.now()
        })
      } else {
        // Mock NOWPayments Crypto
        await new Promise(resolve => setTimeout(resolve, 2000))
        setPaymentData({
          type: 'crypto',
          address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          amount: (selectedPlan?.price / 35000).toFixed(8), // Mock BTC rate
          currency: 'BTC',
          id: 'HASHBLOCK_CRYPTO_' + Date.now()
        })
      }

      // Simulate payment confirmation after 30 seconds
      setTimeout(() => {
        console.log("Payment confirmed, redirecting to dashboard")
        localStorage.setItem('userPlan', selectedPlan?.id)
        router.push('/dashboard?payment=success')
      }, 30000)

    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    console.log("Copied to clipboard:", text)
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="animate-pulse text-hashblock-gold text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-hashblock-gold/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/plans" className="flex items-center space-x-3">
            <ArrowLeft className="h-5 w-5 text-hashblock-gold" />
            <div>
              <h1 className="text-xl font-bold text-white">Finalizar Pagamento</h1>
              <p className="text-xs text-hashblock-text-muted">Plano {selectedPlan.name}</p>
            </div>
          </Link>
          
          <div className="text-right">
            <div className="text-hashblock-gold font-bold">R$ {selectedPlan.price}</div>
            <div className="text-xs text-hashblock-text-muted">{selectedPlan.period}</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {!paymentData ? (
              <Card className="mining-card">
                <CardHeader>
                  <CardTitle className="text-white">Escolha o método de pagamento</CardTitle>
                  <CardDescription>Selecione a forma mais conveniente para você</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2 bg-hashblock-dark">
                      <TabsTrigger value="pix" className="data-[state=active]:bg-hashblock-gold data-[state=active]:text-black">
                        <Smartphone className="h-4 w-4 mr-2" />
                        PIX
                      </TabsTrigger>
                      <TabsTrigger value="crypto" className="data-[state=active]:bg-hashblock-gold data-[state=active]:text-black">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Crypto
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="pix" className="space-y-4 mt-6">
                      <div className="flex items-center space-x-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Zap className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">PIX Instantâneo</h3>
                          <p className="text-hashblock-text-muted text-sm">Aprovação em segundos via Mercado Pago</p>
                        </div>
                      </div>
                      
                      <Alert className="border-hashblock-gold/30 bg-hashblock-gold/10">
                        <Shield className="h-4 w-4 text-hashblock-gold" />
                        <AlertDescription className="text-hashblock-gold">
                          Pagamento 100% seguro e criptografado
                        </AlertDescription>
                      </Alert>
                    </TabsContent>
                    
                    <TabsContent value="crypto" className="space-y-4 mt-6">
                      <div className="flex items-center space-x-4 p-4 bg-hashblock-gold/10 border border-hashblock-gold/20 rounded-lg">
                        <div className="w-12 h-12 bg-hashblock-gold/20 rounded-lg flex items-center justify-center">
                          <span className="text-hashblock-gold font-bold">₿</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">Bitcoin & Outras Cryptos</h3>
                          <p className="text-hashblock-text-muted text-sm">Pagamento via NOWPayments</p>
                        </div>
                      </div>
                      
                      <Alert className="border-blue-500/30 bg-blue-500/10">
                        <Shield className="h-4 w-4 text-blue-400" />
                        <AlertDescription className="text-blue-400">
                          Suporte a Bitcoin, Ethereum, USDT e mais de 50 criptomoedas
                        </AlertDescription>
                      </Alert>
                    </TabsContent>
                  </Tabs>
                  
                  <Button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="gold-button w-full mt-6"
                  >
                    {isProcessing ? 'Processando...' : `Pagar R$ ${selectedPlan.price}`}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              // Payment Instructions
              <Card className="mining-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">
                        {paymentData.type === 'pix' ? 'Pagamento PIX' : 'Pagamento Crypto'}
                      </CardTitle>
                      <CardDescription>
                        Finalize seu pagamento em até {formatTime(timeLeft)}
                      </CardDescription>
                    </div>
                    <Badge className="bg-orange-500/20 text-orange-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(timeLeft)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {paymentData.type === 'pix' ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                          <QrCode className="h-32 w-32 text-black" />
                        </div>
                        <p className="text-hashblock-text-muted text-sm">
                          Escaneie o QR Code com seu app do banco
                        </p>
                      </div>
                      
                      <div className="bg-hashblock-dark/50 p-4 rounded-lg">
                        <p className="text-white text-sm mb-2">Ou copie a chave PIX:</p>
                        <div className="flex items-center space-x-2">
                          <code className="bg-hashblock-black p-2 rounded text-hashblock-gold text-xs flex-1 break-all">
                            {paymentData.pixKey}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(paymentData.pixKey)}
                            className="border-hashblock-gold/30 text-hashblock-gold hover:bg-hashblock-gold hover:text-black"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-hashblock-dark/50 p-4 rounded-lg">
                        <p className="text-white text-sm mb-2">Envie exatamente:</p>
                        <div className="flex items-center space-x-2 mb-4">
                          <code className="bg-hashblock-black p-2 rounded text-hashblock-gold text-lg font-bold">
                            {paymentData.amount} {paymentData.currency}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(paymentData.amount)}
                            className="border-hashblock-gold/30 text-hashblock-gold hover:bg-hashblock-gold hover:text-black"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-white text-sm mb-2">Para este endereço:</p>
                        <div className="flex items-center space-x-2">
                          <code className="bg-hashblock-black p-2 rounded text-hashblock-gold text-xs flex-1 break-all">
                            {paymentData.address}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(paymentData.address)}
                            className="border-hashblock-gold/30 text-hashblock-gold hover:bg-hashblock-gold hover:text-black"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <Alert className="border-orange-500/30 bg-orange-500/10">
                        <AlertCircle className="h-4 w-4 text-orange-400" />
                        <AlertDescription className="text-orange-400">
                          Importante: Envie exatamente o valor indicado. Valores diferentes podem causar atraso na confirmação.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <p className="text-hashblock-text-muted text-sm">
                      Aguardando confirmação do pagamento...
                    </p>
                    <div className="animate-pulse text-hashblock-gold mt-2">
                      Verificando blockchain...
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="mining-card sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-hashblock-text-muted">Plano {selectedPlan.name}</span>
                  <span className="text-white font-semibold">R$ {selectedPlan.price}</span>
                </div>
                
                <div className="border-t border-hashblock-gold/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-hashblock-gold font-bold text-xl">R$ {selectedPlan.price}</span>
                  </div>
                </div>
                
                <div className="bg-hashblock-dark/50 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Benefícios inclusos:</h4>
                  <ul className="space-y-1 text-sm text-hashblock-text-muted">
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-hashblock-gold mr-2" />
                      Mineração acelerada
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-hashblock-gold mr-2" />
                      Suporte prioritário
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-hashblock-gold mr-2" />
                      IA otimizada
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-hashblock-gold mr-2" />
                      Relatórios detalhados
                    </li>
                  </ul>
                </div>
                
                <Alert className="border-green-500/30 bg-green-500/10">
                  <Shield className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-400">
                    Garantia de 7 dias. Não satisfeito? Reembolso total.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}