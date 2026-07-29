import { Text, Pressable, View } from "react-native";
import React, { useState } from "react";
import PlusCirlce from "@/svg/PlusCircle";
import PopUpModal from "../Model/PopUpModal";
import ItemForm from "../Form/ItemForm";

export default function CreateItemCard() {
  const [showModel, setShowMode] = useState<boolean>(false);
  return (
    <>
      <Pressable
        onPress={() => setShowMode(true)}
        className="bg-blue-500 item-card "
      >
        <View className="size-10">
          <PlusCirlce stroke="white" />
        </View>
        <Text className="font-bold text-white text-lg">Add Item</Text>
      </Pressable>
      <PopUpModal modalVisible={showModel} Close={() => setShowMode(false)}>
        <ItemForm />
      </PopUpModal>
    </>
  );
}
