import { Database, Tables } from "../../../../../types/supabase";
import { feelingMap } from "../../../../utils/feelingMap";
import { Feeling } from "../custom_feelings/converter";

export type Post = {
  id: string;
  postGroupId: string;
  authorId: string;
  condition: "reallyBad" | "bad" | "average" | "good" | "reallyGood";
  feelings: Feeling[];
  tags: string[];
  note: string;
  date: Date;
  createdAt: Date;
  isPrivate: boolean;
};

type TableName = "posts";
type Entity = Tables<TableName>;
type CreateDTO = Database["public"]["Functions"]["create_new_post_v2"]["Args"];
type UpdateDTO = Database["public"]["Functions"]["edit_post_v2"]["Args"];

export const fromSupabase = (
  {
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
  }: Entity,
  allCustomFeelingsMap: Map<string, Feeling>,
): Post => {
  const convertedFeelings = feelings
    .map((feeling) => {
      const standardFeeling = feelingMap[feeling];

      if (!standardFeeling) {
        return allCustomFeelingsMap.get(feeling);
      }

      return standardFeeling;
    })
    .filter((feeling) => !!feeling) as Feeling[];

  return {
    authorId: author_id,
    condition,
    createdAt: new Date(created_at),
    date: new Date(date),
    feelings: convertedFeelings,
    id,
    isPrivate: is_private,
    note,
    postGroupId: post_group_id,
    tags,
  };
};

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
