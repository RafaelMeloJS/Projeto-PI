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



  return <>{children}</>;
};

export default OperationRoute;
