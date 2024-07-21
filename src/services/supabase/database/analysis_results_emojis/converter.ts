import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "../../../../../types/supabase";

type Entity = Tables<"analysis_results_emojis">;
type CreateDTO = TablesInsert<"analysis_results_emojis">;
type DatabaseUpdateDTO = TablesUpdate<"analysis_results_emojis">;

export type AnalysisResultsEmoji = {
  authorId: string;
  createdAt: string;
  dateSpan: string;
  emoji: string;
  id: string;
  userId: string;
};

export const fromSupabase = (
  analysisResultsEmojis: Entity,
): AnalysisResultsEmoji => ({
  id: analysisResultsEmojis.id,
  createdAt: analysisResultsEmojis.created_at,
  dateSpan: analysisResultsEmojis.date_span,
  emoji: analysisResultsEmojis.emoji,
  userId: analysisResultsEmojis.user_id,
  authorId: analysisResultsEmojis.author_id,
});

export const toCreateDTO = (analysisResultEmoji: {
  dateSpan: string;
  userId: string;
  emoji: string;
}): CreateDTO => ({
  date_span: analysisResultEmoji.dateSpan,
  user_id: analysisResultEmoji.userId,
  emoji: analysisResultEmoji.emoji,
});

export const toUpdateDTO = (analysisResultEmoji: {
  dateSpan: string;
  userId: string;
  emoji: string;
}): DatabaseUpdateDTO => ({
  date_span: analysisResultEmoji.dateSpan,
  user_id: analysisResultEmoji.userId,
  emoji: analysisResultEmoji.emoji,
});
