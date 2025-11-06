import { useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Star, 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown,
  ArrowLeft,
  Send,
  Heart,
  Lightbulb,
  Target,
  Zap
} from "lucide-react"
import { Link } from "react-router-dom"

const UserFeedback = () => {
  const [overallRating, setOverallRating] = useState<number>(0)
  const [npsScore, setNpsScore] = useState<string>("")
  const [improvements, setImprovements] = useState<string[]>([])
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleStarClick = (rating: number) => {
    setOverallRating(rating)
  }

  const handleImprovementChange = (improvement: string, checked: boolean) => {
    if (checked) {
      setImprovements([...improvements, improvement])
    } else {
      setImprovements(improvements.filter(item => item !== improvement))
    }
  }

  const handleSubmit = () => {
    // Aqui integraria com Supabase para salvar feedback
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md bg-card/50 backdrop-blur-sm border-border/50 shadow-glow">
          <CardContent className="text-center p-8">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Heart className="h-10 w-10 text-primary-foreground" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Obrigado pelo Feedback!
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Sua opinião é fundamental para melhorarmos continuamente nossa plataforma. 
              Cada comentário nos ajuda a evoluir! 💪
            </p>
            
            <Link to="/dashboard">
              <Button variant="hero" className="w-full">
                Voltar ao Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Seu Feedback
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Como foi sua experiência?</h2>
          <p className="text-xl text-muted-foreground">
            Sua opinião nos ajuda a criar a melhor plataforma de análise de exercícios do mundo!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rating Section */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-accent" />
                  Avaliação Geral
                </CardTitle>
                <CardDescription>
                  Como você avalia nossa plataforma de 1 a 5 estrelas?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      className="focus:outline-none transition-colors"
                    >
                      <Star 
                        className={`h-8 w-8 ${
                          star <= overallRating 
                            ? 'text-accent fill-current' 
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                
                <div className="text-center">
                  {overallRating > 0 && (
                    <p className="text-lg font-semibold">
                      {overallRating === 5 && "Excepcional! 🌟"}
                      {overallRating === 4 && "Muito bom! 👏"}
                      {overallRating === 3 && "Bom 👍"}
                      {overallRating === 2 && "Pode melhorar 🤔"}
                      {overallRating === 1 && "Precisa de ajustes 😔"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-primary" />
                  Recomendação (NPS)
                </CardTitle>
                <CardDescription>
                  Você recomendaria a FormCheck AI para um amigo da academia?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={npsScore} onValueChange={setNpsScore}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="definitely" id="definitely" />
                      <Label htmlFor="definitely" className="flex items-center cursor-pointer">
                        <ThumbsUp className="h-4 w-4 mr-2 text-success" />
                        Definitivamente
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="probably" id="probably" />
                      <Label htmlFor="probably" className="cursor-pointer">
                        Provavelmente
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="maybe" />
                      <Label htmlFor="maybe" className="cursor-pointer">
                        Talvez
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="flex items-center cursor-pointer">
                        <ThumbsDown className="h-4 w-4 mr-2 text-destructive" />
                        Não recomendaria
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions Section */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-accent" />
                  Sugestões de Melhoria
                </CardTitle>
                <CardDescription>
                  Quais áreas você gostaria que melhorássemos? (múltipla escolha)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Precisão da análise IA",
                    "Velocidade de processamento",
                    "Interface do usuário",
                    "Relatórios mais detalhados",
                    "Mais tipos de exercícios",
                    "Suporte ao cliente",
                    "Preços mais acessíveis",
                    "App mobile"
                  ].map((improvement) => (
                    <div key={improvement} className="flex items-center space-x-2">
                      <Checkbox
                        id={improvement}
                        checked={improvements.includes(improvement)}
                        onCheckedChange={(checked) => 
                          handleImprovementChange(improvement, checked as boolean)
                        }
                      />
                      <Label htmlFor={improvement} className="cursor-pointer">
                        {improvement}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                  Comentários Adicionais
                </CardTitle>
                <CardDescription>
                  Conte-nos mais sobre sua experiência (opcional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Compartilhe sua experiência, sugestões ou qualquer feedback adicional..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-32 resize-none"
                />
                <div className="text-xs text-muted-foreground mt-2">
                  {comment.length}/500 caracteres
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <Button 
            variant="hero" 
            size="xl"
            onClick={handleSubmit}
            disabled={overallRating === 0}
            className="min-w-64"
          >
            <Send className="mr-2 h-5 w-5" />
            Enviar Feedback
          </Button>
          
          {overallRating === 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Por favor, dê uma avaliação geral para continuar
            </p>
          )}
        </div>

        {/* Incentive Message */}
        <Card className="mt-8 bg-gradient-secondary border-border/50">
          <CardContent className="text-center p-6">
            <Zap className="h-8 w-8 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Sua opinião acelera nossa evolução! 
            </h3>
            <p className="text-muted-foreground">
              Cada feedback recebido é analisado pela nossa equipe e usado para implementar melhorias reais na plataforma.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserFeedback