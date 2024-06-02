import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "../../../../../types/supabase";

type CustomFeelingEntity = Tables<"custom_feelings">;
type CreateDTO = TablesInsert<"custom_feelings">;
type DatabaseUpdateDTO = TablesUpdate<"custom_feelings">;

export type EmotionLevel =
  | "very positive"
  | "positive"
  | "average"
  | "negative"
  | "very negative";

export const fromSupabase = (
  feeling: CustomFeelingEntity,
): {
  id: string;
  name: string;
  emotionLevel: EmotionLevel;
} => ({
  id: feeling.id,
  name: feeling.name,
  emotionLevel: feeling.emotion_level,
});

export const toCreateDTO = (feeling: {
  name: string;
  emotionLevel: EmotionLevel;
}): CreateDTO => ({
  name: feeling.name,
  emotion_level: feeling.emotionLevel,
});

export const toUpdateDTO = (feeling: {
  name: string;
  emotionLevel: EmotionLevel;
}): DatabaseUpdateDTO => ({
  name: feeling.name,
  emotion_level: feeling.emotionLevel,
});
