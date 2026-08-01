import React, { ReactNode } from "react";
import { styled } from "nativewind";
import { SafeAreaView as SAV } from "react-native-safe-area-context";
import clsx from "clsx";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

type props = {
  className?: string;
  children: ReactNode;
};

const SafeAreaView = styled(SAV);

export default function SafeAreaViewLayout({ className, children }: props) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      className="bg-[rgba(0,0,0,0.1)]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
    >
      <ScrollView
        className="bg-bg"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView className={clsx("flex-1 min-h-screen gap-10", className)}>
          {children}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
