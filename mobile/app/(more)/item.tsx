import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import Container from "@/components/layout/Container";

import PlusButton from "@/components/Button/PlusButton";
import {
  useCreateItemCollectionMutation,
  useGetItemCollectionsQuery,
} from "@/redux/api/item-collection";
import ItemsSection from "@/components/layout/ItemsSection";

export default function Table() {
  const { data, isFetching } = useGetItemCollectionsQuery();
  const [create] = useCreateItemCollectionMutation();

  const onClick = async () => {
    try {
      await create({ name: "New Section" }).unwrap();
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
              Items
            </Text>
            <PlusButton
              text={"Add Section"}
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
          ) : data?.data.length ? (
            <ItemsSection data={data.data} />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-white text-xl font-bold">
                There is no items!!!
              </Text>
            </View>
          )}
        </Container>
      </StackLayout>
    </SafeAreaViewLayout>
  );
}
