import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

interface PremiumRouteProps {
  children: React.ReactNode;
}

const PremiumRoute = ({ children }: PremiumRouteProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkPremiumAccess = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          toast({
            title: "Acesso negado",
            description: "Você precisa estar logado para acessar esta página.",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        setUser(session.user);

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Erro",
            description: "Não foi possível verificar sua assinatura.",
            variant: "destructive",
          });
          navigate("/dashboard");
          return;
        }

        if (profile?.subscription_tier !== "premium") {
          toast({
            title: "Recurso Exclusivo Premium",
            description: "Este é um recurso exclusivo Premium. Faça upgrade para acessar!",
            variant: "destructive",
          });
          navigate("/#pricing");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error in premium check:", error);
        navigate("/dashboard");
      }
    };

    checkPremiumAccess();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PremiumRoute;
