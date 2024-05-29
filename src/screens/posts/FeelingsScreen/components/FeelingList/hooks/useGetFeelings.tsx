import { useEffect, useState } from "react";

import { useGetCustomFeelings } from "../../../../../../hooks/customFeelingHooks/useGetCustomFeelings";
import {
  emotionLevelColorMap,
  feelingMap,
} from "../../../../../../utils/feelingMap";

const feelingList = Object.entries(feelingMap);

export const useGetFeelingList = () => {
  const [convertedCustomFeelings, setConvertedCustomFeelings] = useState<
    [string, { text: string; fillColor: string }][]
  >([]);
  const { data: customFeelings } = useGetCustomFeelings();

  useEffect(() => {
    if (customFeelings?.length) {
      const _convertedFeelings: [
        string,
        { text: string; fillColor: string },
      ][] = customFeelings?.map((customFeeling) => [
        customFeeling.id,
        {
          text: customFeeling.name,
          fillColor: emotionLevelColorMap[customFeeling.emotionLevel],
        },
      ]);

      setConvertedCustomFeelings(_convertedFeelings);
    }
  }, [customFeelings]);

  return [...feelingList, ...convertedCustomFeelings];
};
