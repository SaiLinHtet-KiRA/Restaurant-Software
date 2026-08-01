import Button from "@/components/Button/Button";
import TableCard from "@/components/Card/TableCard";
import Container from "@/components/layout/Container";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import useGetTheme from "@/constants/useGetTheme";
import { useGetTablesQuery } from "@/redux/api/table";
import ShoppingBag from "@/svg/ShoppingBag";
import { router } from "expo-router";
import { View, Text, ActivityIndicator, FlatList } from "react-native";

export default function Index() {
  const { data, isFetching } = useGetTablesQuery({ taken: false });
  const { space, numColumns } = useGetTheme();

  return (
    <SafeAreaViewLayout className="px-10">
      <View className="px-6  pt-8 flex flex-1 gap-3">
        <View className="md:px-10 flex flex-row justify-between items-center">
          <Text className="font-bold text-2xl md:text-4xl text-black">
            Table({data?.size || "0"})
          </Text>
          <Button
            SVG={ShoppingBag}
            disabled={false}
            onClik={() =>
              router.push({
                pathname: "/(order)/[number]",
                params: { number: "take-away" },
              })
            }
            text="Take Away"
          />
        </View>
        {isFetching ? (
          <ActivityIndicator
            className="flex-1 justify-center"
            size="large"
            color={"#fffff"}
          />
        ) : data?.size ? (
          <FlatList
            data={data.data}
            numColumns={numColumns}
            className="self-center"
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            contentContainerStyle={{ gap: space }}
            columnWrapperStyle={{ gap: space }}
            key={numColumns}
            renderItem={({ item: { number, _id } }) => (
              <TableCard number={number} />
            )}
          />
        ) : (
          <View className="flex flex-1  h- justify-center items-center">
            <Text className="text-black text-xl font-bold">
              There is no tables!!!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaViewLayout>
  );
}
