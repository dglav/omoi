import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

import { useGetUser } from "./useGetUser";
import { updateUser } from "../../services/supabase/database/user/updateUser";

type UpdateUserParams = {
  nickname?: string;
  birthday?: string;
  expoPushToken?: string;
};

type UseUpdateUserParams = {
  onSuccess?: () => void;
};

export const useUpdateUser = ({ onSuccess }: UseUpdateUserParams) => {
  const queryClient = useQueryClient();

  const { user } = useGetUser();
  const userId = user?.id;

  const mutation = useMutation({
    mutationFn: ({
      updatedUser: { birthday, nickname, expoPushToken },
    }: {
      updatedUser: UpdateUserParams;
    }) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }

      const payload: Parameters<typeof updateUser>[1] = {
        birthday,
        nickname,
        expo_push_token: expoPushToken,
      };

      Alert.alert(`updateUserPayload`, JSON.stringify(payload));

      return updateUser(userId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: () => {
      Alert.alert("post failed");
    },
  });

  return mutation;
};
