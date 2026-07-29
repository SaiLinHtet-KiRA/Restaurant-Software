import { View } from "react-native";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <View className="w-screen flex flex-col min-h-screen-safe">
      <View className=" bg-sky-500 py-5 rounded-t-full" />
      <View className="px-5 h-full bg-sky-500 flex gap-4">{children}</View>
    </View>
  );
}
