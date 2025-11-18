// Configuração para habilitar/desabilitar modo mock
export const MOCK_CONFIG = {
  // Habilitar modo mock (true = usar dados mockados, false = usar Supabase real)
  enabled: false,
  
  // Configurações específicas de mock
  loginDelay: 500, // ms
  dataFetchDelay: 300, // ms
  
  // Logs de debug
  debug: true,
};

// Função auxiliar para verificar se o modo mock está ativo
export const isMockEnabled = () => MOCK_CONFIG.enabled;

// Função para logar mensagens de debug do modo mock
export const mockLog = (message: string, data?: any) => {
  if (MOCK_CONFIG.debug && MOCK_CONFIG.enabled) {
    console.log(`[MOCK MODE] ${message}`, data || '');
  }
};
