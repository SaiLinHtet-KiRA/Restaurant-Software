import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "@/redux/store";
import { router, useLocalSearchParams } from "expo-router";
import ItemList from "./ItemList";
import Item from "@/interface/Item";
import ItemCardAddFooter from "../footer/ItemCardAddFooter";
import InputItemSectionHeader from "./InputInputItemSectionHeader";

export default function OrderSection() {
  const order = useAppSelector(({ order }) => order);
  const { number } = useLocalSearchParams();

  return (
    <View className="px-6 flex gap-5">
      <View className="flex-row items-center gap-2">
        <Text className="text-xl font-bold text-white">Table No: </Text>
        <Text className="text-2xl font-bold text-white px-3.5 py-2 bg-[rgba(0,0,0,0.15)] rounded-2xl">
          {order.table}
        </Text>
      </View>
      {order.table !== "Take Away" && (
        <View className="bg-bg-sec px-4 py-6 rounded-xl outline-2 outline-white/30 ">
          <InputItemSectionHeader
            name={"Eat In"}
            size={order?.eatIn.length}
            _id={""}
          />
          <ItemList
            items={order!.eatIn}
            add={() =>
              router.push({
                pathname: "/(add)/[type]",
                params: { type: "eat-in" },
              })
            }
          >
            {(item: Item) => (
              <ItemCardAddFooter
                item={item}
                Type="eat-in"
                key={"eat-" + item._id}
              />
            )}
          </ItemList>
        </View>
      )}

      <View className="bg-bg-sec px-4 py-6 rounded-xl outline-2 outline-white/30 ">
        <InputItemSectionHeader
          name={"Take Away"}
          size={order?.takeAway.length}
          _id={""}
        />
        <ItemList
          items={order!.takeAway}
          add={() =>
            router.push({
              pathname: "/(add)/[type]",
              params: { type: "take-away" },
            })
          }
        >
          {(item: Item) => (
            <ItemCardAddFooter
              item={item}
              Type="take-away"
              key={"take-" + item._id}
            />
          )}
        </ItemList>
      </View>
    </View>
  );
}
