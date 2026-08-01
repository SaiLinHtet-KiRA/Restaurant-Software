import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "@/redux/store";
import { router, useLocalSearchParams } from "expo-router";
import ItemList from "./ItemList";
import Button from "../Button/Button";
import PencilSquare from "@/svg/PencilSquare";
import Trash from "@/svg/Trash";
import Item from "@/interface/Item";

export default function OrderSection() {
  const order = useAppSelector(({ order }) => order);
  const { number } = useLocalSearchParams();

  return (
    <View className="px-6 flex gap-5">
      <View className="flex-row items-center gap-2">
        <Text className="text-xl font-bold text-white">Table No: </Text>
        <Text className="text-2xl font-bold text-white px-3.5 py-2 bg-[rgba(0,0,0,0.15)] rounded-2xl">
          {number == "take-away" ? "Take Away" : number}
        </Text>
      </View>
      <View className="bg-[rgba(0,0,0,0.2)] px-4 py-6 rounded-xl outline-2 outline-white/30 ">
        <Text className="text-xl font-bold text-white focus:border-b-2 focus:border-white/80">
          Eat In ({order?.eatIn.length})
        </Text>
        <ItemList
          items={order!.eatIn}
          add={() =>
            router.push({
              pathname: "/(add)/[type]",
              params: { number: "take-away" },
            })
          }
        >
          {(item: Item) => (
            <>
              <Button
                className="scale-[0.9]  !bg-sky-500"
                SVG={PencilSquare}
                disabled={false}
                text="Edit"
                onClik={() => console.log("")}
              />
              <Button
                className="scale-[0.9] !bg-red-500"
                SVG={Trash}
                disabled={false}
                text="Delete"
                onClik={() => console.log("")}
              />
            </>
          )}
        </ItemList>
      </View>
    </View>
  );
}
