import { useEffect, useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Video, 
  Search, 
  Filter, 
  Download, 
  Eye,
  CheckCircle, 
  XCircle, 
  Clock,
  Calendar,
  ArrowLeft
} from "lucide-react"
import { Link } from "react-router-dom"


type HistoryItem = {
  id: string
  exercise: string
  uploadDate: string
  duration: string
  status: string
  result: string
  analysis: string
  muscleGroups: string[]
  thumbnail: string
}

const VideoHistory = () => {
  const [videos, setVideos] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadHistory = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !session) {
        toast({
          title: "Sessão expirada",
          description: "Faça login para ver seu histórico.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const userId = session.user.id

      const { data, error } = await supabase
        .from("video_analyses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error(error)
        toast({
          title: "Erro ao carregar histórico",
          description: "Não foi possível buscar seus vídeos.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const mapped: HistoryItem[] = (data || []).map((row: any) => {
        const status = row.execution_status || "Em análise"
        let result = ""

        if (row.analysis_result && typeof row.analysis_result === "object") {
          const classification = (row.analysis_result as any).classification
          if (typeof classification === "string") {
            result = classification === "Execução correta" ? "Correto" : classification
          }
        }

        return {
          id: row.id,
          exercise: row.exercise_name || "Exercício",
          uploadDate: row.created_at
            ? new Date(row.created_at).toLocaleString("pt-BR")
            : "",
          duration: "",
          status,
          result,
          analysis: row.feedback_text || "",
          muscleGroups: [],
          thumbnail: "/placeholder-video.jpg",
        }
      })

      setVideos(mapped)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      toast({
        title: "Erro inesperado",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

const getStatusIcon = (status: string, result: string) => {
    if (status === "Em análise") return <Clock className="h-4 w-4 text-accent" />
    if (status === "Erro no processamento") return <XCircle className="h-4 w-4 text-destructive" />
    if (result === "Correto") return <CheckCircle className="h-4 w-4 text-success" />
    if (result === "Incorreto") return <XCircle className="h-4 w-4 text-destructive" />
    return <Video className="h-4 w-4 text-muted-foreground" />
  }

  const getStatusBadge = (status: string, result: string) => {
    if (status === "Em análise") return <Badge variant="outline" className="text-accent border-accent">Em Análise</Badge>
    if (status === "Erro no processamento") return <Badge variant="destructive">Erro</Badge>
    if (result === "Correto") return <Badge className="bg-success text-success-foreground">Correto</Badge>
    if (result === "Incorreto") return <Badge variant="destructive">Incorreto</Badge>
    return <Badge variant="secondary">Processado</Badge>
  }


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando seu histórico de vídeos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gradient-primary">
                Histórico de Vídeos
              </h1>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {videos.length} vídeos encontrados
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por exercício..." 
              className="pl-10"
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="analyzed">Analisados</SelectItem>
              <SelectItem value="processing">Em análise</SelectItem>
              <SelectItem value="error">Com erro</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrar por resultado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="correct">Corretos</SelectItem>
              <SelectItem value="incorrect">Incorretos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Video List */}
        <div className="space-y-4">
          {videos.map((video) => (
            <Card key={video.id} className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Video Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Video className="h-8 w-8 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(video.status, video.result)}
                          <h3 className="text-lg font-semibold">{video.exercise}</h3>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {video.uploadDate}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {video.duration}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {video.muscleGroups.map((muscle) => (
                            <Badge key={muscle} variant="secondary" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                        
                        {getStatusBadge(video.status, video.result)}
                      </div>
                    </div>
                  </div>

                  {/* Analysis Result */}
                  <div className="lg:col-span-1">
                    {video.analysis && (
                      <div>
                        <h4 className="font-medium mb-2">Análise:</h4>
                        <p className="text-sm text-muted-foreground">
                          {video.analysis}
                        </p>
                      </div>
                    )}
                    
                    {video.status === "Em análise" && (
                      <div className="text-sm text-muted-foreground">
                        Processamento em andamento...
                      </div>
                    )}
                    
                    {video.status === "Erro no processamento" && (
                      <div className="text-sm text-destructive">
                        {video.analysis}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-1 flex flex-col space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                    
                    {video.status === "Analisado" && (
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar Relatório
                      </Button>
                    )}
                    
                    {video.status === "Erro no processamento" && (
                      <Button variant="accent" size="sm" className="w-full">
                        Reprocessar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="default" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoHistory