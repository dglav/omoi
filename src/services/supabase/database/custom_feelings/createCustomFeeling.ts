import { supabase } from "../..";
import { SupabaseDatabaseError } from "../../error";

type Params = {
  userId: string;
  name: string;
  emotionLevel: string;
};

export const createCustomFeeling = async (
  // eslint-disable-next-line prettier/prettier
  { userId, name, emotionLevel }: Params,
) => {
  const { data, error } = await supabase
    .from("custom_feelings")
    .insert({ user_id: userId, name, emotion_level: emotionLevel })
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
