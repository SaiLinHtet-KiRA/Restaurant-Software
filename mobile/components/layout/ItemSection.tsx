import { View, Alert } from "react-native";
import React, { useState } from "react";
import ItemCollection from "@/interface/ItemCollection";
import PencilSquare from "@/svg/PencilSquare";
import PopUpModal from "../Model/PopUpModal";
import ItemForm from "../Form/ItemForm";
import Button from "../Button/Button";
import Trash from "@/svg/Trash";
import Item from "@/interface/Item";
import { useDeleteItemMutation } from "@/redux/api/item";
import InputItemSectionHeader from "./InputInputItemSectionHeader";
import ItemList from "./ItemList";
import { useLocalSearchParams } from "expo-router";
import ItemCardAddFooter from "../footer/ItemCardAddFooter";

type props = {
  data: ItemCollection[];
};

export default function ItemSection({ data }: props) {
  const { type } = useLocalSearchParams();
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
          className="bg-bg-sec px-4 py-6 rounded-xl outline-2 outline-white/30"
        >
          <ItemList
            items={items}
            add={() => setShowModal(_id)}
            header={
              <InputItemSectionHeader name={name} size={size} _id={_id} />
            }
          >
            {(item: Item) =>
              type ? (
                <ItemCardAddFooter item={item} />
              ) : (
                <View className="flex-1 h-10 flex-row ">
                  <Button
                    className="scale-[0.9] !bg-sky-500"
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
              )
            }
          </ItemList>
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
