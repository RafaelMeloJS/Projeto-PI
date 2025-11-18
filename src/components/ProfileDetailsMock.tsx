import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Calendar, Phone, MapPin, User, Weight, Activity, Users, Globe } from "lucide-react";
import { mockUserData } from "@/mocks/userData";

// Definição do Schema de Validação
const profileDetailsSchema = z.object({
  birthDate: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  maritalStatus: z.string().optional(),
  nationality: z.string().optional(),
  weight: z.string().optional(),
  bodyFatPercentage: z.string().optional(),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

type ProfileDetailsForm = z.infer<typeof profileDetailsSchema>;

const ProfileDetailsMock = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 300));

      try {
        // Carregar dados mockados
        const storedData = localStorage.getItem('mockUser');
        const userData = storedData ? JSON.parse(storedData) : mockUserData;

        // Preencher o formulário com dados mockados
        reset({
          birthDate: userData.personalDetails.birthDate || "",
          phone: userData.personalDetails.phone || "",
          gender: userData.personalDetails.gender || "",
          maritalStatus: userData.personalDetails.maritalStatus || "",
          nationality: userData.personalDetails.nationality || "",
          weight: userData.healthData.weight?.toString() || "",
          bodyFatPercentage: userData.healthData.bodyFatPercentage?.toString() || "",
          address: userData.address.street || "",
          zipCode: userData.address.zipCode || "",
          city: userData.address.city || "",
          state: userData.address.state || "",
          country: userData.address.country || "",
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados mockados:", error);
        toast({
          variant: "destructive",
          title: "Erro de carregamento",
          description: "Não foi possível carregar seus dados de perfil.",
        });
        setIsLoading(false);
      }
    };

    loadData();
  }, [reset]);

  const onSubmit = async (data: ProfileDetailsForm) => {
    setIsSaving(true);
    
    // Simular delay de salvamento
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // Atualizar dados mockados no localStorage
      const storedData = localStorage.getItem('mockUser');
      const userData = storedData ? JSON.parse(storedData) : mockUserData;

      const updatedUserData = {
        ...userData,
        personalDetails: {
          birthDate: data.birthDate || "",
          phone: data.phone || "",
          gender: data.gender || "",
          maritalStatus: data.maritalStatus || "",
          nationality: data.nationality || "",
        },
        healthData: {
          ...userData.healthData,
          weight: data.weight ? parseFloat(data.weight) : 0,
          bodyFatPercentage: data.bodyFatPercentage ? parseFloat(data.bodyFatPercentage) : 0,
        },
        address: {
          street: data.address || "",
          zipCode: data.zipCode || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
        },
      };

      localStorage.setItem('mockUser', JSON.stringify(updatedUserData));

      toast({
        title: "Sucesso! (MODO MOCK)",
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
          <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded">
            MOCK
          </span>
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

          {/* Novos Campos Pessoais */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gênero */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Gênero
                </Label>
                <Input
                  id="gender"
                  placeholder="Ex: Masculino, Feminino"
                  {...register("gender")}
                />
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender.message}</p>
                )}
              </div>

              {/* Estado Civil */}
              <div className="space-y-2">
                <Label htmlFor="maritalStatus" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Estado Civil
                </Label>
                <Input
                  id="maritalStatus"
                  placeholder="Ex: Solteiro, Casado"
                  {...register("maritalStatus")}
                />
                {errors.maritalStatus && (
                  <p className="text-sm text-destructive">{errors.maritalStatus.message}</p>
                )}
              </div>

              {/* Nacionalidade */}
              <div className="space-y-2">
                <Label htmlFor="nationality" className="flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Nacionalidade
                </Label>
                <Input
                  id="nationality"
                  placeholder="Ex: Brasileiro"
                  {...register("nationality")}
                />
                {errors.nationality && (
                  <p className="text-sm text-destructive">{errors.nationality.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Dados de Saúde e Fitness */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Dados de Saúde e Fitness</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Peso */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center">
                  <Weight className="h-4 w-4 mr-2" />
                  Peso (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 75.5"
                  {...register("weight")}
                />
                {errors.weight && (
                  <p className="text-sm text-destructive">{errors.weight.message}</p>
                )}
              </div>

              {/* Percentual de Gordura */}
              <div className="space-y-2">
                <Label htmlFor="bodyFatPercentage" className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  % de Gordura Corporal
                </Label>
                <Input
                  id="bodyFatPercentage"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 18.5"
                  {...register("bodyFatPercentage")}
                />
                {errors.bodyFatPercentage && (
                  <p className="text-sm text-destructive">{errors.bodyFatPercentage.message}</p>
                )}
              </div>
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
              "Salvar Detalhes do Perfil (Mock)"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsMock;
