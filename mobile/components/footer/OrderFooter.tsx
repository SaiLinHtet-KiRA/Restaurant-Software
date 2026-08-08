import { View, Text, Pressable } from "react-native";
import React from "react";
import useGetTheme from "@/constants/useGetTheme";
import { LinearGradient } from "expo-linear-gradient";
import { styled } from "nativewind";
import useGetTotalPrice from "@/hook/GetTotalPrice";
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
} from "@/redux/api/order";
import { useAppSelector } from "@/redux/store";
import { router, usePathname } from "expo-router";

const LinearGradientStyled = styled(LinearGradient);

export default function OrderFooter() {
  const path = usePathname();
  const IsUpdate = path === "/update";
  const order = useAppSelector(({ order }) => order);
  const [create, { isLoading }] = useCreateOrderMutation();
  const [update, { isLoading: updating }] = useUpdateOrderMutation();

  const { height, insetsBottom } = useGetTheme();

  const TotalPrice = useGetTotalPrice();

  const Handler = async () => {
    try {
      if (IsUpdate)
        await update({ id: order._id!, body: { ...order, price: TotalPrice } });
      else await create({ ...order, price: TotalPrice }).unwrap;

      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      className="absolute flex bottom-0 left-0 right-0 "
      style={{ height: height * 0.15 + insetsBottom }}
    >
      <View className="relative h-[30%] ">
        <LinearGradientStyled
          colors={["#0000", "#0084bf"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute size-full"
          style={{ zIndex: 10 }}
        />
      </View>
      <View className="flex-1 bg-bg-sec pl-6 px-5 pt-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-white font-bold text-2xl">
            Total {TotalPrice}฿
          </Text>
          <Pressable
            onPress={Handler}
            disabled={isLoading}
            className="rounded-2xl bg-sky-500 px-5 py-2"
          >
            <Text className="text-white font-bold text-lg">
              {IsUpdate
                ? updating
                  ? "Updating Order"
                  : "Update Order"
                : isLoading
                  ? "Creating Order"
                  : "Create Order"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
