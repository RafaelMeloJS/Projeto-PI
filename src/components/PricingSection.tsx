import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Star } from "lucide-react"

const PricingSection = () => {
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
    <section id="pricing" className="py-20 px-6 bg-card/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Começe grátis e evolua para recursos avançados quando estiver pronto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

                <a href={plan.name === "Premium" ? "/checkout" : "/signup"}>
                  <Button 
                    variant={plan.variant} 
                    size="lg" 
                    className="w-full"
                  >
                    {plan.buttonText}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Não tem certeza qual plano escolher? Experimente o gratuito primeiro!
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-success mr-2" />
              Cancele a qualquer momento
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-success mr-2" />
              Sem taxas ocultas
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-success mr-2" />
              Suporte 7 dias por semana
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection