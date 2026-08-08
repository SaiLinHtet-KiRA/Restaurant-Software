import { View, Text } from "react-native";
import React from "react";

import useGetTheme from "@/constants/useGetTheme";
import { LinearGradient } from "expo-linear-gradient";
import { styled } from "nativewind";
import ItemList from "../layout/ItemList";
import Item from "@/interface/Item";
import useGetSelectedItem from "@/hook/GetSelectedItem";

const LinearGradientStyled = styled(LinearGradient);

export default function AddedItemSectionFooter() {
  const { type, selectedItem } = useGetSelectedItem();
  const { height, insetsBottom } = useGetTheme();

  return (
    <View
      className="absolute flex bottom-0 left-0 right-0 "
      style={{ height: height * 0.4 + insetsBottom }}
    >
      <View className="relative h-[30%] ">
        <LinearGradientStyled
          colors={["#0000", "#0084bf"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute size-full"
          style={{ zIndex: 10 }}
        />
      </View>
      <View className="flex-1 bg-bg-sec pl-6">
        <Text className="text-xl font-bold text-white ">
          {type == "take-away" ? "Take Away" : "Eat In"} ({selectedItem.length})
        </Text>
        <ItemList
          items={selectedItem}
          add={() => {
            return;
          }}
          className="!w-30"
        >
          {(item: Item) => (
            <View className="flex-row justify-between px-2">
              <Text className="font-bold text-white">x {item.count}</Text>
              <Text className="font-bold text-white">
                {item.count * Number(item.price)} ฿
              </Text>
            </View>
          )}
        </ItemList>
      </View>
    </View>
  );
}
