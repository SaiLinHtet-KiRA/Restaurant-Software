import { View, ScrollView, Pressable, FlatList } from "react-native";
import React from "react";
import ItemCard from "../Card/ItemCard";

import PlusCirlce from "@/svg/PlusCircle";
import Item from "@/interface/Item";
import { usePathname } from "expo-router";

type props = {
  items: Item[];
  add: () => void;
  children: (item: Item) => React.ReactNode;
};

export default function ItemList({ items, add, children }: props) {
  const path = usePathname();
  const IsAdd = path.includes("/[type]");
  return (
    <ScrollView className="flex-row w-full" horizontal>
      <View className=" flex-row  px-5 py-4 items-center">
        {!IsAdd && (
          <Pressable onPress={add} className="p-4 rounded-2xl bg-sky-500 mx-3">
            <View className="size-10 ">
              <PlusCirlce stroke="white" />
            </View>
          </Pressable>
        )}
        <FlatList
          data={items}
          horizontal
          ListHeaderComponentStyle={{ justifyContent: "flex-start" }}
          className="self-center "
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          key={items.length}
          renderItem={({ item }) => (
            <ItemCard key={item._id} {...item}>
              <View className="flex-row rounded-2xl justify-evenly">
                {children(item)}
                {/* <Button
                  className="scale-[0.9]  !bg-sky-500"
                  SVG={PencilSquare}
                  disabled={false}
                  text="Edit"
                  onClik={() => {
                    setDefaultValues(item);
                    setShowModal(_id);
                  }}
                />
                <Button
                  className="scale-[0.9] !bg-red-500"
                  SVG={Trash}
                  disabled={false}
                  text="Delete"
                  onClik={() => DeleteItem(item)}
                /> */}
              </View>
            </ItemCard>
          )}
        />
      </View>
    </ScrollView>
  );
}
