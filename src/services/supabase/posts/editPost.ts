import { SupabaseDatabaseError } from "../error";
import { supabase } from "../index";

type Props = {
  id: string;
  authorId: string;
  condition: "average" | "reallyBad" | "bad" | "good" | "reallyGood";
  feelings: string[];
  tags: string[];
  note: string;
  date: Date;
};

export const editPost = async ({
  id,
  authorId,
  condition,
  feelings,
  tags,
  note,
  date,
}: Props) => {
  const { data, error } = await supabase.rpc("edit_post", {
    author_id: authorId,
    condition,
    date: date.toISOString(),
    feelings,
    id,
    note,
    tags,
  });
  if (error) console.error(error);
  else console.log(data);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return data;
};
