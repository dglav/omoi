import { useGetCustomFeelings } from "../../../../../../hooks/customFeelingHooks/useGetCustomFeelings";
import { Feeling } from "../../../../../../services/supabase/database/custom_feelings/converter";
import { feelingMap } from "../../../../../../utils/feelingMap";

const feelingList: Feeling[] = Object.values(feelingMap);

export const useGetFeelingList = (): Feeling[] => {
  const { data: customFeelings } = useGetCustomFeelings();

  if (!customFeelings) {
    return feelingList;
  }
  return feelingList.concat(customFeelings);
};
