# 🧪 Modo Mock - Guia de Uso

Este projeto agora possui um **modo mock** completo que permite testar todas as funcionalidades sem precisar de conexão com o banco de dados Supabase.

## 📋 O que foi implementado

### 1. Dados Mockados (`src/mocks/userData.ts`)
Arquivo contendo todos os dados de teste do usuário, incluindo:
- ✅ Credenciais de login (email e senha)
- ✅ Dados pessoais (nome, email, data de nascimento)
- ✅ **Novos campos adicionados:**
  - Estado civil
  - Nacionalidade
  - Gênero
  - Telefone
  - Peso (kg)
  - Percentual de gordura corporal (%)
- ✅ Dados de endereço completo
- ✅ Histórico de treino e preferências

### 2. Componentes Mock Criados

#### LoginMock (`src/pages/LoginMock.tsx`)
- Login com dados mockados
- Exibe credenciais de teste na tela
- Salva sessão no localStorage
- Indicador visual de "Modo Mock"

#### ProfileDetailsMock (`src/components/ProfileDetailsMock.tsx`)
- Formulário completo de perfil com todos os novos campos
- Carrega dados do localStorage
- Salva alterações no localStorage
- Indicador visual de "Modo Mock"

### 3. Componentes Reais Atualizados

#### ProfileDetails (`src/components/ProfileDetails.tsx`)
Atualizado para incluir os novos campos:
- ✅ Gênero
- ✅ Estado Civil
- ✅ Nacionalidade
- ✅ Peso (kg)
- ✅ % de Gordura Corporal

O componente foi organizado em seções:
1. **Dados Básicos**: Data de nascimento e telefone
2. **Informações Pessoais**: Gênero, estado civil e nacionalidade
3. **Dados de Saúde e Fitness**: Peso e percentual de gordura
4. **Endereço**: Logradouro, CEP, cidade, estado e país

### 4. Migration SQL (`supabase/migrations/20251118160000_add_profile_fields.sql`)
Script SQL para adicionar os novos campos na tabela `project.dim_pessoa`:
- `des_genero` (TEXT)
- `des_estado_civil` (TEXT)
- `des_nacionalidade` (TEXT)
- `num_peso` (DECIMAL 5,2)
- `num_percentual_gordura` (DECIMAL 4,2)

## 🚀 Como usar o Modo Mock

### Opção 1: Usar componentes Mock (Recomendado para testes)

1. **Para testar o Login Mock:**
   - Acesse a rota `/login-mock` (você precisará adicionar essa rota no seu router)
   - Use as credenciais exibidas na tela:
     - Email: `usuario.teste@exemplo.com`
     - Senha: `senha123`

2. **Para testar o Profile Mock:**
   - Substitua temporariamente o import em `src/pages/Profile.tsx`:
   ```tsx
   // Antes:
   import ProfileDetails from "@/components/ProfileDetails"
   
   // Depois:
   import ProfileDetails from "@/components/ProfileDetailsMock"
   ```

### Opção 2: Configuração Global (Para desenvolvimento)

1. Edite `src/config/mockConfig.ts`:
   ```typescript
   export const MOCK_CONFIG = {
     enabled: true, // Mude para true
     loginDelay: 500,
     dataFetchDelay: 300,
     debug: true,
   };
   ```

2. Adapte seus componentes para verificar `isMockEnabled()` antes de fazer chamadas ao Supabase.

## 📊 Dados de Teste Disponíveis

### Credenciais de Login
- **Email:** `usuario.teste@exemplo.com`
- **Senha:** `senha123`

### Dados Pessoais
- **Nome:** João da Silva Santos
- **Data de Nascimento:** 15/05/1990
- **Telefone:** (11) 98765-4321
- **Gênero:** Masculino
- **Estado Civil:** Solteiro
- **Nacionalidade:** Brasileiro

### Dados de Saúde
- **Peso:** 75.5 kg
- **% Gordura:** 18.5%
- **Altura:** 175 cm

### Endereço
- **Rua:** Rua das Flores, 123
- **CEP:** 01234-567
- **Cidade:** São Paulo
- **Estado:** SP
- **País:** Brasil

## 🔧 Aplicar Migration no Banco de Dados

Para adicionar os novos campos no banco de dados real (Supabase):

1. Execute a migration:
   ```bash
   supabase db push
   ```

Ou aplique manualmente o SQL no painel do Supabase:
```sql
ALTER TABLE project.dim_pessoa
ADD COLUMN IF NOT EXISTS des_genero TEXT,
ADD COLUMN IF NOT EXISTS des_estado_civil TEXT,
ADD COLUMN IF NOT EXISTS des_nacionalidade TEXT,
ADD COLUMN IF NOT EXISTS num_peso DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS num_percentual_gordura DECIMAL(4,2);
```

## 📝 Notas Importantes

1. **Persistência de Dados Mock:** Os dados mockados são salvos no `localStorage` do navegador. Para resetar, limpe o localStorage ou use as ferramentas de desenvolvedor.

2. **Indicadores Visuais:** Todos os componentes mock possuem badges amarelos indicando "MODO MOCK" para evitar confusão.

3. **Debug:** Com `debug: true` em `mockConfig.ts`, todas as operações mock são logadas no console.

4. **Produção:** Certifique-se de que `MOCK_CONFIG.enabled = false` antes de fazer deploy em produção.

## 🎯 Próximos Passos

1. Adicionar a rota `/login-mock` no seu router
2. Testar todos os novos campos no formulário
3. Aplicar a migration no banco de dados real
4. Testar a integração com o Supabase usando os componentes reais
5. Adicionar validações adicionais se necessário

## 🐛 Troubleshooting

**Problema:** Dados não aparecem no formulário mock
- **Solução:** Verifique se o localStorage está habilitado no navegador

**Problema:** Erro ao salvar dados
- **Solução:** Abra o console e verifique os logs de debug

**Problema:** Migration falha no Supabase
- **Solução:** Verifique se a tabela `project.dim_pessoa` existe e se você tem permissões adequadas

---

**Desenvolvido com ❤️ para facilitar o desenvolvimento e testes**
