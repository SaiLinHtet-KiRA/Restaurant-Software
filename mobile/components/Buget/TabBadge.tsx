import { View, Text } from "react-native";
import React, { createElement } from "react";
import { Tab } from "@/constants/data";

export default function TabBadge({ name, title, svg }: Tab) {
  return (
    <View className=" flex-row  items-center border border-gray-200 rounded-xl md:px-8 md:py-6 px-4 py-3 bg-white gap-2">
      <View className="w-14 h-14 md:w-24 md:h-24 ">
        {createElement(svg, { stroke: "#000" })}
      </View>
      <Text className="md:text-4xl text-2xl text-gray-500">{title}</Text>
    </View>
  );
}
