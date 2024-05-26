import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { createCustomFeeling } from "../../services/supabase/database/custom_feelings/createCustomFeeling";

type mutationParams = {
  name: string;
  emotionLevel: string;
};

export const useCreateCustomFeeling = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const userId = session?.user.id;

  const mutation = useMutation({
    mutationFn: ({ name, emotionLevel }: mutationParams) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      return createCustomFeeling({ userId, name, emotionLevel });
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
