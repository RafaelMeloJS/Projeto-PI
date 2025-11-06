import { Link } from "react-router-dom"
import { Button } from "@/components/ui/enhanced-button"
import { Dumbbell } from "lucide-react"
import PremiumBadge from "@/components/PremiumBadge"

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <Dumbbell className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Athlete Insights Pro
            </span>
            <PremiumBadge />
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Recursos
            </a>
            <a 
              href="#pricing" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Planos
            </a>
            <a 
              href="#about" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Sobre Nós
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header