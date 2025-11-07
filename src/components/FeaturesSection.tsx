import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Camera, TrendingUp, Clock, Shield, Users } from "lucide-react"

const FeaturesSection = () => {
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
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
            Como Funciona Nossa Plataforma
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologia de ponta para transformar seus treinos em dados precisos e actionáveis
          </p>
        </div>

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
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50">
          <h3 className="text-3xl font-bold text-center mb-12">3 Passos Simples</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Grave ou Selecione</h4>
              <p className="text-muted-foreground">
                Faça upload do vídeo do seu exercício direto da galeria ou grave na hora
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">IA Analisa</h4>
              <p className="text-muted-foreground">
                Nossa inteligência artificial processa e analisa cada movimento em detalhes
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Receba Feedback</h4>
              <p className="text-muted-foreground">
                Obtenha análise detalhada com correções e sugestões de melhoria
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection