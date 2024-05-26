import { format } from "@formkit/tempo";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";
import React, { useState } from "react";
import { Text, Pressable, View } from "react-native";

import { FullScreenModal } from "../../../components/FullScreenModal";
import { Button } from "../../../components/button";
import { useAppTheme } from "../../../hooks/useAppTheme";

type Props = {
  date: Date;
  setDate: (date: Date) => void;
};

export const DateSelector = ({ date, setDate }: Props) => {
  const [newDate, setNewDate] = useState(date);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const theme = useAppTheme();
  const formattedDate = format(date, "YYYY/MM/DD");

  return (
    <>
      <Pressable
        style={{
          backgroundColor: theme.colors.white,
          paddingHorizontal: 17,
          paddingVertical: 8.5,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
        onPress={() => {
          setShowTimePicker(true);
        }}
      >
        <CalendarDays color={theme.colors.text} size={20} />
        <Text
          style={{
            fontSize: theme.fontStyle.md["3"].size,
            fontWeight: theme.fontStyle.md["3"].weight,
          }}
        >
          {formattedDate}
        </Text>
      </Pressable>

      <FullScreenModal
        visible={showTimePicker}
        onDismiss={() => {
          setShowTimePicker(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            <View style={{ height: 30 }} />

            <View
              style={{
                backgroundColor: "#D9D9D9",
                width: 345,
                borderRadius: 16,
                padding: 24,
              }}
            >
              <Text
                style={{
                  fontSize: theme.fontStyle.md["1"].size,
                  fontWeight: theme.fontStyle.md["1"].weight,
                }}
              >
                日付変更
              </Text>
              <View style={{ height: 16 }} />
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: 200,
                  borderRadius: 13,
                }}
              >
                <RNDateTimePicker
                  value={newDate}
                  mode="date"
                  onChange={(_: DateTimePickerEvent, date?: Date) => {
                    if (date) {
                      setNewDate(date);
                    }
                  }}
                  display="spinner"
                />
              </View>
            </View>

            <View style={{ height: 40 }} />

            <View
              style={{
                backgroundColor: "#D9D9D9",
                width: 345,
                borderRadius: 16,
                padding: 24,
              }}
            >
              <Text
                style={{
                  fontSize: theme.fontStyle.md["1"].size,
                  fontWeight: theme.fontStyle.md["1"].weight,
                }}
              >
                時間変更
              </Text>
              <View style={{ height: 16 }} />
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: 200,
                  borderRadius: 13,
                }}
              >
                <RNDateTimePicker
                  value={newDate}
                  mode="time"
                  onChange={(_: DateTimePickerEvent, date?: Date) => {
                    if (date) {
                      setNewDate(date);
                    }
                  }}
                  display="spinner"
                  is24Hour={false}
                />
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 24 }}>
            <Button
              onPress={() => {
                setDate(newDate);
                setShowTimePicker(false);
              }}
            >
              決定
            </Button>
          </View>
        </View>
      </FullScreenModal>
    </>
  );
};
