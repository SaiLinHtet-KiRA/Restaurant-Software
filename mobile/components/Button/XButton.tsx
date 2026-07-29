import { Text, Pressable, View } from "react-native";
import React from "react";
import clsx from "clsx";
import XMasrk from "@/svg/XMasrk";

type Props = {
  className?: string;
  text: string;
  onClik: () => void;
};

export default function XButton({ text, onClik, className }: Props) {
  return (
    <Pressable
      className={clsx(
        " flex-row items-center  px-2 py-1.5 rounded-lg bg-red-600",
        className,
      )}
      onPress={onClik}
    >
      <View className="w-5 h-5 ">
        <XMasrk stroke="white" />
      </View>
      <Text className="font-bold text-sm text-white">{text}</Text>
    </Pressable>
  );
}
