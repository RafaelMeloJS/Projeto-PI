import { Link } from "react-router-dom"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Camera, TrendingUp, Clock, Shield, Users, ArrowLeft, Upload } from "lucide-react"

const FeaturesPage = () => {
  const features = [
    {
      icon: Brain,
      title: "Análise IA Avançada",
      description: "Algoritmos de inteligência artificial analisam biomecânica e postura em tempo real"
    },
    {
      icon: Camera,
      title: "Upload Simples",
      description: "Envie vídeos direto do seu celular em qualquer ângulo e qualidade"
    },
    {
      icon: TrendingUp,
      title: "Relatórios Detalhados",
      description: "Acompanhe sua evolução com gráficos e métricas de performance"
    },
    {
      icon: Clock,
      title: "Análise Rápida",
      description: "Resultados em até 10 segundos após o upload do vídeo"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Seus vídeos são processados com total privacidade e segurança"
    },
    {
      icon: Users,
      title: "Para Todos Níveis",
      description: "Do iniciante ao atleta avançado, adaptado para seu nível"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-primary">
            Recursos Essenciais para o Seu Treino
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforme cada repetição em dados acionáveis com a inteligência da Athlete Insights Pro. Nossa plataforma combina <strong>Análise de IA Avançada</strong> com <strong>Relatórios Detalhados</strong> e <strong>Velocidade de Processamento</strong> para garantir que você treine com a máxima eficiência e segurança.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How it works steps */}
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">3 Passos Simples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Grave ou Selecione</h3>
              <p className="text-muted-foreground">
                Faça upload do vídeo do seu exercício direto da galeria ou grave na hora
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">IA Analisa</h3>
              <p className="text-muted-foreground">
                Nossa inteligência artificial processa e analisa cada movimento em detalhes
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Receba Feedback</h3>
              <p className="text-muted-foreground">
                Obtenha análise detalhada com correções e sugestões de melhoria
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para Começar?</h2>
          <Link to="/signup">
            <Button variant="hero" size="xl">
              <Upload className="mr-2 h-5 w-5" />
              Começar Grátis Agora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FeaturesPage
