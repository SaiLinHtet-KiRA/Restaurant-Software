import React from "react";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import Container from "@/components/layout/Container";
import ItemSection from "@/components/layout/ItemSection";
import { useGetItemCollectionsQuery } from "@/redux/api/item-collection";
import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native";
import AddedItemSectionFooter from "@/components/footer/AddedItemSectionFooter";

export default function AddItem() {
  const { data, isFetching, isLoading } = useGetItemCollectionsQuery();

  return (
    <>
      <SafeAreaViewLayout>
        <StackLayout>
          <Container>
            <View className="md:px-10 flex flex-row justify-between items-center">
              <Text className="font-bold text-2xl md:text-4xl text-white">
                Items
              </Text>
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
      <AddedItemSectionFooter />
    </>
  );
}
