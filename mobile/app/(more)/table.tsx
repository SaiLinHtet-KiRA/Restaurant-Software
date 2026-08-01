import { ActivityIndicator, FlatList, Text, View } from "react-native";
import React from "react";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import {
  useCreateTableMutation,
  useDeleteTableMutation,
  useGetTablesQuery,
} from "@/redux/api/table";
import Container from "@/components/layout/Container";
import Button from "@/components/Button/Button";
import TableCard from "@/components/Card/TableCard";
import useGetTheme from "@/constants/useGetTheme";
import PlusCirlce from "@/svg/PlusCircle";

export default function Table() {
  const { data, isFetching } = useGetTablesQuery({ taken: false });
  const [create] = useCreateTableMutation();
  const [Remove] = useDeleteTableMutation();
  const { space, numColumns } = useGetTheme();

  const onClick = async () => {
    try {
      await create().unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaViewLayout>
      <StackLayout>
        <Container>
          <View className="md:px-10 flex flex-row justify-between items-center">
            <Text className="font-bold text-2xl md:text-4xl text-white">
              Table({data?.size || "0"})
            </Text>
            <Button
              SVG={PlusCirlce}
              text={"Add Table"}
              onClik={onClick}
              disabled={isFetching}
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
                <TableCard
                  number={number}
                  onClick={
                    number == data?.data.length
                      ? () => {
                          try {
                            Remove(_id).unwrap();
                          } catch (error) {
                            console.log(error);
                          }
                        }
                      : undefined
                  }
                />
              )}
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-white text-xl font-bold">
                There is no tables!!!
              </Text>
            </View>
          )}
        </Container>
      </StackLayout>
    </SafeAreaViewLayout>
  );
}
