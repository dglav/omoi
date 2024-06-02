import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCustomTag } from "../../services/supabase/database/custom_tags/deleteCustomTag";

type mutationParams = {
  id: string;
};

export const useDeleteCustomTag = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id }: mutationParams) => {
      return deleteCustomTag(id);
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
