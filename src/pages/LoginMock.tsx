import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, ArrowLeft } from "lucide-react";
import { mockUserData } from "@/mocks/userData";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido").trim(),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginMock = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // Verificar credenciais mockadas
      if (data.email === mockUserData.auth.email && data.password === mockUserData.auth.password) {
        // Salvar dados mockados no localStorage para simular sessão
        localStorage.setItem('mockUser', JSON.stringify(mockUserData));
        localStorage.setItem('mockSession', 'true');

        toast({
          title: "Login realizado com sucesso! (MODO MOCK)",
          description: "Redirecionando para o dashboard...",
        });
        
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: "E-mail ou senha incorretos. Use: " + mockUserData.auth.email,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
        <div className="bg-card rounded-2xl shadow-elegant p-8 border border-border/50">
          {/* Badge de Modo Mock */}
          <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
            <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium text-center">
              🧪 MODO MOCK ATIVO - Dados de Teste
            </p>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo de volta</h1>
            <p className="text-muted-foreground">Entre para continuar sua jornada fitness</p>
          </div>

          {/* Credenciais de Teste */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Credenciais de Teste:
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Email: {mockUserData.auth.email}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Senha: {mockUserData.auth.password}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar (Mock)"
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Modo de desenvolvimento com dados mockados
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginMock;
