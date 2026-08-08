import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { useAppSelector } from "@/redux/store";
import useGetTheme from "@/constants/useGetTheme";
import Item from "@/interface/Item";
import clsx from "clsx";

export default function ItemsTable() {
  const order = useAppSelector(({ order }) => order);
  const { width } = useGetTheme();
  return (
    <View className="p-3 flex gap-3" style={{ width: width * 0.8 }}>
      <View>
        <Text className="text-xl">Tabel No - {order.table}</Text>
      </View>
      {order.eatIn.length ? (
        <View className="felx-1">
          <Text className="font-semibold">Eat In</Text>
          <FlatList
            data={order.eatIn}
            contentContainerStyle={{ flex: 1 }}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TableRow
                {...item}
                className={index % 2 ? "bg-[rgba(0,0,0,0.1)]" : ""}
              />
            )}
          />
        </View>
      ) : (
        <></>
      )}

      {order.takeAway.length ? (
        <View className="felx-1">
          <Text className="font-semibold">Take Away</Text>
          <FlatList
            data={order.takeAway}
            contentContainerStyle={{ flex: 1 }}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TableRow
                {...item}
                className={index % 2 ? "bg-[rgba(0,0,0,0.1)]" : ""}
              />
            )}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const TableRow = ({
  name,
  photo_url,
  count,
  price,
  className,
}: Item & {
  className: string;
}) => {
  return (
    <View
      className={clsx(
        "flex-1 flex-row justify-between items-center p-2",
        className,
      )}
    >
      <View className="size-10 aspect-square  relative ">
        <Image
          source={{ uri: photo_url }}
          className="absolute size-full object-center rounded-lg"
        />
      </View>
      <Text>{name}</Text>
      <Text>{price}฿</Text>
      <Text>x{count}</Text>
      <Text>{count * Number(price)}฿</Text>
    </View>
  );
};
