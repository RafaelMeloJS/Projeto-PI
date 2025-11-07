import { useState } from "react";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { Link } from "react-router-dom";

const Reports = () => {
  const [timePeriod, setTimePeriod] = useState("30");
  const [muscleFilter, setMuscleFilter] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState("agachamento");

  // Mock data - será substituído por dados reais do Supabase
  const userStats = {
    totalAnalyses: 127,
    correctExecutions: 98,
    incorrectExecutions: 29,
    averageScore: 87,
    totalTimeAnalyzed: "4h 32min",
    currentStreak: 12,
    subscriptionTier: "Premium",
    subscriptionRenewal: "15/12/2025",
    videosThisMonth: 18,
    videoLimit: "Ilimitado",
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
                  Relatórios Premium
                </h1>
                <p className="text-sm text-muted-foreground">Análise completa da sua jornada fitness</p>
              </div>
            </div>
            
            <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Status do Plano */}
        <Card className="mb-8 bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 border-primary/20">
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
                <div className="text-xl font-bold text-primary">{userStats.subscriptionTier}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Vídeos este Mês</div>
                <div className="text-xl font-bold">{userStats.videosThisMonth} / {userStats.videoLimit}</div>
              </div>
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
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Filter className="mr-2 h-5 w-5 text-primary" />
              Filtros Avançados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Período de Tempo</label>
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Última semana</SelectItem>
                    <SelectItem value="30">Último mês</SelectItem>
                    <SelectItem value="90">Últimos 3 meses</SelectItem>
                    <SelectItem value="180">Últimos 6 meses</SelectItem>
                    <SelectItem value="365">Último ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Grupo Muscular</label>
                <Select value={muscleFilter} onValueChange={setMuscleFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="perna">Perna</SelectItem>
                    <SelectItem value="peito">Peito</SelectItem>
                    <SelectItem value="costas">Costas</SelectItem>
                    <SelectItem value="braco">Braço</SelectItem>
                    <SelectItem value="ombro">Ombro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Relatório PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Evolução Mensal
              </CardTitle>
              <CardDescription>
                Taxa de execução correta por mês
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="taxa"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 6 }}
                      activeDot={{ r: 8 }}
                      name="Taxa de Execução (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-accent" />
                Distribuição de Exercícios
              </CardTitle>
              <CardDescription>
                Exercícios mais praticados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={exerciseFrequency}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {exerciseFrequency.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Exercises */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-success" />
              Exercícios Mais Executados
            </CardTitle>
            <CardDescription>
              Ranking dos seus exercícios favoritos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topExercises.map((exercise, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{exercise.name}</div>
                      <div className="text-sm text-muted-foreground">{exercise.count} execuções</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Score Médio</div>
                      <div className="text-lg font-bold text-primary">{exercise.avgScore}%</div>
                    </div>
                    {exercise.trend === "up" && (
                      <TrendingUp className="h-5 w-5 text-success" />
                    )}
                    {exercise.trend === "down" && (
                      <TrendingDown className="h-5 w-5 text-destructive" />
                    )}
                    {exercise.trend === "stable" && (
                      <div className="h-5 w-5 flex items-center justify-center">
                        <div className="w-4 h-0.5 bg-muted-foreground"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exercise Analysis Tabs */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-accent" />
              Análise Detalhada por Exercício
            </CardTitle>
            <CardDescription>
              Pontos de melhoria e histórico de cada exercício
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedExercise} onValueChange={setSelectedExercise}>
              <TabsList className="grid grid-cols-4 mb-6">
                {exerciseList.map((ex) => (
                  <TabsTrigger key={ex.name} value={ex.name}>
                    {ex.label}
                    <Badge variant="secondary" className="ml-2 text-xs">{ex.videos}</Badge>
                  </TabsTrigger>
                ))}
              </TabsList>

              {exerciseList.map((ex) => (
                <TabsContent key={ex.name} value={ex.name} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Error Frequency Chart */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Pontos de Erro Mais Comuns</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={errorsByExercise}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis 
                              dataKey="error" 
                              stroke="hsl(var(--muted-foreground))"
                              angle={-45}
                              textAnchor="end"
                              height={100}
                              tick={{ fontSize: 12 }}
                            />
                            <YAxis stroke="hsl(var(--muted-foreground))" />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                              }}
                            />
                            <Bar 
                              dataKey="frequency" 
                              fill="hsl(var(--accent))" 
                              radius={[8, 8, 0, 0]}
                              name="Frequência (%)"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Video List */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Últimas Análises ({ex.videos} total)</h3>
                      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {recentAnalysis.map((video) => (
                          <div 
                            key={video.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                                {video.result === "Correto" ? (
                                  <CheckCircle className="h-5 w-5 text-primary-foreground" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-primary-foreground" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{video.exercise}</div>
                                <div className="text-xs text-muted-foreground">{video.date}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge 
                                variant={video.result === "Correto" ? "secondary" : "destructive"}
                                className="mb-1"
                              >
                                {video.result}
                              </Badge>
                              <div className="text-sm font-semibold text-primary">{video.score}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Muscle Balance */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-success" />
              Balanço Muscular
            </CardTitle>
            <CardDescription>
              Distribuição do trabalho muscular nos últimos {timePeriod} dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={muscleBalanceData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis 
                    dataKey="muscle" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Radar
                    name="Trabalho Muscular"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="text-sm text-muted-foreground mb-1">Mais Trabalhados</div>
                <div className="font-semibold text-success">Quadríceps, Glúteos</div>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="text-sm text-muted-foreground mb-1">Menos Trabalhados</div>
                <div className="font-semibold text-destructive">Tríceps, Deltoides</div>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-sm text-muted-foreground mb-1">Equilíbrio Geral</div>
                <div className="font-semibold text-primary">Bom (72%)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5 text-accent" />
              Recomendações Personalizadas
            </CardTitle>
            <CardDescription>
              Sugestões baseadas na sua performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${
                    rec.priority === "high" 
                      ? "bg-destructive/10 border-destructive/30" 
                      : "bg-primary/10 border-primary/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{rec.title}</div>
                      <div className="text-sm text-muted-foreground">{rec.description}</div>
                    </div>
                    <Badge 
                      variant={rec.priority === "high" ? "destructive" : "secondary"}
                      className="ml-4"
                    >
                      {rec.priority === "high" ? "Alta" : "Média"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
