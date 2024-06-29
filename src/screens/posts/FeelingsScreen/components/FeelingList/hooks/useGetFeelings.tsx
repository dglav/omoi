import { useGetCustomFeelings } from "../../../../../../hooks/customFeelingHooks/useGetCustomFeelings";
import { feelingMap } from "../../../../../../utils/feelingMap";
import { Feeling } from "../../../../../../services/supabase/database/custom_feelings/converter";

const feelingList: Feeling[] = Object.values(feelingMap);

export const useGetFeelingList = (): Feeling[] => {
  const { data: customFeelings } = useGetCustomFeelings();

  if (!customFeelings) {
    return feelingList;
  }
  return feelingList.concat(customFeelings);
};
