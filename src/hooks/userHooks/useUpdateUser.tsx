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
    mutationFn: ({ updatedUser }: { updatedUser: UpdateUserParams }) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }

      const payload: Parameters<typeof updateUser>[1] = {};

      if (updatedUser.birthday) {
        payload["birthday"] = updatedUser.birthday;
      }

      if (updatedUser.nickname) {
        payload["nickname"] = updatedUser.nickname;
      }

      if (updatedUser.expoPushToken) {
        payload["partner_user_id"] = updatedUser.expoPushToken;
      }

      return updateUser(userId, updatedUser);
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
