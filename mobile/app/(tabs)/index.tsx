import Button from "@/components/Button/Button";
import TableCard from "@/components/Card/TableCard";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import useGetTheme from "@/constants/useGetTheme";
import { useGetTablesQuery } from "@/redux/api/table";
import { clearOrder } from "@/redux/features/Order";
import ShoppingBag from "@/svg/ShoppingBag";
import { router } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";

export default function Index() {
  const dispatch = useDispatch();
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
            onClik={() => {
              dispatch(clearOrder());
              router.push({
                pathname: "/(order)/[number]",
                params: { number: "take-away" },
              });
            }}
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
            renderItem={({ item: { number } }) => (
              <Pressable
                onPress={() => {
                  dispatch(clearOrder());
                  router.push({
                    pathname: "/(order)/[number]",
                    params: { number },
                  });
                }}
              >
                <TableCard number={number} />
              </Pressable>
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
