import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCustomTag } from "../../services/supabase/database/custom_tags/createCustomTag";

type mutationParams = {
  name: string;
};

export const useCreateCustomTag = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ name }: mutationParams) => {
      return createCustomTag({ name, category: "other" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customTags"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};
