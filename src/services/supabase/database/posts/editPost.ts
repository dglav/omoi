import { toUpdateDTO } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Props = {
  id: string;
  authorId: string;
  condition: "average" | "reallyBad" | "bad" | "good" | "reallyGood";
  feelings: string[];
  tags: string[];
  note: string;
  date: Date;
  isPrivate: boolean;
};

export const editPost = async (postEdit: Props) => {
  const DTO = toUpdateDTO(postEdit);

  const { error } = await supabase.rpc("edit_post_v2", DTO);

  if (error) {
    console.error(error);
    throw new SupabaseDatabaseError(error);
  }
};
