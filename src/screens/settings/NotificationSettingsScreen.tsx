import { EllipsisVertical, Plus } from "lucide-react-native";
import { useState } from "react";
import { ActionSheetIOS, TouchableOpacity, View } from "react-native";

import { TimePickerModal } from "./components/TimePickerModal";
import { Text } from "../../components/text";
import { TitleSubtitleLayout } from "../../components/title-subtitle-layout";
import { useCreateReminder } from "../../hooks/reminderHooks/useCreateReminder";
import { useDeleteReminder } from "../../hooks/reminderHooks/useDeleteReminder";
import { useGetReminders } from "../../hooks/reminderHooks/useGetReminders";
import { useUpdateReminder } from "../../hooks/reminderHooks/useUpdateReminder";
import { useAppTheme } from "../../hooks/useAppTheme";
import { Reminder } from "../../services/supabase/database/reminders/converter";

const defaultHour = 20;
const defaultMinute = 0;

export default function NotificationSettingsScreen() {
  const theme = useAppTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActionSheetVisible, setIsActionSheeetVisible] = useState(false);
  const [reminderOnEdit, setReminderOnEdit] = useState<Reminder | null>(null);

  const { data: reminders } = useGetReminders();
  const { mutate: createReminder } = useCreateReminder();
  const { mutate: updateReminder } = useUpdateReminder();
  const { mutate: deleteReminder } = useDeleteReminder();

  return (
    <>
      <TitleSubtitleLayout
        title="リマインダー設定"
        subtitle="omoiを使いたい時間に通知を送ることができます"
      >
        <View style={{ height: 64 }} />

        <View
          style={{
            backgroundColor: theme.colors.white,
            paddingVertical: 28,
            paddingHorizontal: 16,
            borderRadius: 16,
          }}
        >
          <View style={{ gap: 16 }}>
            {reminders?.map((reminder, index) => {
              return (
                <View
                  key={reminder.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 36,
                  }}
                >
                  <Text>{`リマインダー ${index + 1}`}</Text>
                  <View style={{ flexDirection: "row", gap: 12 }}>
                    <Text>{`${reminder.hour}:${String(reminder.minute).padStart(2, "0")}`}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setReminderOnEdit(reminder);
                        setIsActionSheeetVisible(true);
                      }}
                    >
                      <EllipsisVertical color={theme.colors.text} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={{ height: 10 }} />

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setIsModalVisible(true);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                width: "100%",
                borderColor: theme.colors.textLight,
                borderWidth: 1,
                borderRadius: 48,
                paddingVertical: 12.5,
                paddingHorizontal: 24,
              }}
            >
              <Plus size={20} color={theme.colors.text} />
              <Text
                style={{
                  fontSize: theme.fontStyle.md["1"].size,
                  fontWeight: theme.fontStyle.md["1"].weight,
                }}
              >
                追加
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TitleSubtitleLayout>

      {isActionSheetVisible &&
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["キャンセル", "編集する", "削除する"],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
            userInterfaceStyle: "light",
          },
          (buttonIndex) => {
            if (buttonIndex === 0) {
              setIsActionSheeetVisible(false);
            } else if (buttonIndex === 1) {
              setIsActionSheeetVisible(false);
              setIsModalVisible(true);
            } else if (buttonIndex === 2) {
              if (reminderOnEdit) {
                deleteReminder({ id: reminderOnEdit.id });
              }
              setIsActionSheeetVisible(false);
            }
          },
        )}

      <TimePickerModal
        title="タイマー１"
        hour={reminderOnEdit?.hour ?? defaultHour}
        minute={reminderOnEdit?.minute ?? defaultMinute}
        isVisible={isModalVisible}
        setIsVisible={(value: boolean) => {
          if (!value) {
            setReminderOnEdit(null);
          }
          setIsModalVisible(value);
        }}
        updateTime={(hour: number, minute: number) =>
          reminderOnEdit
            ? updateReminder({
                id: reminderOnEdit.id,
                hour,
                minute,
              })
            : createReminder({ hour, minute })
        }
      />
    </>
  );
}
