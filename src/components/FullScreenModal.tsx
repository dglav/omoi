import { X } from "lucide-react-native";
import React from "react";
import { Pressable, Modal, SafeAreaView, View } from "react-native";
import { Portal } from "react-native-paper";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export const FullScreenModal = ({
  visible,
  onDismiss,
  children,
}: React.PropsWithChildren & Props) => {
  return (
    <Portal>
      <Modal visible={visible} animationType="fade" onDismiss={onDismiss}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#EFEFEF" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingHorizontal: 20,
            }}
          >
            <Pressable
              onPress={onDismiss}
              style={{
                backgroundColor: "#D9D9D9",
                borderRadius: 1000,
                width: 30,
                height: 30,
              }}
            >
              <X
                size={20}
                color="#3D3D3D"
                strokeWidth={2}
                style={{
                  position: "relative",
                  top: 5,
                  left: 5,
                }}
              />
            </Pressable>
          </View>

          {children}
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};
