import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EmotionLevel } from "../../services/supabase/database/custom_feelings/converter";
import { updateCustomFeeling } from "../../services/supabase/database/custom_feelings/updateCustomFeeling";

type mutationParams = {
  id: string;
  name: string;
  emotionLevel: EmotionLevel;
};

export const useUpdateCustomFeeling = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, name, emotionLevel }: mutationParams) => {
      return updateCustomFeeling({ id, name, emotionLevel });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customFeelings"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};
