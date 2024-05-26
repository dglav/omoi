import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCustomFeeling } from "../../services/supabase/database/custom_feelings/createCustomFeeling";

type mutationParams = {
  name: string;
  emotionLevel: string;
};

export const useCreateCustomFeeling = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ name, emotionLevel }: mutationParams) => {
      return createCustomFeeling({ name, emotionLevel });
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
