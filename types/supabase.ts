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
      analysis_results_emojis: {
        Row: {
          author_id: string;
          created_at: string;
          date_span: string;
          emoji: string;
          id: string;
          user_id: string;
        };
        Insert: {
          author_id?: string;
          created_at?: string;
          date_span: string;
          emoji: string;
          id?: string;
          user_id: string;
        };
        Update: {
          author_id?: string;
          created_at?: string;
          date_span?: string;
          emoji?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "analysis_results_emojis_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "analysis_results_emojis_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      analysis_results_weekly_messages: {
        Row: {
          analyzed_user_id: string;
          author_id: string;
          created_at: string;
          end_date: string;
          id: string;
          message: string;
          start_date: string;
          updated_at: string;
        };
        Insert: {
          analyzed_user_id: string;
          author_id?: string;
          created_at?: string;
          end_date: string;
          id?: string;
          message: string;
          start_date: string;
          updated_at?: string;
        };
        Update: {
          analyzed_user_id?: string;
          author_id?: string;
          created_at?: string;
          end_date?: string;
          id?: string;
          message?: string;
          start_date?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      custom_feelings: {
        Row: {
          created_at: string;
          emotion_level: Database["public"]["Enums"]["feeling_emotion_level"];
          id: string;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          emotion_level: Database["public"]["Enums"]["feeling_emotion_level"];
          id?: string;
          name: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          emotion_level?: Database["public"]["Enums"]["feeling_emotion_level"];
          id?: string;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "custom_feelings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      custom_tags: {
        Row: {
          category: string;
          created_at: string;
          id: string;
          name: string;
          user_id: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          id?: string;
          name: string;
          user_id?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          id?: string;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "custom_tags_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      post_group_emojis: {
        Row: {
          created_at: string;
          emoji: string;
          post_group_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          emoji: string;
          post_group_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          emoji?: string;
          post_group_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_group_emojis_post_group_id_fkey";
            columns: ["post_group_id"];
            isOneToOne: false;
            referencedRelation: "post_groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_group_emojis_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      post_group_messages: {
        Row: {
          created_at: string;
          id: string;
          message: string;
          post_group_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          message: string;
          post_group_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          message?: string;
          post_group_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_group_chats_post_group_id_fkey";
            columns: ["post_group_id"];
            isOneToOne: false;
            referencedRelation: "post_groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_group_chats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
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
          is_private: boolean;
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
          is_private?: boolean;
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
          is_private?: boolean;
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
      reminders: {
        Row: {
          created_at: string;
          hour: number;
          id: string;
          minute: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          hour: number;
          id?: string;
          minute: number;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          hour?: number;
          id?: string;
          minute?: number;
          user_id?: string;
        };
        Relationships: [];
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
          expo_push_token: string | null;
          id: string;
          nickname: string | null;
          partner_user_id: string | null;
        };
        Insert: {
          birthday?: string | null;
          expo_push_token?: string | null;
          id?: string;
          nickname?: string | null;
          partner_user_id?: string | null;
        };
        Update: {
          birthday?: string | null;
          expo_push_token?: string | null;
          id?: string;
          nickname?: string | null;
          partner_user_id?: string | null;
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
          is_private: boolean;
          note: string;
          post_group_id: string;
          tags: string[];
        }[];
      };
      create_new_post_v2: {
        Args: {
          author_id: string;
          note: string;
          condition: Database["public"]["Enums"]["condition"];
          feelings: string[];
          tags: string[];
          is_private: boolean;
          date: string;
        };
        Returns: {
          author_id: string;
          condition: Database["public"]["Enums"]["condition"];
          created_at: string;
          date: string;
          feelings: string[];
          id: string;
          is_private: boolean;
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
          is_private: boolean;
          note: string;
          post_group_id: string;
          tags: string[];
        }[];
      };
      edit_post_v2: {
        Args: {
          id: string;
          author_id: string;
          note: string;
          condition: Database["public"]["Enums"]["condition"];
          feelings: string[];
          tags: string[];
          is_private: boolean;
          date: string;
        };
        Returns: {
          author_id: string;
          condition: Database["public"]["Enums"]["condition"];
          created_at: string;
          date: string;
          feelings: string[];
          id: string;
          is_private: boolean;
          note: string;
          post_group_id: string;
          tags: string[];
        }[];
      };
    };
    Enums: {
      condition: "reallyBad" | "bad" | "average" | "good" | "reallyGood";
      feeling_emotion_level:
        | "very positive"
        | "positive"
        | "average"
        | "negative"
        | "very negative";
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
    ? keyof (
      & Database[PublicTableNameOrOptions["schema"]]["Tables"]
      & Database[PublicTableNameOrOptions["schema"]]["Views"]
    )
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database } ? (
    & Database[PublicTableNameOrOptions["schema"]]["Tables"]
    & Database[PublicTableNameOrOptions["schema"]]["Views"]
  )[TableName] extends {
    Row: infer R;
  } ? R
  : never
  : PublicTableNameOrOptions extends keyof (
    & PublicSchema["Tables"]
    & PublicSchema["Views"]
  ) ? (
      & PublicSchema["Tables"]
      & PublicSchema["Views"]
    )[PublicTableNameOrOptions] extends {
      Row: infer R;
    } ? R
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
  } ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    } ? I
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
  } ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    } ? U
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
