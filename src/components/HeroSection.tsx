import { Link } from "react-router-dom"
import { Button } from "@/components/ui/enhanced-button"
import { Play, Upload, BarChart3 } from "lucide-react"
import heroImage from "@/assets/hero-image.jpg"

const HeroSection = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Analise Sua Execução
            <br />
            <span className="text-4xl md:text-6xl">Com Inteligência Artificial</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Envie vídeos dos seus exercícios de musculação e receba análises detalhadas sobre sua execução em tempo real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/signup">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                <Upload className="mr-2 h-5 w-5" />
                Começar Grátis Agora
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="xl" 
              className="w-full sm:w-auto"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Demonstração
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Precisão na Análise</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">10s</div>
              <div className="text-muted-foreground">Tempo de Processamento</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">50k+</div>
              <div className="text-muted-foreground">Exercícios Analisados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <div className="w-20 h-20 bg-primary/30 rounded-full blur-xl animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <div className="w-32 h-32 bg-accent/30 rounded-full blur-xl animate-pulse" />
      </div>
    </section>
  )
}

export default HeroSection