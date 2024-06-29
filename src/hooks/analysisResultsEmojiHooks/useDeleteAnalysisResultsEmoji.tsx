import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAnalysisResultsEmoji } from "../../services/supabase/database/analysis_results_emojis/deleteAnalysisResultsEmoji";

type mutationParams = {
  id: string;
};

export const useDeleteAnalysisResultsEmoji = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id }: mutationParams) => {
      return deleteAnalysisResultsEmoji(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["analysisResultsEmojis"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};
