import { Link } from "react-router-dom";
import { Check, X, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";

const PlanComparison = () => {
  return (
    <section id="planos" className="w-full py-16 md:py-24 bg-gradient-to-b from-background via-background/80 to-muted/40">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">
            Planos
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Compare o plano <span className="bg-gradient-primary bg-clip-text text-transparent">Gratuito x Premium</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Comece grátis, teste a plataforma e faça upgrade quando estiver pronto para acompanhar a evolução
            dos seus atletas de forma profissional.
          </p>
        </div>

        <Card className="border-border/60 bg-card/60 backdrop-blur-xl shadow-sm">
          <CardHeader className="border-b border-border/40">
            <CardTitle className="text-lg md:text-xl">O que cada plano oferece</CardTitle>
            <CardDescription>
              Transparente, sem pegadinha: veja exatamente o que muda quando você ativa o Premium.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-[1.3fr,1fr,1fr] gap-4 text-sm md:text-base">
              <div></div>

              <div className="text-center">
                <div className="font-semibold mb-1">Gratuito</div>
                <p className="text-xs text-muted-foreground">Ideal para testes e uso individual.</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-1 font-semibold mb-1">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Premium
                </div>
                <p className="text-xs text-muted-foreground">Para quem quer entregar resultado de verdade.</p>
              </div>

              <Row
                label="Envio de vídeos por mês"
                freeContent="Até 3 vídeos/mês"
                premiumContent="Vídeos ilimitados"
              />

              <Row
                label="Profundidade da análise"
                freeContent="Feedback resumido"
                premiumContent="Feedback detalhado com pontos específicos de correção"
              />

              <Row
                label="Histórico de vídeos"
                freeContent="Lista simples de execuções"
                premiumContent="Histórico completo com evolução da execução"
              />

              <Row
                label="Relatórios e indicadores"
                freeIcon="x"
                premiumContent="Acesso aos relatórios e visão da evolução do atleta"
              />

              <Row
                label="Prioridade de análise"
                freeContent="Fila padrão"
                premiumContent="Prioridade na fila de análise"
              />

              <Row
                label="Suporte"
                freeContent="Suporte básico"
                premiumContent="Suporte prioritário para ajustes e dúvidas"
              />

              <Row
                label="Uso profissional (vários atletas)"
                freeIcon="x"
                premiumContent="Pensado para acompanhamento de diversos atletas e turmas"
              />
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-xs md:text-sm text-muted-foreground">
                Você pode começar com o plano gratuito e fazer upgrade a qualquer momento, sem perder seus dados.
              </div>
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <Link to="/signup">
                  <Button variant="outline" className="w-full md:w-auto">
                    Começar grátis
                  </Button>
                </Link>
                <Link to="/checkout">
                  <Button variant="hero" className="w-full md:w-auto">
                    Ativar plano Premium
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

type RowProps = {
  label: string;
  freeContent?: string;
  premiumContent?: string;
  freeIcon?: "check" | "x";
  premiumIcon?: "check" | "x";
};

const Row = ({
  label,
  freeContent,
  premiumContent,
  freeIcon,
  premiumIcon = "check",
}: RowProps) => {
  const renderCell = (side: "free" | "premium") => {
    const content = side === "free" ? freeContent : premiumContent;
    const icon = side === "free" ? freeIcon : premiumIcon;

    if (!content && !icon) return null;

    return (
      <div className="flex items-center justify-center text-xs md:text-sm text-center min-h-[40px]">
        {content ? (
          <span className="text-muted-foreground">{content}</span>
        ) : icon === "check" ? (
          <Check className="h-4 w-4 text-primary" />
        ) : (
          <X className="h-4 w-4 text-destructive" />
        )}
      </div>
    );
  };

  return (
    <>
      <div className="py-3 border-t border-border/40 text-xs md:text-sm font-medium flex items-center">
        {label}
      </div>
      <div className="py-3 border-t border-border/40">
        {renderCell("free")}
      </div>
      <div className="py-3 border-t border-border/40">
        {renderCell("premium")}
      </div>
    </>
  );
};

export default PlanComparison;
