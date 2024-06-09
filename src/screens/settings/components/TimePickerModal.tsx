import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { FullScreenModal } from "../../../components/FullScreenModal";
import { Button } from "../../../components/button";
import { Text } from "../../../components/text";
import { useAppTheme } from "../../../hooks/useAppTheme";

type Props = {
  title: string;
  hour: number;
  minute: number;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  updateTime: (hour: number, minute: number) => void;
};

const getInitialDate = (hour: number, minute: number) => {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);

  return date;
};

export const TimePickerModal = ({
  title,
  hour,
  minute,
  isVisible,
  setIsVisible,
  updateTime,
}: Props) => {
  const theme = useAppTheme();
  const [date, setDate] = useState(getInitialDate(hour, minute));

  useEffect(() => {
    setDate(getInitialDate(hour, minute));
  }, [isVisible]);

  return (
    <FullScreenModal
      visible={isVisible}
      onDismiss={() => {
        setIsVisible(false);
      }}
    >
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Text
          style={{
            marginTop: 30,
            paddingHorizontal: 24,
            fontSize: theme.fontStyle.xl[1].size,
            fontWeight: theme.fontStyle.xl[1].weight,
          }}
        >
          {title}
        </Text>

        <View
          style={{
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "#D9D9D9",
              width: 345,
              borderRadius: 16,
              padding: 24,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                height: 200,
                borderRadius: 13,
              }}
            >
              <RNDateTimePicker
                value={date}
                mode="time"
                onChange={(_: DateTimePickerEvent, date?: Date) => {
                  if (date) {
                    setDate(date);
                  }
                }}
                display="spinner"
                is24Hour
                minuteInterval={5}
              />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24 }}>
          <Button
            onPress={() => {
              updateTime(date.getHours(), date.getMinutes());
              setIsVisible(false);
            }}
          >
            決定
          </Button>
        </View>
      </View>
    </FullScreenModal>
  );
};
