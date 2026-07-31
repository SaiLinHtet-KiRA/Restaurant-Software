import React, { forwardRef, ReactNode } from "react";
import { styled } from "nativewind";
import { SafeAreaView as SAV } from "react-native-safe-area-context";
import clsx from "clsx";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import type { ScrollView as ScrollViewType } from "react-native";

const SafeAreaView = styled(SAV);

const SafeAreaViewLayout = forwardRef<
  ScrollViewType,
  { className?: string; children: ReactNode }
>(function SafeAreaViewLayout({ className, children }, ref) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className=" bg-sky-500"
    >
      <ScrollView
        ref={ref}
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
});

export default SafeAreaViewLayout;
