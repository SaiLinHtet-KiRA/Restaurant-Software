import React, { ReactNode } from "react";
import { styled } from "nativewind";
import { SafeAreaView as SAV } from "react-native-safe-area-context";
import clsx from "clsx";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import useGetTheme from "@/constants/useGetTheme";
import { useLocalSearchParams } from "expo-router/build/hooks";
// import { KeyboardProvider } from "react-native-keyboard-controller";

type props = {
  className?: string;
  children: ReactNode;
};

const SafeAreaView = styled(SAV);

export default function SafeAreaViewLayout({ className, children }: props) {
  const { height, insetsBottom } = useGetTheme();
  const { type } = useLocalSearchParams();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      className="bg-[rgba(0,0,0,0.1)] rounded-0"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        className="bg-bg"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: type ? height * 0.4 + insetsBottom : height * 0.15,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView
          className={clsx("flex-1 min-h-screen gap-10 ", className)}
        >
          {children}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
