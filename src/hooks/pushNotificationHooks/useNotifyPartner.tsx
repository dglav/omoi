import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

import { pushToPartner } from "../../services/supabase/functions/api/pushToPartner";

type mutationParams = {
  title: string;
  body: string;
};

export const useNotifyPartner = () => {
  const mutation = useMutation({
    mutationFn: async (params: mutationParams) => {
      const { data, error } = await pushToPartner(params);

      if (error) {
        throw new Error(error);
      }

      return data;
    },
    onSuccess: (data) => {
      console.log("success!", { data });
    },
    onError: (error): void => {
      console.error(error);
      Alert.alert(error.message);
    },
  });

  return mutation;
};
