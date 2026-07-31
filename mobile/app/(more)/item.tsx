import { View, Text, ActivityIndicator } from "react-native";
import React, { useRef } from "react";
import type { ScrollView } from "react-native";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import Container from "@/components/layout/Container";

import Button from "@/components/Button/Button";
import {
  useCreateItemCollectionMutation,
  useGetItemCollectionsQuery,
} from "@/redux/api/item-collection";
import ItemSection from "@/components/layout/ItemSection";
import PlusCirlce from "@/svg/PlusCircle";

export default function Table() {
  const scrollRef = useRef<ScrollView>(null);
  const { data, isFetching, isLoading } = useGetItemCollectionsQuery();
  const [create] = useCreateItemCollectionMutation();

  const onClick = async () => {
    try {
      await create({ name: "New Section" }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaViewLayout ref={scrollRef}>
      <StackLayout>
        <Container>
          <View className="md:px-10 flex flex-row justify-between items-center">
            <Text className="font-bold text-2xl md:text-4xl text-white">
              Items
            </Text>
            <Button
              SVG={PlusCirlce}
              text={"Add Section"}
              onClik={onClick}
              disabled={isFetching}
            />
          </View>
          {isLoading ? (
            <ActivityIndicator
              className="flex-1 justify-center"
              size="large"
              color={"#fffff"}
            />
          ) : data?.data.length ? (
            <ItemSection data={data.data} />
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
