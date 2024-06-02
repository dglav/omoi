import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCustomTag } from "../../services/supabase/database/custom_tags/updateCustomTag";

type mutationParams = {
  id: string;
  name: string;
};

export const useUpdateCustomTag = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, name }: mutationParams) => {
      return updateCustomTag({ id, name, category: "other" });
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
