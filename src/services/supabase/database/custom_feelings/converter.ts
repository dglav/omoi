import { Database } from "../../../../../types/supabase";

type DatabaseRowType = Database["public"]["Tables"]["custom_feelings"]["Row"];
type DatabaseInsertType =
  Database["public"]["Tables"]["custom_feelings"]["Insert"];

export const fromSupabase = (
  feeling: DatabaseRowType,
): {
  id: string;
  name: string;
  emotionLevel: string;
} => ({
  id: feeling.id,
  name: feeling.name,
  emotionLevel: feeling.emotion_level,
});

export const toSupabase = (feeling: {
  name: string;
  emotionLevel: string;
}): DatabaseInsertType => ({
  name: feeling.name,
  emotion_level: feeling.emotionLevel,
});
