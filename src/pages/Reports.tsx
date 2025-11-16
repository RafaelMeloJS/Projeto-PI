import { useEffect, useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Target,
  Activity,
  Video,
  ArrowLeft,
  Filter,
  Download,
  Crown,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  Zap,
  TrendingDown,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Reports = () => {
  const [timePeriod, setTimePeriod] = useState("30");
  const [muscleFilter, setMuscleFilter] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState("agachamento");
  const [subscriptionTier, setSubscriptionTier] = useState<"free" | "premium" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setIsLoading(false);
          return;
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Erro ao buscar plano:", error);
          setSubscriptionTier("free");
        } else {
          setSubscriptionTier((profile?.subscription_tier as "free" | "premium") || "free");
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Erro:", err);
        setSubscriptionTier("free");
        setIsLoading(false);
      }
    };

    loadSubscription();
  }, []);

  // Mock data
  const userStats = {
    totalAnalyses: 127,
    correctExecutions: 98,
    incorrectExecutions: 29,
    averageScore: 87,
    totalTimeAnalyzed: "4h 32min",
    currentStreak: 12,
    subscriptionTier: subscriptionTier || "free",
    subscriptionRenewal: "15/12/2025",
    videosThisMonth: 18,
    videoLimit: subscriptionTier === "premium" ? "Ilimitado" : "3",
  };

  const performanceData = [
    { month: "Jul", taxa: 65, videos: 8 },
    { month: "Ago", taxa: 72, videos: 12 },
    { month: "Set", taxa: 78, videos: 15 },
    { month: "Out", taxa: 85, videos: 18 },
    { month: "Nov", taxa: 87, videos: 18 },
  ];

  const weeklyData = [
    { week: "Sem 1", taxa: 82 },
    { week: "Sem 2", taxa: 85 },
    { week: "Sem 3", taxa: 88 },
    { week: "Sem 4", taxa: 87 },
  ];

  const exerciseFrequency = [
    { name: "Agachamento", value: 35, color: "hsl(var(--primary))" },
    { name: "Supino", value: 25, color: "hsl(var(--accent))" },
    { name: "Levantamento Terra", value: 20, color: "hsl(var(--success))" },
    { name: "Remada", value: 12, color: "hsl(217, 91%, 70%)" },
    { name: "Outros", value: 8, color: "hsl(var(--muted-foreground))" },
  ];

  const topExercises = [
    { name: "Agachamento Livre", count: 28, avgScore: 92, trend: "up" },
    { name: "Supino Reto", count: 22, avgScore: 88, trend: "up" },
    { name: "Levantamento Terra", count: 18, avgScore: 85, trend: "stable" },
    { name: "Remada Curvada", count: 15, avgScore: 83, trend: "up" },
    { name: "Desenvolvimento", count: 12, avgScore: 79, trend: "down" },
  ];

  const errorsByExercise = [
    { error: "Joelhos para dentro", frequency: 45 },
    { error: "Lombar curvada", frequency: 30 },
    { error: "Pés desalinhados", frequency: 15 },
    { error: "Amplitude incorreta", frequency: 10 },
  ];

  const muscleBalanceData = [
    { muscle: "Quadríceps", value: 90 },
    { muscle: "Glúteos", value: 85 },
    { muscle: "Peitorais", value: 75 },
    { muscle: "Dorsais", value: 60 },
    { muscle: "Deltoides", value: 55 },
    { muscle: "Tríceps", value: 45 },
  ];

  const exerciseList = [
    { name: "agachamento", label: "Agachamento", videos: 28 },
    { name: "supino", label: "Supino", videos: 22 },
    { name: "deadlift", label: "Deadlift", videos: 18 },
    { name: "remada", label: "Remada", videos: 15 },
  ];

  const recentAnalysis = [
    { id: 1, date: "06/11/2025", exercise: "Agachamento Livre", result: "Correto", score: 95 },
    { id: 2, date: "05/11/2025", exercise: "Supino Reto", result: "Correto", score: 91 },
    { id: 3, date: "04/11/2025", exercise: "Levantamento Terra", result: "Correto", score: 88 },
    { id: 4, date: "03/11/2025", exercise: "Remada Curvada", result: "Incorreto", score: 68 },
    { id: 5, date: "02/11/2025", exercise: "Agachamento Búlgaro", result: "Correto", score: 92 },
  ];

  const recommendations = [
    {
      title: "Trabalhe mais os Tríceps",
      description: "Seus tríceps estão menos desenvolvidos. Adicione mais exercícios de tríceps.",
      priority: "high",
    },
    {
      title: "Mantenha a consistência",
      description: "Você está em uma sequência de 12 dias! Continue assim.",
      priority: "medium",
    },
    {
      title: "Revise a técnica da Remada",
      description: "Sua última remada teve score baixo. Revise os pontos de erro.",
      priority: "high",
    },
  ];

  const isPremium = subscriptionTier === "premium";

  const BlurredContent = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      {children}
      {!isPremium && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background backdrop-blur-sm rounded-lg flex items-center justify-center cursor-not-allowed">
          <div className="text-center">
            <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium text-muted-foreground">Desbloqueie o Plano Premium</p>
          </div>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gradient-primary">
                  Relatórios {isPremium ? "Premium" : "Básicos"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {isPremium ? "Análise completa da sua jornada fitness" : "Visualização limitada - Faça upgrade para ver tudo"}
                </p>
              </div>
            </div>
            
            <Badge variant={isPremium ? "secondary" : "outline"} className={isPremium ? "bg-gradient-primary text-primary-foreground" : ""}>
              <Crown className="h-3 w-3 mr-1" />
              {isPremium ? "Premium" : "Gratuito"}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Status do Plano */}
        <Card className={`mb-8 ${isPremium ? "bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-primary/20" : "bg-card/50 border-border/50"}`}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Crown className="mr-2 h-5 w-5 text-primary" />
              Status do Plano
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Plano Atual</div>
                <div className="text-xl font-bold text-primary">{isPremium ? "Premium" : "Gratuito"}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Vídeos este Mês</div>
                <div className="text-xl font-bold">{userStats.videosThisMonth} / {userStats.videoLimit}</div>
              </div>
              {isPremium && (
                <>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Renovação</div>
                    <div className="text-xl font-bold">{userStats.subscriptionRenewal}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Sequência Atual</div>
                    <div className="text-xl font-bold text-success flex items-center">
                      <Zap className="h-5 w-5 mr-1" />
                      {userStats.currentStreak} dias
                    </div>
                  </div>
                </>
              )}
              {!isPremium && (
                <div className="md:col-span-2">
                  <Link to="/checkout">
                    <Button variant="hero" className="w-full">
                      <Crown className="h-4 w-4 mr-2" />
                      Fazer Upgrade para Premium
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Video className="mr-2 h-4 w-4" />
                Total de Análises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{userStats.totalAnalyses}</div>
              <p className="text-sm text-muted-foreground mt-1">Desde o início</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Target className="mr-2 h-4 w-4" />
                Taxa de Sucesso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {Math.round((userStats.correctExecutions / userStats.totalAnalyses) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">{userStats.correctExecutions} corretos de {userStats.totalAnalyses}</p>
            </CardContent>
          </Card>

          <BlurredContent>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Award className="mr-2 h-4 w-4" />
                  Score Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{userStats.averageScore}%</div>
                <Progress value={userStats.averageScore} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </BlurredContent>

          <BlurredContent>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Tempo Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">{userStats.totalTimeAnalyzed}</div>
                <p className="text-sm text-muted-foreground mt-1">De vídeos analisados</p>
              </CardContent>
            </Card>
          </BlurredContent>
        </div>

        {/* Gráficos e Análises */}
        <Tabs defaultValue="performance" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="exercises">Exercícios</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <BlurredContent>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Evolução de Performance</CardTitle>
                  <CardDescription>Taxa de sucesso ao longo dos meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="taxa" stroke="hsl(var(--primary))" strokeWidth={2} name="Taxa de Sucesso %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </BlurredContent>
          </TabsContent>

          <TabsContent value="exercises">
            <BlurredContent>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Distribuição de Exercícios</CardTitle>
                  <CardDescription>Frequência de cada exercício</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={exerciseFrequency} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                        {exerciseFrequency.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </BlurredContent>
          </TabsContent>

          <TabsContent value="recommendations">
            <BlurredContent>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Recomendações Personalizadas</CardTitle>
                  <CardDescription>Dicas para melhorar seu desempenho</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${rec.priority === "high" ? "border-destructive/50 bg-destructive/10" : "border-border/50 bg-card/30"}`}>
                      <h3 className="font-semibold mb-1">{rec.title}</h3>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </BlurredContent>
          </TabsContent>
        </Tabs>

        {!isPremium && (
          <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/50 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Crown className="mr-2 h-5 w-5 text-primary" />
                Desbloqueie Relatórios Completos
              </CardTitle>
              <CardDescription>
                Acesse análises detalhadas, gráficos avançados e recomendações personalizadas com o Plano Premium
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/checkout">
                <Button variant="hero" size="lg">
                  <Crown className="h-4 w-4 mr-2" />
                  Fazer Upgrade Agora - R$ 29/mês
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reports;
