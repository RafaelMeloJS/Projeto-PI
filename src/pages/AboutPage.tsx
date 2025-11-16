import { Link } from "react-router-dom"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Mail, Phone, Star, Quote, ArrowLeft } from "lucide-react"

const AboutPage = () => {
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
        {/* About Us Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-primary">
            Sobre Nós
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-muted-foreground mb-6">
              A Athlete Insights Pro nasceu da paixão e do empenho de um grupo de estudantes com uma visão clara: <strong>democratizar a análise de performance esportiva</strong>. Nosso objetivo é fornecer uma ferramenta utilitária e de fácil acesso que ajude atletas, desde amadores até os de alta performance, a avaliar e aprimorar a execução de seus exercícios.
            </p>
            <p className="text-lg text-muted-foreground">
              Com um foco intenso em utilidade e acessibilidade, dedicamos nosso esforço para entregar uma plataforma que combina a precisão da Inteligência Artificial com a praticidade do uso diário. Acreditamos que a tecnologia, quando bem aplicada, é a chave para transformar o treino em resultados concretos e seguros.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">O Que Nossos Usuários Dizem</h2>
          
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
            <h2 className="text-2xl font-bold mb-6">Contato & Suporte</h2>
            
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
            <h2 className="text-2xl font-bold mb-6">Nossa Missão</h2>
            
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Democratizar a Análise de Performance</h3>
                <p className="text-muted-foreground text-sm">
                  Acreditamos que todo atleta merece acesso a ferramentas profissionais de análise, independentemente de seu nível ou orçamento.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-primary">Precisão com Acessibilidade</h3>
                <p className="text-muted-foreground text-sm">
                  Combinamos tecnologia de ponta com uma interface intuitiva para que qualquer pessoa possa usar nossa plataforma.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-primary">Segurança e Privacidade</h3>
                <p className="text-muted-foreground text-sm">
                  Seus dados e vídeos são protegidos com os mais altos padrões de segurança e criptografia.
                </p>
              </div>

              <Link to="/signup" className="block">
                <Button variant="hero" className="w-full mt-4">
                  Comece Sua Jornada Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
