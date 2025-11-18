-- Migration para adicionar novos campos de perfil na tabela dim_pessoa
-- Campos: gênero, estado civil, nacionalidade, peso e percentual de gordura

-- Adicionar novos campos na tabela project.dim_pessoa
ALTER TABLE project.dim_pessoa
ADD COLUMN IF NOT EXISTS des_genero TEXT,
ADD COLUMN IF NOT EXISTS des_estado_civil TEXT,
ADD COLUMN IF NOT EXISTS des_nacionalidade TEXT,
ADD COLUMN IF NOT EXISTS num_peso DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS num_percentual_gordura DECIMAL(4,2);

-- Adicionar comentários nas colunas para documentação
COMMENT ON COLUMN project.dim_pessoa.des_genero IS 'Gênero da pessoa (ex: Masculino, Feminino, Outro)';
COMMENT ON COLUMN project.dim_pessoa.des_estado_civil IS 'Estado civil da pessoa (ex: Solteiro, Casado, Divorciado)';
COMMENT ON COLUMN project.dim_pessoa.des_nacionalidade IS 'Nacionalidade da pessoa (ex: Brasileiro, Americano)';
COMMENT ON COLUMN project.dim_pessoa.num_peso IS 'Peso da pessoa em quilogramas (kg)';
COMMENT ON COLUMN project.dim_pessoa.num_percentual_gordura IS 'Percentual de gordura corporal da pessoa';
