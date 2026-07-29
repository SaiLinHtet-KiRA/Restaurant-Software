import { Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import Arrow from "@/svg/Arrow";

export default function BackArrowButton() {
  return (
    <Pressable
      onPress={() => router.back()}
      className="ml-2 md:ml-4 size-10 md:size-15 "
    >
      <Arrow className="size-6 md:size-12" />
    </Pressable>
  );
}
