import {
  View,
  FlatList,
  Pressable,
  useWindowDimensions,
  Alert,
} from "react-native";

import { useGetFeelingList } from "./hooks/useGetFeelings";
import { FeelingIcon } from "../../../../../components/feeling-icon";
import { Text } from "../../../../../components/text";
import { theme } from "../../../../../theme";
import { useStore } from "../../../store/useStore";

const paddingHorizontal = 22;

export const FeelingList = () => {
  const { width } = useWindowDimensions();
  const [selectedFeelings, addFeeling, removeFeeling] = useStore((state) => [
    state.feelings,
    state.addFeeling,
    state.removeFeeling,
  ]);

  const feelingList = useGetFeelingList();

  const onPressFeeling = (feeling: string) => {
    if (selectedFeelings.includes(feeling)) {
      return removeFeeling(feeling);
    }

    if (selectedFeelings.length >= 3) {
      Alert.alert("最大３つまで選んでください");
      return;
    }

    addFeeling(feeling);
  };

  const itemWidth = (width - paddingHorizontal * 2) / 5;

  return (
    <View style={{ paddingHorizontal }}>
      <FlatList
        scrollEnabled={false}
        data={feelingList}
        renderItem={({ item: [key, value] }) => {
          const isSelected = selectedFeelings.includes(key);

          return (
            <Pressable
              key={value.text}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: itemWidth,
                height: 62,
                marginVertical: 16,
                gap: 4,
              }}
              onPress={() => onPressFeeling(key)}
            >
              <FeelingIcon fill={value.fillColor} />
              <Text
                style={{
                  fontSize: isSelected
                    ? theme.fontStyle.sm[1].size
                    : theme.fontStyle.xs[3].size,
                  fontWeight: isSelected
                    ? theme.fontStyle.sm[1].weight
                    : theme.fontStyle.xs[3].weight,
                  textDecorationLine: isSelected ? "underline" : "none",
                }}
              >
                {value.text}
              </Text>
            </Pressable>
          );
        }}
        horizontal={false}
        numColumns={5}
      />
    </View>
  );
};
