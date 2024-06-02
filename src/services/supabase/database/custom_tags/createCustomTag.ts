import { CustomTag, toCreateSupabaseDTO } from "./converter";
import { supabase } from "../..";
import { SupabaseDatabaseError } from "../../error";

type Params = {
  name: string;
  category: string;
};

export const createCustomTag = async (
  // eslint-disable-next-line prettier/prettier
  tag: Params,
): Promise<CustomTag> => {
  const payload = toCreateSupabaseDTO(tag);

  const { data, error } = await supabase
    .from("custom_tags")
    .insert(payload)
    .select();

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  if (!data.length) {
    throw new Error("Error in retrieving custom_tag data");
  }

  const newTag = data[0];

  return {
    id: newTag.id,
    name: newTag.name,
    category: newTag.category,
  };
};
