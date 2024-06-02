import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "../../../../../types/supabase";

export type CustomTag = {
  id: string;
  name: string;
  category: string;
};
type Entity = Tables<"custom_tags">;
type CreateDTO = TablesInsert<"custom_tags">;
type UpdateDTO = TablesUpdate<"custom_tags">;

export const fromSupabase = (tag: Entity): CustomTag => ({
  id: tag.id,
  name: tag.name,
  category: tag.category,
});

export const toCreateSupabaseDTO = (tag: {
  name: string;
  category: string;
}): CreateDTO => ({
  name: tag.name,
  category: tag.category,
});

export const toUpdateSupabaseDTO = (tag: {
  name: string;
  category: string;
}): UpdateDTO => ({
  name: tag.name,
  category: tag.category,
});
