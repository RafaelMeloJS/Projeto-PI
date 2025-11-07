import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import PremiumBadge from "@/components/PremiumBadge"
import { 
  Upload, 
  Video, 
  TrendingUp, 
  Calendar, 
  Target, 
  CheckCircle, 
  XCircle,
  Play,
  MessageCircle,
  BarChart3,
  User,
  Bell,
  LogOut
} from "lucide-react"

const Dashboard = () => {

  const [subscriptionTier, setSubscriptionTier] = useState<"free" | "premium" | null>(null)
  const [isLoadingTier, setIsLoadingTier] = useState(true)

  useEffect(() => {
    const loadTier = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error || !session) {
          setIsLoadingTier(false)
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", session.user.id)
          .single()

        if (profileError) {
          console.error(profileError)
          toast({
            title: "Erro ao carregar plano",
            description: "Não foi possível buscar as informações da sua assinatura.",
            variant: "destructive",
          })
        } else {
          setSubscriptionTier((profile?.subscription_tier as "free" | "premium") || "free")
        }

        setIsLoadingTier(false)
      } catch (err) {
        console.error(err)
        setIsLoadingTier(false)
      }
    }

    loadTier()
  }, [])

  // Mock data - será substituído por dados reais do Supabase
  const monthlyStats = {
    videosThisMonth: 12,
    videosPrevious: 8,
    correctExecution: 9,
    incorrectExecution: 3,
    mostWorkedMuscles: ["Quadríceps", "Glúteos", "Peitorais"],
    leastWorkedMuscles: ["Tríceps", "Deltoides"]
  }

  const recentVideos = [
    { id: 1, exercise: "Agachamento", status: "Analisado", result: "Correto", date: "2024-01-15" },
    { id: 2, exercise: "Supino", status: "Em análise", result: "", date: "2024-01-14" },
    { id: 3, exercise: "Deadlift", status: "Analisado", result: "Incorreto", date: "2024-01-13" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gradient-primary">
                Meu Dashboard
              </h1>
              <PremiumBadge />
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">

        {/* Status do plano */}
        <div className="mb-8">
          <div className="rounded-2xl border border-border/60 bg-card/60 p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-muted-foreground">
                  Seu plano atual
                </span>
                {!isLoadingTier && subscriptionTier && (
                  <Badge variant={subscriptionTier === "premium" ? "default" : "outline"}>
                    {subscriptionTier === "premium" ? "Premium" : "Gratuito"}
                  </Badge>
                )}
              </div>
              <h2 className="text-lg md:text-xl font-semibold">
                {isLoadingTier
                  ? "Carregando seu plano..."
                  : subscriptionTier === "premium"
                  ? "Você tem acesso completo a todas as análises."
                  : "Você pode enviar até 3 vídeos por mês com análise básica."}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {subscriptionTier === "premium"
                  ? "Relatórios avançados, histórico completo e prioridade na fila de análise."
                  : "Faça upgrade para liberar vídeos ilimitados, relatórios e prioridade na fila de análise."}
              </p>
            </div>
            {subscriptionTier !== "premium" && !isLoadingTier && (
              <Link to="/checkout">
                <Button variant="hero">
                  Ativar plano Premium
                </Button>
              </Link>
            )}
          </div>
        </div>
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div>
            <a href="/upload">
              <Button variant="hero" size="lg" className="h-20 flex-col space-y-2 w-full">
                <Upload className="h-6 w-6" />
                <span>Upload Vídeo</span>
              </Button>
            </a>
          </div>
          
          <div>
            <a href="/videos">
              <Button variant="outline" size="lg" className="h-20 flex-col space-y-2 w-full">
                <Video className="h-6 w-6" />
                <span>Meus Vídeos</span>
              </Button>
            </a>
          </div>
          
          <div>
            <a href="/relatorios">
              <Button variant="outline" size="lg" className="h-20 flex-col space-y-2 w-full">
                <BarChart3 className="h-6 w-6" />
                <span>Relatórios</span>
              </Button>
            </a>
          </div>
          
          <div>
            <a href="/feedback">
              <Button variant="outline" size="lg" className="h-20 flex-col space-y-2 w-full">
                <MessageCircle className="h-6 w-6" />
                <span>Suporte</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Premium Dashboard Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Performance Este Mês
              </CardTitle>
              <CardDescription>
                Comparativo com o mês anterior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {monthlyStats.videosThisMonth}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Vídeos enviados (+{monthlyStats.videosThisMonth - monthlyStats.videosPrevious} vs mês anterior)
                  </div>
                  <Progress value={(monthlyStats.videosThisMonth / 20) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">
                        {monthlyStats.correctExecution}
                      </div>
                      <div className="text-xs text-muted-foreground">Corretos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">
                        {monthlyStats.incorrectExecution}
                      </div>
                      <div className="text-xs text-muted-foreground">Incorretos</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-muted-foreground">
                      Taxa de sucesso: {Math.round((monthlyStats.correctExecution / (monthlyStats.correctExecution + monthlyStats.incorrectExecution)) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-accent" />
                Grupos Musculares
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Mais Trabalhados</div>
                <div className="flex flex-wrap gap-1">
                  {monthlyStats.mostWorkedMuscles.map((muscle) => (
                    <Badge key={muscle} variant="secondary" className="text-xs">
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Menos Trabalhados</div>
                <div className="flex flex-wrap gap-1">
                  {monthlyStats.leastWorkedMuscles.map((muscle) => (
                    <Badge key={muscle} variant="outline" className="text-xs">
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Videos & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Videos */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Video className="mr-2 h-5 w-5 text-primary" />
                  Vídeos Recentes
                </div>
                <a href="/videos">
                  <Button variant="ghost" size="sm">
                    Ver Todos
                  </Button>
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVideos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Play className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{video.exercise}</div>
                        <div className="text-xs text-muted-foreground">{video.date}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {video.status === "Analisado" ? (
                        <>
                          {video.result === "Correto" ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                          <Badge variant={video.result === "Correto" ? "secondary" : "destructive"} className="text-xs">
                            {video.result}
                          </Badge>
                        </>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {video.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions & Support */}
          <div className="space-y-6">
            {/* Demo Video */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="mr-2 h-5 w-5 text-accent" />
                  Demonstração
                </CardTitle>
                <CardDescription>
                  Aprenda a usar a plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-secondary rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2 shadow-glow">
                      <Play className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground">Tutorial Completo</div>
                  </div>
                </div>
                <Button variant="accent" className="w-full">
                  Assistir Agora
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                  Precisa de Ajuda?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat de Suporte
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar Chamada
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard