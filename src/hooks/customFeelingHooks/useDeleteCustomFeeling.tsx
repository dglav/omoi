import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCustomFeeling } from "../../services/supabase/database/custom_feelings/deleteCustomFeeling";

type mutationParams = {
  id: string;
};

export const useDeleteCustomFeeling = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id }: mutationParams) => {
      return deleteCustomFeeling(id);
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
