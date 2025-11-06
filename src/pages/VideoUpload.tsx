import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "@/hooks/use-toast"
import { 
  Upload, 
  Video, 
  Camera,
  File,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowLeft,
  Clock,
  FileVideo
} from "lucide-react"
import { Link } from "react-router-dom"

const VideoUpload = () => {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState("")

  const [subscriptionTier, setSubscriptionTier] = useState<"free" | "premium" | null>(null)
  const [monthlyUploadCount, setMonthlyUploadCount] = useState<number | null>(null)

  useEffect(() => {
    const loadLimits = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        return
      }

      const userId = session.user.id

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("id", userId)
        .single()

      if (!profileError && profile) {
        setSubscriptionTier((profile.subscription_tier as "free" | "premium") || "free")
      }

      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { count, error: countError } = await supabase
        .from("video_analyses")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .gte("created_at", startOfMonth.toISOString())

      if (!countError) {
        setMonthlyUploadCount(count ?? 0)
      }
    }

    loadLimits()
  }, [])


  // Mock exercises list
  const exercises = [
    "Agachamento Livre",
    "Supino Reto",
    "Levantamento Terra",
    "Desenvolvimento Militar", 
    "Rosca Bíceps",
    "Tríceps Testa",
    "Leg Press",
    "Puxada na Polia",
    "Remada Curvada",
    "Elevação Lateral"
  ]

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('video/')) {
        setSelectedFile(file)
      }
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith('video/')) {
        setSelectedFile(file)
      }
    }
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }


  const handleSendForAnalysis = async () => {
    try {
      if (!selectedFile || !selectedExercise) {
        toast({
          title: "Selecione o vídeo e o exercício",
          description: "Escolha um arquivo de vídeo e o tipo de exercício antes de enviar.",
          variant: "destructive",
        })
        return
      }

      if (subscriptionTier !== "premium" && monthlyUploadCount !== null && monthlyUploadCount >= 3) {
        toast({
          title: "Limite do plano gratuito atingido",
          description: "Você já enviou 3 vídeos este mês. Faça upgrade para o plano Premium para vídeos ilimitados.",
          variant: "destructive",
        })
        return
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !session) {
        toast({
          title: "Sessão expirada",
          description: "Faça login novamente para enviar vídeos.",
          variant: "destructive",
        })
        return
      }

      const userId = session.user.id

      setIsUploading(true)
      simulateUpload()

      const fileExt = selectedFile.name.split(".").pop()
      const filePath = `${userId}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("videos")
        .upload(filePath, selectedFile)

      if (uploadError) {
        console.error(uploadError)
        toast({
          title: "Erro ao enviar vídeo",
          description: "Não foi possível enviar o vídeo. Tente novamente.",
          variant: "destructive",
        })
        setIsUploading(false)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from("videos")
        .getPublicUrl(filePath)

      const videoUrl = publicUrlData.publicUrl

      const { error: insertError } = await supabase
        .from("video_analyses")
        .insert({
          user_id: userId,
          video_url: videoUrl,
          exercise_name: selectedExercise,
          execution_status: "Em análise",
          feedback_text: null,
          analysis_result: null,
        })

      if (insertError) {
        console.error(insertError)
        toast({
          title: "Erro ao registrar análise",
          description: "O vídeo foi enviado, mas não foi possível registrar a análise.",
          variant: "destructive",
        })
        setIsUploading(false)
        return
      }

      setUploadProgress(100)
      setIsUploading(false)
      setMonthlyUploadCount((prev) => (prev ?? 0) + 1)
      setSelectedFile(null)

      toast({
        title: "Vídeo enviado com sucesso!",
        description: "Nossa equipe vai analisar e você verá o feedback em 'Meus Vídeos'.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro inesperado",
        description: "Tente enviar o vídeo novamente.",
        variant: "destructive",
      })
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
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
              Upload de Vídeo
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Upload Limits Info */}
        <Card className="mb-6 bg-muted/30 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Info className="mr-2 h-5 w-5 text-primary" />
              Limites do Plano Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">3</div>
                <div className="text-muted-foreground">Vídeos restantes este mês</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">30s</div>
                <div className="text-muted-foreground">Duração máxima</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">50MB</div>
                <div className="text-muted-foreground">Tamanho máximo</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link to="/pricing">
                <Button variant="accent" size="sm">
                  Upgrade para Premium - Vídeos Ilimitados
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <CardTitle>Selecionar Vídeo</CardTitle>
                <CardDescription>
                  Arraste e solte ou clique para selecionar um arquivo de vídeo
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedFile ? (
                  <div
                    className={`
                      border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
                      ${dragActive 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                        <Upload className="h-8 w-8 text-primary-foreground" />
                      </div>
                      
                      <div>
                        <p className="text-lg font-medium">Solte seu vídeo aqui</p>
                        <p className="text-sm text-muted-foreground">
                          ou clique para selecionar
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <FileVideo className="h-4 w-4 mr-1" />
                          MP4, MOV, AVI
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Máx. 30s
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Selected File Info */}
                    <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Video className="h-6 w-6 text-primary-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-medium">{selectedFile.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatFileSize(selectedFile.size)}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-xs text-success">Arquivo válido</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                      >
                        Remover
                      </Button>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Enviando...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Exercise Selection */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <CardTitle>Tipo de Exercício</CardTitle>
                <CardDescription>
                  Selecione qual exercício está sendo executado no vídeo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o exercício" />
                  </SelectTrigger>
                  <SelectContent>
                    {exercises.map((exercise) => (
                      <SelectItem key={exercise} value={exercise}>
                        {exercise}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Instructions & Tips */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 h-5 w-5 text-accent" />
                  Dicas de Gravação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <div className="font-medium">Ângulo de Visão</div>
                      <div className="text-sm text-muted-foreground">
                        Filme de perfil (lateral) para melhor análise biomecânica
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <div className="font-medium">Iluminação</div>
                      <div className="text-sm text-muted-foreground">
                        Certifique-se de que há boa iluminação no ambiente
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <div className="font-medium">Corpo Completo</div>
                      <div className="text-sm text-muted-foreground">
                        Filme o corpo todo, da cabeça aos pés
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <div className="font-medium">Estabilidade</div>
                      <div className="text-sm text-muted-foreground">
                        Use tripé ou apoie o celular em uma superfície estável
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-accent" />
                  O que Analisamos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Postura corporal",
                    "Alinhamento articular", 
                    "Amplitude de movimento",
                    "Velocidade de execução",
                    "Estabilidade do core",
                    "Coordenação motora"
                  ].map((item) => (
                    <Badge key={item} variant="secondary" className="justify-center py-2">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full"
              disabled={!selectedFile || !selectedExercise || isUploading}
              onClick={handleSendForAnalysis}
            >
              {isUploading ? (
                <>Processando...</>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Enviar para Análise
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoUpload