"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Play, 
  Pause, 
  TrendingUp, 
  Cpu, 
  Smartphone, 
  Monitor,
  Zap,
  Wallet,
  Users,
  Settings,
  LogOut,
  Crown,
  Shield,
  BarChart3,
  Clock,
  DollarSign,
  Activity,
  AlertTriangle
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMining, setIsMining] = useState(false)
  const [miningData, setMiningData] = useState({
    hashRate: 0,
    balance: 0,
    todayEarnings: 0,
    totalEarnings: 0,
    deviceType: 'CPU',
    currentCoin: 'Monero (XMR)',
    aiRecommendation: 'Otimizado para seu hardware'
  })
  const [adminStats, setAdminStats] = useState({
    totalMiners: 12847,
    activeMiners: 3421,
    totalMined: 1250000,
    blocksResolved: 8945,
    pendingWithdrawals: 89,
    systemHealth: 98
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    const userType = localStorage.getItem('userType')
    
    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setIsAdmin(userType === 'admin' || parsedUser.isAdmin)
    
    console.log("Dashboard loaded for user:", parsedUser)
  }, [router])

  // Simulate real-time mining updates
  useEffect(() => {
    if (isMining) {
      const interval = setInterval(() => {
        setMiningData(prev => ({
          ...prev,
          hashRate: prev.hashRate + Math.random() * 10,
          balance: prev.balance + Math.random() * 0.001,
          todayEarnings: prev.todayEarnings + Math.random() * 0.001
        }))
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isMining])

  // Simulate admin stats updates
  useEffect(() => {
    if (isAdmin) {
      const interval = setInterval(() => {
        setAdminStats(prev => ({
          ...prev,
          activeMiners: prev.activeMiners + Math.floor(Math.random() * 5) - 2,
          totalMined: prev.totalMined + Math.floor(Math.random() * 100),
          blocksResolved: prev.blocksResolved + (Math.random() > 0.98 ? 1 : 0)
        }))
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isAdmin])

  const handleMiningToggle = () => {
    setIsMining(!isMining)
    console.log(`Mining ${!isMining ? 'started' : 'stopped'}`)
    
    if (!isMining) {
      setMiningData(prev => ({
        ...prev,
        hashRate: 245.6,
        currentCoin: 'Monero (XMR)',
        aiRecommendation: 'IA escolheu Monero - mais lucrativo para CPU'
      }))
    } else {
      setMiningData(prev => ({
        ...prev,
        hashRate: 0
      }))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userType')
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="animate-pulse text-hashblock-gold text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-hashblock-gold/20 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">#</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Hash Block.IA</h1>
              <p className="text-xs text-hashblock-text-muted">
                {isAdmin ? 'Painel Administrativo' : 'Dashboard de Mineração'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium">{user.name}</span>
                {isAdmin && <Crown className="h-4 w-4 text-hashblock-gold" />}
              </div>
              <p className="text-xs text-hashblock-text-muted">{user.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-hashblock-text-muted hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {isAdmin ? (
          // Admin Dashboard
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Painel Administrativo</h2>
                <p className="text-hashblock-text-muted">Controle total da plataforma</p>
              </div>
              <Badge className="bg-hashblock-gold text-black">
                <Shield className="h-3 w-3 mr-1" />
                Administrador
              </Badge>
            </div>

            {/* Admin Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="mining-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total de Mineradores</CardTitle>
                  <Users className="h-4 w-4 text-hashblock-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-hashblock-gold">{adminStats.totalMiners.toLocaleString()}</div>
                  <p className="text-xs text-hashblock-text-muted">
                    {adminStats.activeMiners.toLocaleString()} ativos agora
                  </p>
                </CardContent>
              </Card>

              <Card className="mining-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Minerado</CardTitle>
                  <DollarSign className="h-4 w-4 text-hashblock-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-hashblock-gold">R$ {adminStats.totalMined.toLocaleString()}</div>
                  <p className="text-xs text-hashblock-text-muted">
                    Crescimento de 12% hoje
                  </p>
                </CardContent>
              </Card>

              <Card className="mining-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Blocos Resolvidos</CardTitle>
                  <BarChart3 className="h-4 w-4 text-hashblock-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-hashblock-gold">{adminStats.blocksResolved.toLocaleString()}</div>
                  <p className="text-xs text-hashblock-text-muted">
                    Último bloco há 2 min
                  </p>
                </CardContent>
              </Card>

              <Card className="mining-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Dispositivos Conectados</CardTitle>
                  <Activity className="h-4 w-4 text-hashblock-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-hashblock-gold">{adminStats.activeMiners.toLocaleString()}</div>
                  <p className="text-xs text-hashblock-text-muted">
                    Crescimento de 8% hoje
                  </p>
                </CardContent>
              </Card>

              <Card className="mining-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Saques Pendentes</CardTitle>
                  <Clock className="h-4 w-4 text-hashblock-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-hashblock-gold">{adminStats.pendingWithdrawals}</div>
                  <p className="text-xs text-hashblock-text-muted">
                    Aguardando aprovação
                  </p>
                </CardContent>
              </Card>

              <Card className="mining-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Sistema</CardTitle>
                  <Zap className="h-4 w-4 text-hashblock-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{adminStats.systemHealth}%</div>
                  <p className="text-xs text-hashblock-text-muted">
                    Saúde do sistema
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Admin Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="mining-card">
                <CardHeader>
                  <CardTitle className="text-white">Ações Administrativas</CardTitle>
                  <CardDescription>Controles do sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full gold-button">
                    Aprovar Saques Pendentes
                  </Button>
                  <Button className="w-full bg-hashblock-dark border border-hashblock-gold/30 text-hashblock-gold hover:bg-hashblock-gold hover:text-black">
                    Configurar Sistema de Ranks
                  </Button>
                  <Button className="w-full bg-hashblock-dark border border-hashblock-gold/30 text-hashblock-gold hover:bg-hashblock-gold hover:text-black">
                    Relatórios Detalhados
                  </Button>
                </CardContent>
              </Card>

              <Card className="mining-card">
                <CardHeader>
                  <CardTitle className="text-white">Monitoramento</CardTitle>
                  <CardDescription>Status da rede</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-hashblock-text-muted">Hash Rate Global</span>
                      <span className="text-hashblock-gold">1.2 TH/s</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-hashblock-text-muted">Uptime</span>
                      <span className="text-green-400">99.8%</span>
                    </div>
                    <Progress value={99.8} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // User Dashboard
          <div className="space-y-6">
            {/* User Welcome */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Dashboard de Mineração</h2>
                <p className="text-hashblock-text-muted">Bem-vindo de volta, {user.name}!</p>
              </div>
              <Badge className={`${isMining ? 'bg-green-500' : 'bg-hashblock-text-muted'} text-white`}>
                {isMining ? 'Minerando' : 'Parado'}
              </Badge>
            </div>

            {/* Mining Controls */}
            <Card className="mining-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-hashblock-gold" />
                  Controle de Mineração
                </CardTitle>
                <CardDescription>
                  IA otimizada para seu hardware: {miningData.deviceType}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-hashblock-text-muted">Moeda Atual</p>
                    <p className="text-lg font-semibold text-hashblock-gold">{miningData.currentCoin}</p>
                    <p className="text-xs text-hashblock-text-muted">{miningData.aiRecommendation}</p>
                  </div>
                  <Button
                    onClick={handleMiningToggle}
                    className={`${isMining ? 'bg-red-500 hover:bg-red-600' : 'gold-button'}`}
                  >
                    {isMining ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {isMining ? 'Parar Mineração' : 'Iniciar Mineração'}
                  </Button>
                </div>

                {isMining && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-hashblock-text-muted">Hash Rate</span>
                      <span className="text-lg font-bold text-hashblock-gold animate-pulse">
                        {miningData.hashRate.toFixed(1)} H/s
                      </span>
                    </div>
                    <Progress value={Math.min(miningData.hashRate / 5, 100)} className="h-2 mining-active" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Earnings Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="mining-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Saldo Atual</CardTitle>
                  <Wallet className="h-4 w-4 text-hashblock-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-hashblock-gold">
                    R$ {miningData.balance.toFixed(2)}
                  </div>
                  <p className="text-xs text-hashblock-text-muted">
                    Disponível para saque
                  </p>
                </CardContent>
              </Card>

              <Card className="mining-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Ganhos Hoje</CardTitle>
                  <TrendingUp className="h-4 w-4 text-hashblock-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-hashblock-gold">
                    R$ {miningData.todayEarnings.toFixed(2)}
                  </div>
                  <p className="text-xs text-hashblock-text-muted">
                    +12% vs ontem
                  </p>
                </CardContent>
              </Card>

              <Card className="mining-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Ganho</CardTitle>
                  <DollarSign className="h-4 w-4 text-hashblock-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-hashblock-gold">
                    R$ {miningData.totalEarnings.toFixed(2)}
                  </div>
                  <p className="text-xs text-hashblock-text-muted">
                    Histórico completo
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Hardware Detection */}
            <Card className="mining-card">
              <CardHeader>
                <CardTitle className="text-white">Hardware Detectado</CardTitle>
                <CardDescription>Nossa IA analisou seu dispositivo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-hashblock-gold/20 rounded-lg flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-hashblock-gold" />
                  </div>
                  <div>
                    <p className="text-white font-medium">CPU Intel Core i7-12700K</p>
                    <p className="text-hashblock-text-muted text-sm">8 cores, 16 threads - Otimizado para Monero</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="mining-card">
                <CardHeader>
                  <CardTitle className="text-white">Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full gold-button">
                    Solicitar Saque
                  </Button>
                  <Button className="w-full bg-hashblock-dark border border-hashblock-gold/30 text-hashblock-gold hover:bg-hashblock-gold hover:text-black">
                    Histórico de Mineração
                  </Button>
                  <Button className="w-full bg-hashblock-dark border border-hashblock-gold/30 text-hashblock-gold hover:bg-hashblock-gold hover:text-black">
                    Configurações
                  </Button>
                </CardContent>
              </Card>

              <Card className="mining-card">
                <CardHeader>
                  <CardTitle className="text-white">Plano Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-hashblock-text-muted">Plano</span>
                      <Badge className="bg-hashblock-gold/20 text-hashblock-gold">Gratuito</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-hashblock-text-muted">Limite de Saque</span>
                      <span className="text-white">R$ 50/mês</span>
                    </div>
                    <Button className="w-full gold-button">
                      Fazer Upgrade
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}