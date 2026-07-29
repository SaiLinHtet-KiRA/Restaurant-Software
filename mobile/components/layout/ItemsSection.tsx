import { View, Text, FlatList } from "react-native";
import React, { ReactNode } from "react";
import ItemCollection from "@/interface/ItemCollection";
import PencilSquare from "@/svg/PencilSquare";
import useGetTheme from "@/constants/useGetTheme";
import CreateItemCard from "../Card/CreateItemCard";

type props = {
  data: ItemCollection[];
  card?: ReactNode;
};

export default function ItemsSection({ data, card }: props) {
  const { space, numColumns } = useGetTheme();

  return data.map(({ _id, items, name, size }) => (
    <View key={_id} className="bg-red-500 px-4 py-6">
      <FlatList
        data={items}
        numColumns={numColumns}
        ListHeaderComponent={
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-white font-bold text-xl">
              {name}({size})
            </Text>
            <View>
              <View className="size-10 p-2 rounded-full bg-black">
                <PencilSquare stroke="white" />
              </View>
            </View>
          </View>
        }
        ListFooterComponent={<CreateItemCard />}
        ListHeaderComponentStyle={{ justifyContent: "flex-start" }}
        className="self-center"
        keyExtractor={(item) => item._id}
        scrollEnabled={false}
        contentContainerStyle={{ gap: space }}
        columnWrapperStyle={{ gap: space }}
        key={numColumns}
        renderItem={({ item: { price, _id } }) => <Text>{price}</Text>}
      />
    </View>
  ));
}
