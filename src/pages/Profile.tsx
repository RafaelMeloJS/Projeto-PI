import { useEffect, useState } from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, User } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import ProfileDetails from "@/components/ProfileDetails" // Importando o novo componente

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [profileData, setProfileData] = useState({
    fullName: "Carregando...",
    email: "carregando...",
    subscriptionTier: "free",
    joinDate: "2024-01-01",
  })

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // 1. Buscar dados da dim_pessoa para nome e email
          const { data: usuarioData } = await supabase
            .from("project.dim_usuario")
            .select("id_pessoa")
            .eq("user_uid", session.user.id)
            .single()

          if (usuarioData) {
            const { data: pessoaData } = await supabase
              .from("project.dim_pessoa")
              .select("des_nome")
              .eq("id_pessoa", usuarioData.id_pessoa)
              .single()

            // 2. Buscar dados do perfil (profiles) para o plano (mantendo a compatibilidade)
            const { data: profile } = await supabase
              .from("public.profiles")
              .select("subscription_tier, created_at")
              .eq("id", session.user.id)
              .single()

            setProfileData(prev => ({
              ...prev,
              fullName: pessoaData?.des_nome || "Nome não encontrado",
              email: session.user.email || "Email não encontrado",
              subscriptionTier: (profile?.subscription_tier as "premium" | "free") || "free",
              joinDate: profile?.created_at || "2024-01-01",
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

        {/* Informações Pessoais Detalhadas (Novo Componente) */}
        <div className="mb-8">
          <ProfileDetails />
        </div>

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
      </div>
    </div>
  )
}

export default Profile
