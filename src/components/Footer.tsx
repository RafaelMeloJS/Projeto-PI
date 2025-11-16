import { Dumbbell, Instagram, Twitter, Youtube, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <Dumbbell className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gradient-primary">
                Athlete Insights Pro
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Revolucionando treinos de musculação com análise inteligente de exercícios.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/#features" className="hover:text-foreground transition-colors">Recursos</Link></li>
              <li><Link to="/#pricing" className="hover:text-foreground transition-colors">Planos</Link></li>
              <li><Link to="/#demo" className="hover:text-foreground transition-colors">Demonstração</Link></li>
              <li><Link to="/#api" className="hover:text-foreground transition-colors">API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/#about" className="hover:text-foreground transition-colors">Sobre Nós</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/carreiras" className="hover:text-foreground transition-colors">Carreiras</Link></li>
              <li><Link to="/imprensa" className="hover:text-foreground transition-colors">Imprensa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/ajuda" className="hover:text-foreground transition-colors">Centro de Ajuda</Link></li>
              <li><Link to="/contato" className="hover:text-foreground transition-colors">Contato</Link></li>
              <li><Link to="/status" className="hover:text-foreground transition-colors">Status</Link></li>
              <li><Link to="/privacidade" className="hover:text-foreground transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 Athlete Insights Pro. Todos os direitos reservados.
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer