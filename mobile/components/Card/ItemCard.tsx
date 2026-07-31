import { View, Text, Image } from "react-native";
import React, { Children, ReactNode } from "react";
import Item from "@/interface/Item";
import { LinearGradient } from "expo-linear-gradient";
import { styled } from "nativewind";

const LinearGradientStyled = styled(LinearGradient);

export default function ItemCard({
  _id,
  item_collection,
  photo,
  name,
  photo_url,
  price,
  children,
}: Item & {
  children: ReactNode;
}) {
  return (
    <View className="flex gap-2">
      <View className="item-card relative overflow-hidden rounded-2xl ml-3">
        <LinearGradientStyled
          colors={["#000", "#0000"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className=" absolute size-full z-1"
        />
        {photo_url ? (
          <Image
            source={{ uri: photo_url }}
            className="absolute size-full "
            style={{ resizeMode: "cover" }}
          />
        ) : null}
        <View className="absolute bottom-0 inset-x-0 bg-black/50 p-2 flex-col gap-0.5 z-2">
          <Text className="text-white font-bold " numberOfLines={1}>
            {name}
          </Text>

          <Text className="text-white text-sm">{price} ฿</Text>
        </View>
      </View>
      {children}
    </View>
  );
}
