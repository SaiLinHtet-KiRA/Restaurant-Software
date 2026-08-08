import { View, ScrollView, Pressable, FlatList, Text } from "react-native";
import React, { useId } from "react";
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
};

export default function ItemList({ items, add, children, className }: props) {
  const { type } = useLocalSearchParams();
  const { space } = useGetTheme();
  const id = useId();

  return (
    <ScrollView className="flex-row w-full" horizontal>
      <View className=" flex-row px-5 py-4">
        {!type && (
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
          keyExtractor={(item) => item._id + id}
          scrollEnabled={false}
          key={items.length}
          renderItem={({ item }) => (
            <ItemCard key={item._id} {...item} className={className}>
              {children && children(item)}
            </ItemCard>
          )}
        />
      </View>
    </ScrollView>
  );
}
