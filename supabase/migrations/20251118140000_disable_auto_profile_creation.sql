-- Desativa a trigger que cria automaticamente o perfil na tabela 'profiles'
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Remove a função que era usada para criar o perfil
DROP FUNCTION IF EXISTS public.handle_new_user;

-- Opcional: Remove a tabela profiles, pois ela será substituída por dim_pessoa e dim_cliente no schema 'project'
-- DROP TABLE IF EXISTS public.profiles;

-- Se a tabela profiles for mantida por enquanto, é importante remover as políticas de RLS para evitar conflitos
-- DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
-- DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
-- DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Para este projeto, vamos manter a tabela profiles por enquanto, mas garantir que a criação automática seja desativada.
-- A lógica de criação de dim_pessoa e dim_cliente será movida para o código da aplicação.
