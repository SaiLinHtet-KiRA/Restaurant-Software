import React, { ReactNode } from "react";
import { styled } from "nativewind";
import { SafeAreaView as SAV } from "react-native-safe-area-context";
import clsx from "clsx";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

const SafeAreaView = styled(SAV);

export default function SafeAreaViewLayout({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <ScrollView className="bg-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView className={clsx("flex-1 gap-10", className)}>
        {children}
      </SafeAreaView>
    </ScrollView>
  );
}
