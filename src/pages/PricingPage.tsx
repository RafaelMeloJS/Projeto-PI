import { Link } from "react-router-dom"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Star, ArrowLeft } from "lucide-react"

const PricingPage = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Perfeito para começar sua jornada fitness",
      features: [
        "3 vídeos por mês",
        "Análise básica de execução",
        "Duração máxima: 30 segundos",
        "Sem histórico detalhado",
        "Suporte por email"
      ],
      limitations: [
        "Sem relatórios avançados",
        "Sem dashboard de progresso",
        "Sem análise de evolução"
      ],
      buttonText: "Começar Grátis",
      variant: "outline" as const,
      popular: false
    },
    {
      name: "Premium",
      price: "R$ 29",
      period: "/mês",
      description: "Para quem leva o treino a sério",
      features: [
        "Vídeos ilimitados",
        "Análise detalhada completa",
        "Vídeos até 2 minutos",
        "Histórico completo de evolução",
        "Dashboard de performance",
        "Relatórios semanais",
        "Comparativo de progresso",
        "Suporte prioritário",
        "Análise de múltiplos ângulos"
      ],
      limitations: [],
      buttonText: "Assinar Premium",
      variant: "hero" as const,
      popular: true
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
            Escolha Seu Plano
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Começe grátis e evolua para recursos avançados quando estiver pronto. Sem compromissos, cancele a qualquer momento.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 ${
                plan.popular ? 'border-primary/50 shadow-glow scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary px-6 py-2 rounded-full shadow-glow">
                    <div className="flex items-center text-primary-foreground font-semibold">
                      <Star className="w-4 h-4 mr-1" />
                      Mais Popular
                    </div>
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center opacity-60">
                      <X className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.variant} 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.location.href = plan.name === "Premium" ? "/checkout" : "/signup"}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Compare o Plano Gratuito x Premium</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Recurso</th>
                  <th className="text-center py-4 px-4 font-semibold">Gratuito</th>
                  <th className="text-center py-4 px-4 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50 hover:bg-card/30 transition">
                  <td className="py-4 px-4">Envio de vídeos por mês</td>
                  <td className="text-center py-4 px-4">Até 3 vídeos/mês</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-success mx-auto" /></td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-card/30 transition">
                  <td className="py-4 px-4">Profundidade da análise</td>
                  <td className="text-center py-4 px-4">Feedback resumido</td>
                  <td className="text-center py-4 px-4">Feedback detalhado</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-card/30 transition">
                  <td className="py-4 px-4">Histórico de vídeos</td>
                  <td className="text-center py-4 px-4">Lista simples</td>
                  <td className="text-center py-4 px-4">Histórico completo</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-card/30 transition">
                  <td className="py-4 px-4">Relatórios e indicadores</td>
                  <td className="text-center py-4 px-4"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-success mx-auto" /></td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-card/30 transition">
                  <td className="py-4 px-4">Prioridade de análise</td>
                  <td className="text-center py-4 px-4">Fila padrão</td>
                  <td className="text-center py-4 px-4">Prioridade máxima</td>
                </tr>
                <tr className="hover:bg-card/30 transition">
                  <td className="py-4 px-4">Suporte</td>
                  <td className="text-center py-4 px-4">Email</td>
                  <td className="text-center py-4 px-4">Prioritário</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Perguntas Frequentes</h2>
          
          <div className="space-y-4 text-left">
            <div className="bg-card/30 rounded-lg p-6 border border-border/50">
              <h3 className="font-semibold mb-2">Posso mudar de plano depois?</h3>
              <p className="text-muted-foreground text-sm">Sim! Você pode fazer upgrade ou downgrade a qualquer momento. As mudanças entram em vigor no próximo período de cobrança.</p>
            </div>
            
            <div className="bg-card/30 rounded-lg p-6 border border-border/50">
              <h3 className="font-semibold mb-2">Há período de teste?</h3>
              <p className="text-muted-foreground text-sm">Sim, comece com o plano gratuito e teste todos os recursos. Faça upgrade quando se sentir pronto.</p>
            </div>
            
            <div className="bg-card/30 rounded-lg p-6 border border-border/50">
              <h3 className="font-semibold mb-2">Como funciona o cancelamento?</h3>
              <p className="text-muted-foreground text-sm">Você pode cancelar a qualquer momento, sem perguntas. Seu acesso continuará até o final do período pago.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
