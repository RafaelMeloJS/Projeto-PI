import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, User, Edit2, Save, X } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "@/hooks/use-toast"

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState("")
  
  const [profileData, setProfileData] = useState({
    fullName: "João Silva Santos",
    email: "joao.silva@example.com",
    phone: "+55 11 98765-4321",
    birthDate: "1995-05-15",
    city: "São Paulo",
    state: "SP",
    bio: "Atleta amador apaixonado por musculação e fitness",
    subscriptionTier: "premium",
    joinDate: "2024-01-15",
  })

  const [editData, setEditData] = useState(profileData)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setUserEmail(session.user.email || "")
          
          // Buscar dados do perfil do Supabase (quando implementado)
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (profile) {
            setProfileData(prev => ({
              ...prev,
              email: session.user.email || prev.email,
              // Adicionar campos do Supabase conforme implementado
            }))
            setEditData(prev => ({
              ...prev,
              email: session.user.email || prev.email,
            }))
          }
        }
        setIsLoading(false)
      } catch (err) {
        console.error("Erro ao carregar perfil:", err)
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user) {
        throw new Error("Usuário não autenticado")
      }

      // Atualizar perfil no Supabase (quando implementado)
      // Por enquanto, apenas salvar localmente
      setProfileData(editData)
      setIsEditing(false)
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
        variant: "default",
      })
    } catch (err) {
      console.error("Erro ao salvar perfil:", err)
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível atualizar seu perfil. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gradient-primary">
                  Meu Perfil
                </h1>
                <p className="text-sm text-muted-foreground">Gerencie suas informações pessoais</p>
              </div>
            </div>
            
            {!isEditing && (
              <Button variant="hero" size="sm" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Avatar e Informações Básicas */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                  <User className="h-12 w-12 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
                  <p className="text-muted-foreground">{profileData.email}</p>
                  <Badge className="mt-2 bg-gradient-primary text-primary-foreground">
                    {profileData.subscriptionTier === "premium" ? "Premium" : "Gratuito"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Informações Pessoais */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Seus dados de contato e localização</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome Completo */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  <User className="h-4 w-4 inline mr-2" />
                  Nome Completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.fullName}
                    onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-foreground font-medium">{profileData.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email
                </label>
                <p className="text-foreground font-medium">{profileData.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Não é possível alterar o email</p>
              </div>

              {/* Telefone */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Telefone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-foreground font-medium">{profileData.phone}</p>
                )}
              </div>

              {/* Data de Nascimento */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Data de Nascimento
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.birthDate}
                    onChange={(e) => setEditData({ ...editData, birthDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-foreground font-medium">
                    {new Date(profileData.birthDate).toLocaleDateString("pt-BR")}
                  </p>
                )}
              </div>

              {/* Cidade */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Cidade
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-foreground font-medium">{profileData.city}</p>
                )}
              </div>

              {/* Estado */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Estado
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.state}
                    onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                    maxLength={2}
                  />
                ) : (
                  <p className="text-foreground font-medium">{profileData.state}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
                  rows={4}
                />
              ) : (
                <p className="text-foreground">{profileData.bio}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informações de Assinatura */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Informações de Assinatura</CardTitle>
            <CardDescription>Detalhes sobre sua assinatura e plano</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Plano Atual</p>
                <Badge className={profileData.subscriptionTier === "premium" ? "bg-gradient-primary text-primary-foreground" : ""}>
                  {profileData.subscriptionTier === "premium" ? "Premium" : "Gratuito"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Membro Desde</p>
                <p className="text-foreground font-medium">
                  {new Date(profileData.joinDate).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        {isEditing && (
          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button variant="hero" onClick={handleSaveProfile} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
