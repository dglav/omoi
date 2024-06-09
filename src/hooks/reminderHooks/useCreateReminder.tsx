import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReminder } from "../../services/supabase/database/reminders/createReminder";

type mutationParams = {
  hour: number;
  minute: number;
};

export const useCreateReminder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: mutationParams) => {
      return createReminder(params);
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
