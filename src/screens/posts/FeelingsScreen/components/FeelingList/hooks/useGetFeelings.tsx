import { useGetCustomFeelings } from "../../../../../../hooks/customFeelingHooks/useGetCustomFeelings";
import {
  emotionLevelColorMap,
  feelingMap,
} from "../../../../../../utils/feelingMap";

export const useGetFeelingList = () => {
  const { data: customFeelings, isLoading } = useGetCustomFeelings();

  if (!isLoading) {
    customFeelings?.forEach((customFeeling) => {
      const fillColor = emotionLevelColorMap[customFeeling.emotionLevel];
      feelingMap[customFeeling.name] = { text: customFeeling.name, fillColor };
    });
  }

  return Object.entries(feelingMap);
};
