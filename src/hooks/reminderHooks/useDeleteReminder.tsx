import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteReminder } from "../../services/supabase/database/reminders/deleteReminder";

type mutationParams = {
  id: string;
};

export const useDeleteReminder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id }: mutationParams) => {
      return deleteReminder(id);
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
