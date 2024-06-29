import {
  Alert,
  FlatList,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";

import { useGetFeelingList } from "./hooks/useGetFeelings";
import { FeelingIcon } from "../../../../../components/feeling-icon";
import { Text } from "../../../../../components/text";
import { theme } from "../../../../../theme";
import { useStore } from "../../../store/useStore";
import { Feeling } from "../../../../../services/supabase/database/custom_feelings/converter";

const paddingHorizontal = 22;

export const FeelingList = () => {
  const { width } = useWindowDimensions();
  const [selectedFeelings, addFeeling, removeFeeling] = useStore((state) => [
    state.feelings,
    state.addFeeling,
    state.removeFeeling,
  ]);
  const selectedFeelingIds = selectedFeelings.map((selectedFeeling) =>
    selectedFeeling.id
  );

  const feelingList = useGetFeelingList();

  const onPressFeeling = (feeling: Feeling) => {
    if (selectedFeelingIds.includes(feeling.id)) {
      return removeFeeling(feeling.id);
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
        renderItem={({ item }) => {
          const isSelected = selectedFeelingIds.includes(item.id);

          return (
            <Pressable
              key={item.name}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: itemWidth,
                height: 62,
                marginVertical: 16,
                gap: 4,
              }}
              onPress={() => onPressFeeling(item)}
            >
              <FeelingIcon fill={item.color} />
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
                {item.name}
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
