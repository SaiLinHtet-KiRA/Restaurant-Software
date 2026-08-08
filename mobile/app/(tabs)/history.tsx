import HistoryCard from "@/components/Card/HistoryCard";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import { useGetHistorysQuery } from "@/redux/api/history";
import { useId } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function Historys() {
  const { data, isFetching } = useGetHistorysQuery();
  const id = useId();
  return (
    <SafeAreaViewLayout className="px-10">
      <View className="px-6  pt-8 flex flex-1 gap-3">
        <View className="md:px-10 flex flex-row justify-between items-center">
          <Text className="font-bold text-2xl md:text-4xl text-black">
            History ({data?.size || "0"})
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
            <HistoryCard {...order} key={id + order.id} />
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
