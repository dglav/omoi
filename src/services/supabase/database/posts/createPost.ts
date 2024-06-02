import { toCreateSupabaseDTO } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Props = {
  authorId: string;
  condition: "average" | "reallyBad" | "bad" | "good" | "reallyGood";
  feelings: string[];
  tags: string[];
  note: string;
  isPrivate: boolean;
  date: Date;
};

export const createPost = async (post: Props) => {
  const DTO = toCreateSupabaseDTO(post);

  const { error } = await supabase.rpc("create_new_post_v2", DTO);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }
};
