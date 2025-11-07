import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Mail, Phone, Star, Quote } from "lucide-react"

const AboutSection = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Atleta Amador",
      content: "Melhorei minha técnica de agachamento em apenas 2 semanas. A análise é muito precisa!",
      rating: 5
    },
    {
      name: "Maria Santos",
      role: "Personal Trainer",
      content: "Uso com meus alunos para mostrar onde podem melhorar. Revolucionou meus treinos!",
      rating: 5
    },
    {
      name: "João Pedro",
      role: "Iniciante",
      content: "Como iniciante, me sinto muito mais seguro sabendo se estou fazendo os exercícios corretamente.",
      rating: 5
    }
  ]

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto">
        {/* About Us */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
            Sobre Nós
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-muted-foreground mb-6">
              Somos apaixonados por fitness e tecnologia. Nossa missão é democratizar o acesso a análises precisas de exercícios, 
              ajudando pessoas de todos os níveis a treinar com segurança e eficiência.
            </p>
            <p className="text-lg text-muted-foreground">
              Nossa plataforma é um complemento ao trabalho de profissionais de educação física, 
              não um substituto. Acreditamos que tecnologia e conhecimento humano juntos podem transformar vidas.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">O Que Nossos Usuários Dizem</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  
                  <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                  
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact & Support */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contato & Suporte</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-muted-foreground">suporte@athleteinsights.pro</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                  <MessageCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-muted-foreground">+55 11 99999-9999</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">Suporte</div>
                  <div className="text-muted-foreground">Seg-Dom: 8h às 22h</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" className="flex-1">
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar no WhatsApp
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="mr-2 h-4 w-4" />
                Enviar Email
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Demonstração Completa</h3>
            
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
              <div className="aspect-video bg-gradient-secondary rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="text-sm text-muted-foreground">Vídeo Demonstrativo</div>
                  <div className="text-xs text-muted-foreground mt-1">3:42 min</div>
                </div>
              </div>
              
              <h4 className="font-semibold mb-2">Veja Como Funciona na Prática</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Demonstração completa da análise de um exercício real, desde o upload até os resultados.
              </p>
              
              <Button variant="accent" className="w-full">
                Assistir Demonstração
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection