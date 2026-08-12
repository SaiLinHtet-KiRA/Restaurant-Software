import { View, Text } from "react-native";
import React from "react";

type props = {
  text: string;
};

export default function ItemSectionHeader({ text }: props) {
  return <Text className="text-xl font-bold text-white ">{text}</Text>;
}
