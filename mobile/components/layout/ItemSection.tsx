import {
  View,
  Text,
  FlatList,
  ScrollView,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import React, { ReactNode, useState } from "react";
import ItemCollection from "@/interface/ItemCollection";
import PencilSquare from "@/svg/PencilSquare";
import PopUpModal from "../Model/PopUpModal";
import ItemForm from "../Form/ItemForm";
import ItemCard from "../Card/ItemCard";
import PlusCirlce from "@/svg/PlusCircle";
import Button from "../Button/Button";
import Trash from "@/svg/Trash";
import Item from "@/interface/Item";
import { useDeleteItemMutation } from "@/redux/api/item";
import ItemSectionHeader from "./ItemSectionHeader";
import { KeyboardAvoidingView } from "react-native";

type props = {
  data: ItemCollection[];
  card?: ReactNode;
};

export default function ItemSection({ data, card }: props) {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [defaultValues, setDefaultValues] = useState<Item | undefined>(
    undefined,
  );
  const [deleteItem] = useDeleteItemMutation();

  const DeleteItem = (item: Item) => {
    Alert.alert(
      `Confirm Deletion`,
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => deleteItem(item._id) },
      ],
    );
  };
  return (
    <>
      {data.map(({ _id, items, name, size }) => (
        <View
          key={_id}
          className="bg-[rgba(0,0,0,0.2)] px-4 py-6 rounded-xl outline-2 outline-white/30"
        >
          <ItemSectionHeader name={name} size={size} _id={_id} />
          <ScrollView className="flex-row w-full" horizontal>
            <View className=" flex-row  px-5 py-4 items-center">
              <Pressable
                onPress={() => setShowModal(_id)}
                className="p-4 rounded-2xl bg-sky-500 mx-3"
              >
                <View className="size-10 ">
                  <PlusCirlce stroke="white" />
                </View>
              </Pressable>
              <FlatList
                data={items}
                horizontal
                ListHeaderComponentStyle={{ justifyContent: "flex-start" }}
                className="self-center "
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                key={items.length}
                renderItem={({ item }) => (
                  <ItemCard key={item._id} {...item}>
                    <View className="flex-row rounded-2xl justify-evenly">
                      <Button
                        className="scale-[0.9]  !bg-sky-500"
                        SVG={PencilSquare}
                        disabled={false}
                        text="Edit"
                        onClik={() => {
                          setDefaultValues(item);
                          setShowModal(_id);
                        }}
                      />
                      <Button
                        className="scale-[0.9] !bg-red-500"
                        SVG={Trash}
                        disabled={false}
                        text="Delete"
                        onClik={() => DeleteItem(item)}
                      />
                    </View>
                  </ItemCard>
                )}
              />
            </View>
          </ScrollView>
        </View>
      ))}

      {showModal && (
        <PopUpModal modalVisible={showModal} Close={() => setShowModal(null)}>
          <ItemForm
            item_collection={showModal}
            defaultValues={defaultValues}
            close={() => setShowModal(null)}
          />
        </PopUpModal>
      )}
    </>
  );
}
