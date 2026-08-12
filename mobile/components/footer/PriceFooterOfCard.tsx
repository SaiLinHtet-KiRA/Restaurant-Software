import { View, Text } from "react-native";
import React from "react";

type props = {
  count: number;
  price: number;
};

export default function PriceFooterOfCard({ count, price }: props) {
  return (
    <View className="flex-row justify-between px-2">
      <Text className="font-bold text-white">x {count}</Text>
      <Text className="font-bold text-white">{count * price} ฿</Text>
    </View>
  );
}
