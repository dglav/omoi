import { EmotionLevel, toUpdateDTO } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

export const updateCustomFeeling = async (feeling: {
  id: string;
  name: string;
  emotionLevel: EmotionLevel;
}) => {
  const { data: customFeelings, error } = await supabase
    .from("custom_feelings")
    .update(toUpdateDTO(feeling))
    .eq("id", feeling.id)
    .select();

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return customFeelings[0];
};
