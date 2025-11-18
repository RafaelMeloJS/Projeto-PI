import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Mail, Lock, Chrome, Apple, Upload, ExternalLink, ArrowLeft } from "lucide-react";

const signupSchema = z.object({
  fullName: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").trim(),
  email: z.string().email("E-mail inválido").trim(),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  trainingHistory: z.string().optional(),
  preferences: z.string().optional(),
  bioimpedanceUrl: z.string().url("URL inválida").optional().or(z.literal("")),
});

type SignupForm = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const watchedFields = watch();

  useEffect(() => {
    const fields = [
      watchedFields.fullName,
      watchedFields.email,
      watchedFields.password,
      watchedFields.trainingHistory,
      watchedFields.preferences,
      watchedFields.bioimpedanceUrl,
    ];

    const filledFields = fields.filter((field) => field && field.length > 0).length;
    const totalFields = fields.length;
    const calculatedProgress = (filledFields / totalFields) * 100;
    
    setProgress(calculatedProgress);
  }, [watchedFields]);

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      const { error: signUpError, data: authData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          toast({
            variant: "destructive",
            title: "E-mail já cadastrado",
            description: "Este e-mail já está em uso. Faça login ou use outro e-mail.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Erro ao criar conta",
            description: signUpError.message,
          });
        }
        return;
      }

      if (authData.user) {
        const user_id = authData.user.id;
        const current_timestamp = new Date().toISOString();

        // 1. Inserir na dim_pessoa
        const { data: pessoaData, error: pessoaError } = await supabase
          .from("public.dim_pessoa")
          .insert({
            des_nome: data.fullName,
            des_email: data.email,
            flg_tipo_pessoa: 'F',
          })
          .select("id_pessoa")
          .single();

        if (pessoaError) {
          console.error("Error inserting into dim_pessoa:", pessoaError);
          toast({ variant: "destructive", title: "Erro ao criar perfil", description: pessoaError.message });
          return;
        }

        // 2. Inserir na dim_usuario
        const { error: usuarioError } = await supabase
          .from("public.dim_usuario")
          .insert({
            des_login: data.email,
            id_pessoa: pessoaData.id_pessoa,
            user_uid: user_id,
          });

        if (usuarioError) {
          console.error("Error inserting into dim_usuario:", usuarioError);
          toast({ variant: "destructive", title: "Erro ao criar usuário", description: usuarioError.message });
          return;
        }

        // 3. Inserir na dim_cliente
        const { error: clienteError } = await supabase.from("public.dim_cliente").insert({
          id_pessoa: pessoaData.id_pessoa,
          flg_atleta: 'T',
        });

        if (clienteError) {
          console.error("Error inserting into dim_cliente:", clienteError);
          toast({ variant: "destructive", title: "Erro ao criar cliente", description: clienteError.message });
          return;
        }

        // 4. Inserir na public.profiles
        const { error: profileError } = await supabase.from("public.profiles").insert({
          id: user_id,
          full_name: data.fullName,
          subscription_tier: 'free',
          created_at: current_timestamp,
        });

        if (profileError) {
          console.error("Error inserting into public.profiles:", profileError);
          toast({ variant: "destructive", title: "Erro ao inicializar plano", description: profileError.message });
          return;
        }
      }

      toast({
        title: "Conta criada com sucesso!",
        description: "Você está sendo redirecionado para o dashboard...",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro ao criar sua conta. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao cadastrar com Google",
          description: error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro ao cadastrar com Google.",
      });
    }
  };

  const handleAppleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao cadastrar com Apple",
          description: error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro ao cadastrar com Apple.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
        <div className="bg-card rounded-2xl shadow-elegant p-8 border border-border/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Crie sua conta</h1>
            <p className="text-muted-foreground">
              Comece sua jornada para exercícios perfeitos
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progresso do cadastro</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Nome Completo <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="Seu nome completo"
                    className="pl-10"
                    {...register("fullName")}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  E-mail <span className="text-destructive">*</span>
                </Label>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Senha <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className="pl-10"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Informações Opcionais
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="trainingHistory">Histórico de Treino</Label>
                  <Textarea
                    id="trainingHistory"
                    placeholder="Conte-nos sobre sua experiência com musculação..."
                    rows={3}
                    {...register("trainingHistory")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferences">Preferências</Label>
                  <Textarea
                    id="preferences"
                    placeholder="Quais são seus objetivos? (ex: hipertrofia, força, etc.)"
                    rows={3}
                    {...register("preferences")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bioimpedanceUrl">Link da Bioimpedância</Label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="bioimpedanceUrl"
                      placeholder="https://exemplo.com/bioimpedancia"
                      className="pl-10"
                      {...register("bioimpedanceUrl")}
                    />
                  </div>
                  {errors.bioimpedanceUrl && (
                    <p className="text-sm text-destructive">{errors.bioimpedanceUrl.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar Conta"
              )}
            </Button>
          </form>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignup}
              className="w-full"
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleAppleSignup}
              className="w-full"
            >
              <Apple className="mr-2 h-4 w-4" />
              Apple
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
