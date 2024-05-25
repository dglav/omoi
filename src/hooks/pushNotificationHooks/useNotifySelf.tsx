import { useMutation } from "@tanstack/react-query";

import { push as supabasePush } from "../../services/supabase/functions/api/push";

type mutationParams = {
  title: string;
  body: string;
};

export const useNotifySelf = () => {
  const mutation = useMutation({
    mutationFn: async (params: mutationParams) => {
      const { data, error } = await supabasePush(params);

      if (error) {
        throw new Error(error);
      }

      return data;
    },
    onSuccess: (data) => {
      console.log("success!", { data });
    },
    onError: (error): void => {
      console.error("error", error);
    },
  });

  return mutation;
};
