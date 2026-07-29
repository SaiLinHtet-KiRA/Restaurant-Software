import { Text, Pressable, View } from "react-native";
import React from "react";
import clsx from "clsx";
import PlusCirlce from "@/svg/PlusCircle";

type Props = {
  className?: string;
  text: string;
  disabled: boolean;
  onClik: () => void;
};

export default function PlusButton({
  text,
  onClik,
  className,
  disabled,
}: Props) {
  return (
    <Pressable
      disabled={disabled}
      className={clsx(
        "flex-row items-center gap-1 px-3 py-2 md:gap-1.5 md:px-6 md:py-4 rounded-lg bg-sky-600 disabled:opacity-60",
        className,
      )}
      onPress={onClik}
    >
      <View className="size-8 md:size-12 ">
        <PlusCirlce stroke="white" />
      </View>
      <Text className="font-bold text-white text-base md:text-xl">{text}</Text>
    </Pressable>
  );
}
