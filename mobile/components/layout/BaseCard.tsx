import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import Order from "@/interface/Order";
import ItemList from "./ItemList";
import PriceFooterOfCard from "../footer/PriceFooterOfCard";
import Item from "@/interface/Item";
import ItemSectionHeader from "./ItemSectionHeader";

export default function BaseCard({
  _id,
  id,
  eatIn,
  price,
  table,
  takeAway,
  children,
}: Order & {
  children: ReactNode;
}) {
  return (
    <View className="bg-sky-500 py-6 px-8 rounded-2xl flex gap-4">
      <View className="flex-row items-center">
        <Text className="text-white font-bold text-2xl"># {id} </Text>
        <Text className="opacity-90 text-white font-bold text-lg bg-sky-400 px-2 py-1 rounded-xl">
          {Number(table) ? `Table No ${table}` : table}
        </Text>
      </View>

      {eatIn.length ? (
        <View className="flex-1 bg-bg-sec pl-6 py-4 rounded-2xl">
          <ItemList
            items={takeAway}
            add={() => {
              return;
            }}
            className="!w-30"
            header={<ItemSectionHeader text={`Eat In (${takeAway.length})`} />}
          >
            {(item: Item) => (
              <PriceFooterOfCard count={item.count} price={item.price} />
            )}
          </ItemList>
        </View>
      ) : (
        <></>
      )}
      {takeAway.length ? (
        <View className="flex-1 bg-bg-sec pl-6 py-4 rounded-2xl">
          <ItemList
            items={takeAway}
            add={() => {
              return;
            }}
            className="!w-30"
            header={
              <ItemSectionHeader text={`Take Away (${takeAway.length})`} />
            }
          >
            {(item: Item) => (
              <PriceFooterOfCard count={item.count} price={item.price} />
            )}
          </ItemList>
        </View>
      ) : (
        <></>
      )}
      <View className="flex-row justify-between items-center">
        <Text className="text-white font-bold text-2xl">{price}฿</Text>
        <View className="flex-row gap-3">{children}</View>
      </View>
    </View>
  );
}
