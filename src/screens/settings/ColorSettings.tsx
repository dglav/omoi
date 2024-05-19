import { useState } from "react";
import { ScrollView, View } from "react-native";

import { OptionsList } from "../../components/OptionsList";
import { Button } from "../../components/button";
import { TitleSubtitleLayout } from "../../components/title-subtitle-layout";
import { useAppTheme } from "../../hooks/useAppTheme";

const colorOptions: { text: string; value: string; hexCode: string }[] = [
  { text: "グリーン", value: "green", hexCode: "#EAF3D3" },
  { text: "レッド", value: "red", hexCode: "#F4C8C8" },
  { text: "ブルー", value: "blue", hexCode: "#D3E0F3" },
  { text: "イエロー", value: "yellow", hexCode: "#F2F0BC" },
  { text: "ピンク", value: "pink", hexCode: "#F6D2E1" },
  { text: "ブラウン", value: "brown", hexCode: "#F0D3C2" },
  { text: "グレー", value: "grey", hexCode: "#DDDDDD" },
];

export const ColorSettingsScreen = () => {
  const theme = useAppTheme();
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  return (
    <ScrollView
      style={{ height: "100%", backgroundColor: theme.colors.background }}
    >
      <TitleSubtitleLayout
        title="カラーテーマ"
        subtitle="好みのカラーテーマを選んでください"
      >
        <OptionsList
          options={colorOptions}
          handleSelectOption={(value: string) => {
            const option = colorOptions.find(
              (option) => option.value === value,
            );
            if (option) {
              setSelectedColor(option);
            }
          }}
        />

        <View style={{ height: 12 }} />

        <Button onPress={() => console.log("set color to: ", selectedColor)}>
          保存
        </Button>

        <View style={{ height: 24 }} />
      </TitleSubtitleLayout>
    </ScrollView>
  );
};
