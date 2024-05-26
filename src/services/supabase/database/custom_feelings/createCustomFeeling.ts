import { EmotionLevel, toSupabase } from "./converter";
import { supabase } from "../..";
import { SupabaseDatabaseError } from "../../error";

type Params = {
  name: string;
  emotionLevel: EmotionLevel;
};

export const createCustomFeeling = async (
  // eslint-disable-next-line prettier/prettier
  feeling: Params,
) => {
  const payload = toSupabase(feeling);

  const { data, error } = await supabase
    .from("custom_feelings")
    .insert(payload)
    .select();

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  if (!data.length) {
    throw new Error("Error in retrieving custom_feelings data");
  }

  const newFeeling = data[0];

  return {
    id: newFeeling.id,
    name: newFeeling.name,
    emotionLevel: newFeeling.emotion_level,
  };
};
