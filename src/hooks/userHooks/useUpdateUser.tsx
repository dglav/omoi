import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

import { updateUser } from "../../services/supabase/database/user/updateUser";

type UpdateUserParams = {
  nickname?: string;
  birthday?: string;
};

type UseUpdateUserParams = {
  onSuccess: () => void;
};

export const useUpdateUser = ({ onSuccess }: UseUpdateUserParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      userId,
      updatedUser,
    }: {
      userId: string;
      updatedUser: UpdateUserParams;
    }) => updateUser(userId, updatedUser),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables.userId],
      });
      onSuccess();
    },
    onError: () => {
      Alert.alert("post failed");
    },
  });

  return mutation;
};
