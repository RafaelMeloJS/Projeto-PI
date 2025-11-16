import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Info, Trash2, Check } from "lucide-react"

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Análise Concluída",
      description: "Seu vídeo de agachamento foi analisado com sucesso. Score: 92%",
      timestamp: "2 horas atrás",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "Novo Recurso Disponível",
      description: "Confira os novos gráficos de comparação de performance no seu dashboard.",
      timestamp: "1 dia atrás",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Limite de Vídeos Próximo",
      description: "Você já enviou 2 de 3 vídeos este mês. Faça upgrade para ilimitado.",
      timestamp: "3 dias atrás",
      read: true,
    },
    {
      id: 4,
      type: "success",
      title: "Sequência Alcançada",
      description: "Parabéns! Você manteve uma sequência de 7 dias consecutivos.",
      timestamp: "5 dias atrás",
      read: true,
    },
    {
      id: 5,
      type: "info",
      title: "Atualização do Sistema",
      description: "Realizamos melhorias na velocidade de análise de vídeos.",
      timestamp: "1 semana atrás",
      read: true,
    },
  ])

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-accent" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-primary" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-success/10 border-success/30"
      case "warning":
        return "bg-accent/10 border-accent/30"
      case "info":
      default:
        return "bg-primary/10 border-primary/30"
    }
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
                  Notificações
                </h1>
                <p className="text-sm text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} nova${unreadCount !== 1 ? 's' : ''}` : "Tudo em dia"}
                </p>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                <MarkAsRead className="h-4 w-4 mr-2" />
                Marcar Tudo como Lido
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {notifications.length === 0 ? (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">Nenhuma notificação no momento</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`bg-card/50 backdrop-blur-sm border-border/50 transition-all ${
                  !notification.read ? "border-primary/50 shadow-glow" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${getColor(notification.type)}`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                              Novo
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                        title="Marcar como lido"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(notification.id)}
                        title="Deletar notificação"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
