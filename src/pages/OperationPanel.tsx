import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  Filter,
  Video as VideoIcon,
  User,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

type VideoAnalysisRow = {
  id: string;
  user_id: string;
  video_url: string | null;
  exercise_name: string;
  execution_status: string | null;
  feedback_text: string | null;
  analysis_result: any | null;
  created_at: string | null;
};

const OperationPanel = () => {
  const [analyses, setAnalyses] = useState<VideoAnalysisRow[]>([]);
  const [filteredAnalyses, setFilteredAnalyses] = useState<VideoAnalysisRow[]>([]);
  const [selected, setSelected] = useState<VideoAnalysisRow | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadAnalyses = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("video_analyses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast({
        title: "Erro ao carregar análises",
        description: "Não foi possível buscar os vídeos enviados.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const cast = (data || []) as VideoAnalysisRow[];
    setAnalyses(cast);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAnalyses();
  }, []);

  useEffect(() => {
    let data = [...analyses];

    if (statusFilter !== "all") {
      data = data.filter(
        (a) => (a.execution_status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        (a) =>
          a.exercise_name.toLowerCase().includes(term) ||
          a.user_id.toLowerCase().includes(term)
      );
    }

    setFilteredAnalyses(data);
  }, [analyses, statusFilter, searchTerm]);

  const handleSave = async () => {
    if (!selected) return;

    try {
      setIsSaving(true);

      const { error } = await supabase
        .from("video_analyses")
        .update({
          execution_status: selected.execution_status,
          feedback_text: selected.feedback_text,
          analysis_result: selected.analysis_result,
        })
        .eq("id", selected.id);

      if (error) {
        console.error(error);
        toast({
          title: "Erro ao salvar feedback",
          description: "Tente novamente em instantes.",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      toast({
        title: "Feedback salvo com sucesso!",
        description: "O usuário já consegue ver o retorno em 'Meus Vídeos'.",
      });

      setIsSaving(false);
      await loadAnalyses();
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro inesperado",
        description: "Não foi possível salvar o feedback.",
        variant: "destructive",
      });
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status: string | null | undefined) => {
    const s = (status || "Em análise").toLowerCase();

    if (s.includes("analisado") || s.includes("conclu")) {
      return (
        <Badge variant="secondary" className="flex items-center">
          <CheckCircle className="h-3 w-3 mr-1 text-success" />
          Analisado
        </Badge>
      );
    }

    if (s.includes("erro")) {
      return (
        <Badge variant="destructive" className="flex items-center">
          <XCircle className="h-3 w-3 mr-1" />
          Erro
        </Badge>
      );
    }

    return (
      <Badge variant="outline" className="flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        Em análise
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gradient-primary">
                Painel Operacional
              </h1>
              <p className="text-sm text-muted-foreground">
                Aqui a operação vê todos os vídeos enviados e publica o feedback para os usuários.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de análises */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Fila de Vídeos</span>
                <Badge variant="outline">
                  {filteredAnalyses.length} vídeos
                </Badge>
              </CardTitle>
              <CardDescription>
                Veja quem enviou vídeos, o exercício e o status da análise.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative w-full md:w-1/2">
                  <Search className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por exercício ou ID do usuário..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => setStatusFilter(value)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Em análise">Em análise</SelectItem>
                      <SelectItem value="Analisado">Analisado</SelectItem>
                      <SelectItem value="Erro">Erro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="py-10 text-center text-muted-foreground">
                  Carregando vídeos enviados...
                </div>
              ) : filteredAnalyses.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">
                  Nenhum vídeo encontrado.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAnalyses.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setSelected(a)}
                      className={`w-full text-left p-4 rounded-lg border transition hover:border-primary/60 hover:bg-card/60 ${
                        selected?.id === a.id
                          ? "border-primary bg-card/80"
                          : "border-border/60 bg-card/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <VideoIcon className="h-4 w-4 text-primary" />
                            <span className="font-medium">
                              {a.exercise_name || "Exercício não informado"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {a.user_id}
                            </span>
                            {a.created_at && (
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(a.created_at).toLocaleString("pt-BR")}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center">
                          {getStatusBadge(a.execution_status)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detalhe / Edição */}
        <div className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle>Detalhes do Vídeo</CardTitle>
              <CardDescription>
                Selecione um vídeo na lista para ver e editar o feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selected ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum vídeo selecionado. Clique em um item da lista ao lado.
                </p>
              ) : (
                <>
                  {selected.video_url ? (
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <video
                        src={selected.video_url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
                      Vídeo sem URL cadastrada.
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{selected.exercise_name}</span>
                      {getStatusBadge(selected.execution_status)}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Usuário: {selected.user_id}
                    </div>
                    {selected.created_at && (
                      <div className="text-muted-foreground text-xs">
                        Enviado em{" "}
                        {new Date(selected.created_at).toLocaleString("pt-BR")}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Status da Execução
                    </label>
                    <Select
                      value={selected.execution_status || "Em análise"}
                      onValueChange={(value) =>
                        setSelected((prev) =>
                          prev
                            ? { ...prev, execution_status: value }
                            : prev
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Em análise">Em análise</SelectItem>
                        <SelectItem value="Analisado">Analisado</SelectItem>
                        <SelectItem value="Erro no processamento">Erro no processamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Feedback para o usuário
                    </label>
                    <Textarea
                      value={selected.feedback_text || ""}
                      onChange={(e) =>
                        setSelected((prev) =>
                          prev ? { ...prev, feedback_text: e.target.value } : prev
                        )
                      }
                      placeholder="Descreva os erros/acertos da execução, orientações de ajuste, etc."
                      className="min-h-[140px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Esse texto é exatamente o que vai aparecer para o usuário na tela de histórico.
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? "Salvando..." : "Salvar feedback"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OperationPanel;
