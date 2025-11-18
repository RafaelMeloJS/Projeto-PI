export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          bioimpedance_url: string | null
          created_at: string | null
          full_name: string
          id: string
          preferences: string | null
          subscription_tier: string | null
          training_history: string | null
          updated_at: string | null
        }
        Insert: {
          bioimpedance_url?: string | null
          created_at?: string | null
          full_name: string
          id: string
          preferences?: string | null
          subscription_tier?: string | null
          training_history?: string | null
          updated_at?: string | null
        }
        Update: {
          bioimpedance_url?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          preferences?: string | null
          subscription_tier?: string | null
          training_history?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      // Outras tabelas do schema 'public' que você possa ter
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin" | "operacao" | "cliente"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  project: {
    Tables: {
      dim_pessoa: {
        Row: {
          id_pessoa: number
          des_nome: string
          des_nome_social: string | null
          dt_nascimento: string | null
          des_estado_civil: string | null
          des_email: string
          des_nacionalidade: string | null
          flg_tipo_pessoa: string
          num_telefone: string | null
          obs_pessoa: string | null
        }
        Insert: {
          des_nome: string
          des_nome_social?: string | null
          dt_nascimento?: string | null
          des_estado_civil?: string | null
          des_email: string
          des_nacionalidade?: string | null
          flg_tipo_pessoa: string
          num_telefone?: string | null
          obs_pessoa?: string | null
        }
        Update: {
          des_nome?: string
          des_nome_social?: string | null
          dt_nascimento?: string | null
          des_estado_civil?: string | null
          des_email?: string
          des_nacionalidade?: string | null
          flg_tipo_pessoa?: string
          num_telefone?: string | null
          obs_pessoa?: string | null
        }
        Relationships: []
      }
      dim_cliente: {
        Row: {
          id_cliente: number
          id_pessoa: number
          des_categoria: string | null
          id_esporte: number | null
          id_clube: number | null
          flg_atleta: string | null
          dt_inicio_contrato: string | null
          dt_fim_contrato: string | null
        }
        Insert: {
          id_pessoa: number
          des_categoria?: string | null
          id_esporte?: number | null
          id_clube?: number | null
          flg_atleta?: string | null
          dt_inicio_contrato?: string | null
          dt_fim_contrato?: string | null
        }
        Update: {
          id_pessoa?: number
          des_categoria?: string | null
          id_esporte?: number | null
          id_clube?: number | null
          flg_atleta?: string | null
          dt_inicio_contrato?: string | null
          dt_fim_contrato?: string | null
        }
        Relationships: []
      }
      // Adicionar outras tabelas do schema 'project' conforme necessário
      dim_plano: {
        Row: {
          id_plano: number
          des_plano: string
          vlr_plano: number
          des_detalhe: string | null
        }
        Insert: {
          des_plano: string
          vlr_plano: number
          des_detalhe?: string | null
        }
        Update: {
          des_plano?: string
          vlr_plano?: number
          des_detalhe?: string | null
        }
        Relationships: []
      }
      fato_venda: {
        Row: {
          id_venda: number
          qtd_pedido: number
          num_parcelas: string
          id_usuario: number
          id_plano: number
          id_tipo_pagamento: number
          id_forma_pagamento: number
          id_logradouro: number
          id_dim_venda: number
        }
        Insert: {
          qtd_pedido: number
          num_parcelas: string
          id_usuario: number
          id_plano: number
          id_tipo_pagamento: number
          id_forma_pagamento: number
          id_logradouro: number
          id_dim_venda: number
        }
        Update: {
          qtd_pedido?: number
          num_parcelas?: string
          id_usuario?: number
          id_plano?: number
          id_tipo_pagamento?: number
          id_forma_pagamento?: number
          id_logradouro?: number
          id_dim_venda?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "operacao", "cliente"],
    },
  },
} as const
