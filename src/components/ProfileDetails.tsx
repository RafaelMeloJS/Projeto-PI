import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Calendar, Phone, MapPin, User, Mail } from "lucide-react";

// Definição do Schema de Validação
const profileDetailsSchema = z.object({
  birthDate: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

type ProfileDetailsForm = z.infer<typeof profileDetailsSchema>;

const ProfileDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [idPessoa, setIdPessoa] = useState<number | null>(null);
  const [idLogradouro, setIdLogradouro] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileDetailsForm>({
    resolver: zodResolver(profileDetailsSchema),
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. Buscar id_usuario e id_pessoa
        const { data: usuarioData, error: usuarioError } = await supabase
          .from("project.dim_usuario")
          .select("id_usuario, id_pessoa")
          .eq("user_uid", user.id)
          .single();

        if (usuarioError || !usuarioData) {
          console.error("Erro ao buscar dim_usuario:", usuarioError);
          return;
        }

        setIdUsuario(usuarioData.id_usuario);
        setIdPessoa(usuarioData.id_pessoa);

        // 2. Buscar dados da dim_pessoa
        const { data: pessoaData, error: pessoaError } = await supabase
          .from("project.dim_pessoa")
          .select("dt_nascimento, num_telefone")
          .eq("id_pessoa", usuarioData.id_pessoa)
          .single();

        // 3. Buscar dados de logradouro (se existir)
        const { data: logradouroData, error: logradouroError } = await supabase
          .from("project.dim_logradouro")
          .select("id_logradouro, des_logradouro, num_cep, des_cidade, des_estado, des_pais")
          .eq("id_pessoa", usuarioData.id_pessoa)
          .maybeSingle();

        if (logradouroError) console.error("Erro ao buscar dim_logradouro:", logradouroError);

        if (logradouroData) {
          setIdLogradouro(logradouroData.id_logradouro);
        }

        // Preencher o formulário
        reset({
          birthDate: pessoaData?.dt_nascimento || "",
          phone: pessoaData?.num_telefone || "",
          address: logradouroData?.des_logradouro || "",
          zipCode: logradouroData?.num_cep || "",
          city: logradouroData?.des_cidade || "",
          state: logradouroData?.des_estado || "",
          country: logradouroData?.des_pais || "",
        });

      } catch (error) {
        console.error("Erro geral ao carregar dados:", error);
        toast({
          variant: "destructive",
          title: "Erro de carregamento",
          description: "Não foi possível carregar seus dados de perfil.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [reset]);

  const onSubmit = async (data: ProfileDetailsForm) => {
    setIsSaving(true);
    try {
      if (!idPessoa) throw new Error("ID da Pessoa não encontrado.");

      // 1. Atualizar dim_pessoa
      const { error: pessoaError } = await supabase
        .from("project.dim_pessoa")
        .update({
          dt_nascimento: data.birthDate || null,
          num_telefone: data.phone || null,
        })
        .eq("id_pessoa", idPessoa);

      if (pessoaError) throw pessoaError;

      // 2. Inserir/Atualizar dim_logradouro
      const logradouroPayload = {
        des_logradouro: data.address || null,
        num_cep: data.zipCode || null,
        des_cidade: data.city || null,
        des_estado: data.state || null,
        des_pais: data.country || null,
        des_tipo_endereco: "Residencial", // Valor padrão
        id_pessoa: idPessoa,
      };

      if (idLogradouro) {
        // Atualizar
        const { error: logradouroError } = await supabase
          .from("project.dim_logradouro")
          .update(logradouroPayload)
          .eq("id_logradouro", idLogradouro);
        
        if (logradouroError) throw logradouroError;
      } else {
        // Inserir
        const { data: newLogradouro, error: logradouroError } = await supabase
          .from("project.dim_logradouro")
          .insert(logradouroPayload)
          .select("id_logradouro")
          .single();

        if (logradouroError) throw logradouroError;
        setIdLogradouro(newLogradouro.id_logradouro);
      }

      toast({
        title: "Sucesso!",
        description: "Detalhes do perfil atualizados com sucesso.",
      });

    } catch (error) {
      console.error("Erro ao salvar detalhes do perfil:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível atualizar os detalhes do seu perfil.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <p>Carregando detalhes do perfil...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Detalhes Pessoais e Endereço
        </CardTitle>
        <CardDescription>Complete seu perfil para um acompanhamento mais preciso.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Data de Nascimento */}
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Data de Nascimento
              </Label>
              <Input
                id="birthDate"
                type="date"
                {...register("birthDate")}
              />
              {errors.birthDate && (
                <p className="text-sm text-destructive">{errors.birthDate.message}</p>
              )}
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(99) 99999-9999"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-6 space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Endereço */}
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Logradouro (Rua, Av., etc.)
                </Label>
                <Input
                  id="address"
                  placeholder="Rua Exemplo, 123"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address.message}</p>
                )}
              </div>

              {/* CEP */}
              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  placeholder="99999-999"
                  {...register("zipCode")}
                />
                {errors.zipCode && (
                  <p className="text-sm text-destructive">{errors.zipCode.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cidade */}
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  placeholder="São Paulo"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>

              {/* Estado */}
              <div className="space-y-2">
                <Label htmlFor="state">Estado (UF)</Label>
                <Input
                  id="state"
                  placeholder="SP"
                  maxLength={2}
                  {...register("state")}
                />
                {errors.state && (
                  <p className="text-sm text-destructive">{errors.state.message}</p>
                )}
              </div>

              {/* País */}
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  placeholder="Brasil"
                  {...register("country")}
                />
                {errors.country && (
                  <p className="text-sm text-destructive">{errors.country.message}</p>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar Detalhes do Perfil"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
