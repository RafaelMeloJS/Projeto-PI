import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { Link } from "react-router-dom";

const Reports = () => {
  const [timePeriod, setTimePeriod] = useState("30");
  const [muscleFilter, setMuscleFilter] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState("agachamento");

  // Mock data - será substituído por dados reais do Supabase
  const performanceData = [
    { week: "Sem 1", taxa: 65 },
    { week: "Sem 2", taxa: 72 },
    { week: "Sem 3", taxa: 78 },
    { week: "Sem 4", taxa: 85 },
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
    { name: "agachamento", label: "Agachamento", videos: 15 },
    { name: "supino", label: "Supino", videos: 12 },
    { name: "deadlift", label: "Deadlift", videos: 10 },
    { name: "remada", label: "Remada", videos: 8 },
  ];

  const recentAnalysis = [
    { id: 1, date: "2024-01-15", exercise: "Agachamento", result: "Correto", score: 92 },
    { id: 2, date: "2024-01-14", exercise: "Supino", result: "Incorreto", score: 68 },
    { id: 3, date: "2024-01-13", exercise: "Deadlift", result: "Correto", score: 88 },
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
                <p className="text-sm text-muted-foreground">Análise detalhada da sua performance</p>
              </div>
            </div>
            
            <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
              Premium
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
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
                    <SelectItem value="30">Último mês</SelectItem>
                    <SelectItem value="90">Últimos 3 meses</SelectItem>
                    <SelectItem value="180">Últimos 6 meses</SelectItem>
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
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Relatório
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Video className="mr-2 h-4 w-4" />
                Vídeos por Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">4.2</div>
              <p className="text-sm text-muted-foreground mt-1">Média nos últimos 30 dias</p>
              <div className="flex items-center mt-2 text-success text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Target className="mr-2 h-4 w-4" />
                Taxa de Execução
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">85%</div>
              <p className="text-sm text-muted-foreground mt-1">Média de acertos</p>
              <div className="flex items-center mt-2 text-success text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +20% melhoria vs primeiro mês
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Activity className="mr-2 h-4 w-4" />
                Consistência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">92%</div>
              <p className="text-sm text-muted-foreground mt-1">Taxa de frequência</p>
              <div className="flex items-center mt-2 text-success text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                Excelente!
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Timeline */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Evolução da Taxa de Execução Correta
            </CardTitle>
            <CardDescription>
              Acompanhe seu progresso ao longo das últimas semanas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="week" 
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

        {/* Exercise Analysis */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-accent" />
              Análise por Exercício
            </CardTitle>
            <CardDescription>
              Detalhamento dos pontos de melhoria em cada exercício
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedExercise} onValueChange={setSelectedExercise}>
              <TabsList className="grid grid-cols-4 mb-6">
                {exerciseList.map((ex) => (
                  <TabsTrigger key={ex.name} value={ex.name}>
                    {ex.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {exerciseList.map((ex) => (
                <TabsContent key={ex.name} value={ex.name} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Error Frequency Chart */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Pontos de Erro Específicos</h3>
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
                      <h3 className="text-lg font-semibold mb-4">Vídeos Analisados ({ex.videos})</h3>
                      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {recentAnalysis.map((video) => (
                          <div 
                            key={video.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <Video className="h-5 w-5 text-primary-foreground" />
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
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
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
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
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
      </div>
    </div>
  );
};

export default Reports;
