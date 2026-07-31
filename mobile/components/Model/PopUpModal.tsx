import {
  View,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import React, { ReactNode } from "react";
import { BlurView } from "expo-blur";
import useGetTheme from "@/constants/useGetTheme";
import XMasrk from "@/svg/XMasrk";

type props = {
  modalVisible: string | null;
  children: ReactNode;
  Close: () => void;
};

export default function PopUpModal({ modalVisible, children, Close }: props) {
  const { color_bg } = useGetTheme();
  return (
    <Modal animationType="fade" transparent visible={Boolean(modalVisible)}>
      <BlurView
        intensity={20}
        tint="systemMaterialLight"
        className="flex-1 justify-center items-center"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="w-screen flex justify-center items-center">
            <ScrollView
              contentContainerStyle={{
                position: "relative",
                display: "flex",
                backgroundColor: color_bg,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
              }}
              scrollEnabled={false}
            >
              <Pressable
                className="absolute size-8 top-3 right-3"
                onPress={Close}
              >
                <XMasrk stroke="black" />
              </Pressable>
              {children}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </BlurView>
    </Modal>
  );
}
