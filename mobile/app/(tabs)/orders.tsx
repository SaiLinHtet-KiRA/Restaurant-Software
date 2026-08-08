import { View, Text, ActivityIndicator } from "react-native";
import React, { useId } from "react";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import { useGetOrdersQuery } from "@/redux/api/order";
import OrderCard from "@/components/Card/OrderCard";

export default function Orders() {
  const { data, isFetching } = useGetOrdersQuery();
  const id = useId();
  return (
    <SafeAreaViewLayout className="px-10">
      <View className="px-6  pt-8 flex flex-1 gap-3">
        <View className="md:px-10 flex flex-row justify-between items-center">
          <Text className="font-bold text-2xl md:text-4xl text-black">
            Order ({data?.size || "0"})
          </Text>
        </View>
        {isFetching ? (
          <ActivityIndicator
            className="flex-1 justify-center"
            size="large"
            color={"#fffff"}
          />
        ) : data?.size ? (
          data?.data.map((order) => (
            <OrderCard {...order} key={id + order.id} />
          ))
        ) : (
          <View className="flex flex-1  h- justify-center items-center">
            <Text className="text-black text-xl font-bold">
              There is no order!!!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaViewLayout>
  );
}
