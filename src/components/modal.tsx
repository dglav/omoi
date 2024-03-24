import { Portal, Modal as RNPModal } from "react-native-paper";

type Props = {
  visible: boolean;
  children: React.ReactElement[];
};

export const Modal = ({ visible, children }: Props) => {
  return (
    <>
      <Portal>
        <RNPModal
          visible={visible}
          dismissable={false}
          contentContainerStyle={{
            backgroundColor: "white",
            paddingHorizontal: 15,
            paddingVertical: 40,
            width: "90%",
            borderRadius: 10,
            alignSelf: "center",
          }}
        >
          {children}
        </RNPModal>
      </Portal>
    </>
  );
};
