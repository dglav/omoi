import { toUpdateSupabaseDTO } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

export const updateCustomTag = async (tag: {
  id: string;
  name: string;
  category: string;
}) => {
  const { data: customTags, error } = await supabase
    .from("custom_tags")
    .update(toUpdateSupabaseDTO(tag))
    .eq("id", tag.id)
    .select();

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return customTags[0];
};
