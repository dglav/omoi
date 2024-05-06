export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      post_groups: {
        Row: {
          author_id: string;
          created_at: string;
          date: string;
          id: string;
        };
        Insert: {
          author_id: string;
          created_at?: string;
          date: string;
          id?: string;
        };
        Update: {
          author_id?: string;
          created_at?: string;
          date?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_post_groups_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          author_id: string;
          condition: Database["public"]["Enums"]["condition"];
          created_at: string;
          date: string;
          feelings: string[];
          id: string;
          note: string;
          post_group_id: string;
          tags: string[];
        };
        Insert: {
          author_id: string;
          condition: Database["public"]["Enums"]["condition"];
          created_at?: string;
          date: string;
          feelings: string[];
          id?: string;
          note: string;
          post_group_id: string;
          tags: string[];
        };
        Update: {
          author_id?: string;
          condition?: Database["public"]["Enums"]["condition"];
          created_at?: string;
          date?: string;
          feelings?: string[];
          id?: string;
          note?: string;
          post_group_id?: string;
          tags?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "public_posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_posts_post_group_id_fkey";
            columns: ["post_group_id"];
            isOneToOne: false;
            referencedRelation: "post_groups";
            referencedColumns: ["id"];
          },
        ];
      };
      survey_1: {
        Row: {
          conversation_amount: string;
          conversation_obstacle: string;
          id: number;
          partner_expression: string;
          relationship_length: string;
          relationship_status: string;
          self_expression: string;
          user_id: string;
        };
        Insert: {
          conversation_amount: string;
          conversation_obstacle: string;
          id?: never;
          partner_expression: string;
          relationship_length: string;
          relationship_status: string;
          self_expression: string;
          user_id: string;
        };
        Update: {
          conversation_amount?: string;
          conversation_obstacle?: string;
          id?: never;
          partner_expression?: string;
          relationship_length?: string;
          relationship_status?: string;
          self_expression?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_survey_1_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          birthday: string | null;
          id: string;
          nickname: string | null;
        };
        Insert: {
          birthday?: string | null;
          id?: string;
          nickname?: string | null;
        };
        Update: {
          birthday?: string | null;
          id?: string;
          nickname?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_new_post: {
        Args: {
          author_id: string;
          note: string;
          condition: Database["public"]["Enums"]["condition"];
          feelings: string[];
          tags: string[];
          date: string;
        };
        Returns: {
          author_id: string;
          condition: Database["public"]["Enums"]["condition"];
          created_at: string;
          date: string;
          feelings: string[];
          id: string;
          note: string;
          post_group_id: string;
          tags: string[];
        }[];
      };
      edit_post: {
        Args: {
          id: string;
          author_id: string;
          note: string;
          condition: Database["public"]["Enums"]["condition"];
          feelings: string[];
          tags: string[];
          date: string;
        };
        Returns: {
          author_id: string;
          condition: Database["public"]["Enums"]["condition"];
          created_at: string;
          date: string;
          feelings: string[];
          id: string;
          note: string;
          post_group_id: string;
          tags: string[];
        }[];
      };
    };
    Enums: {
      condition: "reallyBad" | "bad" | "average" | "good" | "reallyGood";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
