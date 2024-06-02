import { Database, Tables } from "../../../../../types/supabase";

export type Post = {
  id: string;
  postGroupId: string;
  authorId: string;
  condition: "reallyBad" | "bad" | "average" | "good" | "reallyGood";
  feelings: string[];
  tags: string[];
  note: string;
  date: Date;
  createdAt: string;
  isPrivate: boolean;
};

type TableName = "posts";
type Entity = Tables<TableName>;
type CreateDTO = Database["public"]["Functions"]["create_new_post_v2"]["Args"];
type UpdateDTO = Database["public"]["Functions"]["edit_post_v2"]["Args"];

export const fromSupabase = ({
  author_id,
  condition,
  created_at,
  date,
  feelings,
  id,
  is_private,
  note,
  post_group_id,
  tags,
}: Entity): Post => ({
  authorId: author_id,
  condition,
  createdAt: created_at,
  date: new Date(date),
  feelings,
  id,
  isPrivate: is_private,
  note,
  postGroupId: post_group_id,
  tags,
});

export const toCreateSupabaseDTO = ({
  authorId,
  condition,
  feelings,
  tags,
  note,
  isPrivate,
  date,
}: {
  authorId: string;
  condition: "reallyBad" | "bad" | "average" | "good" | "reallyGood";
  feelings: string[];
  tags: string[];
  note: string;
  date: Date;
  isPrivate: boolean;
}): CreateDTO => ({
  author_id: authorId,
  condition,
  feelings,
  tags,
  note,
  is_private: isPrivate,
  date: date.toISOString(),
});

export const toUpdateDTO = ({
  id,
  authorId,
  condition,
  feelings,
  tags,
  note,
  date,
  isPrivate,
}: {
  id: string;
  authorId: string;
  condition: "reallyBad" | "bad" | "average" | "good" | "reallyGood";
  feelings: string[];
  tags: string[];
  note: string;
  date: Date;
  isPrivate: boolean;
}): UpdateDTO => ({
  id,
  author_id: authorId,
  condition,
  feelings,
  tags,
  note,
  date: date.toISOString(),
  is_private: isPrivate,
});
