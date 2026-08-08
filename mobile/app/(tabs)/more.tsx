import { Pressable, Text, View } from "react-native";
import React from "react";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import { Moretabs } from "@/constants/data";
import { router } from "expo-router";
import TabBadge from "@/components/Buget/TabBadge";

export default function more() {
  return (
    <SafeAreaViewLayout>
      <View className="flex-1 px-6">
        {Moretabs.map(({ tabs, title }) => (
          <View key={title} className="flex-1 gap-4">
            <Text className="font-bold md:text-4xl text-2xl">{title}</Text>
            <View className=" flex-row flex-wrap justify-center-safe gap-x-5 gap-y-3 md:gap-x-10 md:gap-y-6">
              {tabs.map((tab, i) => (
                <Pressable
                  key={title + "-tabs-" + i}
                  onPress={() => router.push(`/${tab.name}`)}
                >
                  <TabBadge {...tab} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </View>
    </SafeAreaViewLayout>
  );
}
