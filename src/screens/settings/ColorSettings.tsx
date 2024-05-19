import { useContext, useState } from "react";
import { View } from "react-native";

import { OptionsList } from "../../components/OptionsList";
import { TitleSubtitleLayout } from "../../components/title-subtitle-layout";
import { useAppTheme } from "../../hooks/useAppTheme";
import { ThemeContext } from "../../providers/ThemeProvider";

const colorOptions = [
  { text: "グリーン", value: "green", hexCode: "#EAF3D3" } as const,
  { text: "レッド", value: "red", hexCode: "#F4C8C8" } as const,
  { text: "ブルー", value: "blue", hexCode: "#D3E0F3" } as const,
  { text: "イエロー", value: "yellow", hexCode: "#F2F0BC" } as const,
  { text: "ピンク", value: "pink", hexCode: "#F6D2E1" } as const,
  { text: "ブラウン", value: "brown", hexCode: "#F0D3C2" } as const,
  { text: "グレー", value: "grey", hexCode: "#DDDDDD" } as const,
];

export const ColorSettingsScreen = () => {
  const theme = useAppTheme();
  const currentColorOption = colorOptions.find(
    (option) => option.hexCode === theme.colors.background,
  );
  const [selectedColor, setSelectedColor] = useState(
    currentColorOption || colorOptions[0],
  );

  const { updateTheme } = useContext(ThemeContext);

  return (
    <TitleSubtitleLayout
      title="カラーテーマ"
      subtitle="好みのカラーテーマを選んでください"
    >
      <OptionsList
        options={colorOptions}
        selectedOption={selectedColor}
        handleSelectOption={async (value: string) => {
          const option = colorOptions.find((option) => option.value === value);
          if (option) {
            if (updateTheme) {
              await updateTheme(option.value);
            }
            setSelectedColor(option);
          }
        }}
      />

      <View style={{ height: 12 }} />
    </TitleSubtitleLayout>
  );
};
