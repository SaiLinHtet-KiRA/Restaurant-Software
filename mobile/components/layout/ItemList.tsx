import { View, ScrollView, Pressable, FlatList, Text } from "react-native";
import React, { ReactNode, useId } from "react";
import ItemCard from "../Card/ItemCard";
import PlusCirlce from "@/svg/PlusCircle";
import Item from "@/interface/Item";
import { useLocalSearchParams, usePathname } from "expo-router";
import useGetTheme from "@/constants/useGetTheme";

type props = {
  items: Item[];
  add: () => void;
  children?: (item: Item) => React.ReactNode;
  className?: string;
  header: ReactNode;
};

export default function ItemList({
  items,
  add,
  children,
  className,
  header,
}: props) {
  const { type } = useLocalSearchParams();
  const path = usePathname();

  const { space } = useGetTheme();
  const id = useId();
  return (
    <>
      {header}
      <ScrollView className="flex-row w-full" horizontal>
        <View className=" flex-row px-5 py-4">
          {!type && path !== "/orders" && path !== "/history" && (
            <Pressable
              onPress={add}
              className="p-4 rounded-2xl bg-sky-500 mx-3 self-center"
            >
              <View className="size-10 ">
                <PlusCirlce stroke="white" />
              </View>
            </Pressable>
          )}
          <FlatList
            data={items}
            horizontal
            contentContainerStyle={{ gap: space }}
            keyExtractor={(_item, i) => i + id}
            scrollEnabled={false}
            key={items.length}
            renderItem={({ item }) => (
              <ItemCard {...item} className={className}>
                {children && children(item)}
              </ItemCard>
            )}
          />
        </View>
      </ScrollView>
    </>
  );
}
