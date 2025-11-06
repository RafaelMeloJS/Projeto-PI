import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Shield, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para assinar",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Atualizar perfil para premium
      const { error } = await supabase
        .from("profiles")
        .update({
          subscription_tier: "premium",
          subscription_status: "active",
          subscription_start_date: new Date().toISOString(),
          subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Pagamento aprovado! 🎉",
        description: "Bem-vindo ao Athlete Insights Pro Premium!",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro no pagamento:", error);
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível processar o pagamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Assine o Plano Premium
            </h1>
            <p className="text-muted-foreground">
              Desbloqueie todos os recursos e leve seus treinos ao próximo nível
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Resumo do Plano */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/50 shadow-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  Plano Premium
                </CardTitle>
                <CardDescription>Acesso completo a todos os recursos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-bold text-primary">R$ 29</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-success" />
                    <span>Vídeos ilimitados</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-success" />
                    <span>Análise detalhada completa</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-success" />
                    <span>Dashboard de performance</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-success" />
                    <span>Relatórios semanais</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-success" />
                    <span>Suporte prioritário</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Shield className="h-3 w-3 mr-1" />
                    Pagamento seguro e criptografado
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formulário de Pagamento */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Informações de Pagamento
                </CardTitle>
                <CardDescription>Preencha os dados do cartão</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nome no Cartão</Label>
                    <Input
                      id="cardName"
                      placeholder="João Silva"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '');
                        if (value.length <= 16 && /^\d*$/.test(value)) {
                          setCardNumber(value.replace(/(\d{4})/g, '$1 ').trim());
                        }
                      }}
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Validade</Label>
                      <Input
                        id="cardExpiry"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 4) {
                            if (value.length >= 2) {
                              setCardExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
                            } else {
                              setCardExpiry(value);
                            }
                          }
                        }}
                        maxLength={5}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardCvv">CVV</Label>
                      <Input
                        id="cardCvv"
                        placeholder="123"
                        type="password"
                        value={cardCvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 3) {
                            setCardCvv(value);
                          }
                        }}
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processando...
                      </div>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Confirmar Pagamento R$ 29,00
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Ao confirmar, você concorda com nossos termos de serviço e política de privacidade
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
