import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateReminder } from "../../services/supabase/database/reminders/updateReminder";

type mutationParams = {
  id: string;
  hour: number;
  minute: number;
};

export const useUpdateReminder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: mutationParams) => {
      return updateReminder(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reminders"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};
