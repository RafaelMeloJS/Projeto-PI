// Dados mockados do usuário para desenvolvimento
export const mockUserData = {
  // Dados de autenticação
  auth: {
    email: "usuario.teste@exemplo.com",
    password: "senha123",
    userId: "mock-user-id-123456",
  },

  // Dados pessoais básicos
  profile: {
    fullName: "João da Silva Santos",
    email: "usuario.teste@exemplo.com",
    subscriptionTier: "premium" as "premium" | "free",
    joinDate: "2024-01-15",
  },

  // Dados pessoais detalhados
  personalDetails: {
    birthDate: "1990-05-15",
    phone: "(11) 98765-4321",
    gender: "Masculino",
    maritalStatus: "Solteiro",
    nationality: "Brasileiro",
  },

  // Dados de endereço
  address: {
    street: "Rua das Flores, 123",
    zipCode: "01234-567",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
  },

  // Dados de saúde e fitness
  healthData: {
    weight: 75.5, // em kg
    bodyFatPercentage: 18.5, // em %
    height: 175, // em cm
    trainingHistory: "Pratico musculação há 3 anos, com foco em hipertrofia. Treino 5x por semana.",
    preferences: "Prefiro treinos intensos com foco em membros superiores. Gosto de usar pesos livres.",
    bioimpedanceUrl: "https://exemplo.com/bioimpedancia-joao.pdf",
  },

  // IDs do banco de dados (para referência)
  dbIds: {
    idPessoa: 1,
    idUsuario: 1,
    idCliente: 1,
    idLogradouro: 1,
  },
};

// Função para simular login mockado
export const mockLogin = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === mockUserData.auth.email && password === mockUserData.auth.password) {
        resolve({
          user: {
            id: mockUserData.auth.userId,
            email: mockUserData.auth.email,
          },
          session: {
            access_token: "mock-access-token",
            refresh_token: "mock-refresh-token",
          },
        });
      } else {
        reject(new Error("Invalid login credentials"));
      }
    }, 500);
  });
};

// Função para obter dados do perfil mockado
export const getMockProfile = async (userId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userId === mockUserData.auth.userId) {
        resolve({
          ...mockUserData.profile,
          ...mockUserData.personalDetails,
          ...mockUserData.address,
          ...mockUserData.healthData,
        });
      } else {
        resolve(null);
      }
    }, 300);
  });
};
