import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

interface OperationRouteProps {
  children: React.ReactNode;
}

const OperationRoute = ({ children }: OperationRouteProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session?.user) {
          toast({
            title: "Sessão expirada",
            description: "Faça login para acessar o painel de operação.",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        setUser(session.user);

        const { data: roles, error: rolesError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id);

        if (rolesError) {
          console.error("Erro ao buscar roles:", rolesError);
          toast({
            title: "Erro de autorização",
            description: "Não foi possível validar seu acesso.",
            variant: "destructive",
          });
          navigate("/dashboard");
          return;
        }

        const hasOperationAccess = roles?.some(
          (r) => r.role === "operacao" || r.role === "admin"
        );

        if (!hasOperationAccess) {
          toast({
            title: "Acesso restrito",
            description: "Somente a equipe operacional pode acessar esta área.",
            variant: "destructive",
          });
          navigate("/dashboard");
          return;
        }

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        toast({
          title: "Erro inesperado",
          description: "Tente novamente em alguns instantes.",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    };

    checkAccess();
  }, [navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando permissão de operação...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default OperationRoute;
