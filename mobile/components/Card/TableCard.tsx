import { View, Text } from "react-native";
import React from "react";
import Table from "@/svg/Table";
import XButton from "../Button/XButton";

type prop = {
  number: number;
  onClick?: () => void;
};

export default function TableCard({ number, onClick }: prop) {
  return (
    <View className="relative bg-white w-45 md:w-60 aspect-square rounded-2xl overflow-hidden">
      <View className=" bg-black opacity-55">
        <Table className="size-full scale-110" />
      </View>
      <View className="absolute top-2 left-2 bg-white/80 px-3 py-1.5 rounded-2xl">
        <Text className="font-bold">#{number}</Text>
      </View>
      {onClick && (
        <XButton
          text="Remove"
          onClik={onClick}
          className="absolute bottom-2 right-2"
        />
      )}
    </View>
  );
}
