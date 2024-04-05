import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

import { updateUser } from "../../services/supabase/user/updateUser";

type UpdateUserParams = {
  nickname?: string;
  birthday?: string;
};

type UseUpdateUserParams = {
  onSuccess: () => void;
};

export const useUpdateUser = ({ onSuccess }: UseUpdateUserParams) => {
  const mutation = useMutation({
    mutationFn: ({
      userId,
      updatedUser,
    }: {
      userId: string;
      updatedUser: UpdateUserParams;
    }) => updateUser(userId, updatedUser),
    onSuccess: () => {
      Alert.alert("post success!");
      onSuccess();
    },
    onError: () => {
      Alert.alert("post failed");
    },
  });

  return mutation;
};
