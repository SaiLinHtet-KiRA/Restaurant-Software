import { View, Text, Pressable } from "react-native";
import React from "react";
import Item from "@/interface/Item";
import IconButton from "../Button/IconButton";
import MinusCircle from "@/svg/MinusCircle";
import PlusCircle from "@/svg/PlusCircle";
import { useDispatch } from "react-redux";
import { increaseItem, reduceItem } from "@/redux/features/Order";
import useGetSelectedItem from "@/hook/GetSelectedItem";

export default function ItemCardAddFooter({
  item,
  Type,
}: {
  item: Item;
  Type?: string;
}) {
  const { type: T, selectedItem } = useGetSelectedItem(Type);
  const type = Type || T;
  const dispatch = useDispatch();

  const data = selectedItem.length
    ? selectedItem.filter(({ _id }) => _id == item._id)[0]
    : item;

  return (
    <View className="flex-row justify-between items-center px-2 gap-2">
      <Pressable
        disabled={data?.count < 1}
        onPress={() =>
          dispatch(reduceItem({ type: type as string, item: item }))
        }
      >
        <IconButton svg={MinusCircle} />
      </Pressable>
      <Text className="flex-1 bg-sky-500 text-center text-bold text-white text-2xl rounded-3xl">
        {data?.count ? data.count : "0"}
      </Text>
      <Pressable
        disabled={data?.count < 1}
        onPress={() =>
          dispatch(increaseItem({ type: type as string, item: item }))
        }
      >
        <IconButton svg={PlusCircle} />
      </Pressable>
    </View>
  );
}
