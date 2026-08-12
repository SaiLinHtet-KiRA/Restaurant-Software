import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ItemCollection from "@/interface/ItemCollection";
import { useUpdateItemCollectionMutation } from "@/redux/api/item-collection";
import PencilSquare from "@/svg/PencilSquare";
import Button from "../Button/Button";
import { useLocalSearchParams, usePathname } from "expo-router";

export default function InputItemSectionHeader(
  props: Omit<ItemCollection, "items">,
) {
  const path = usePathname();
  const IsAdd = path.includes("/take-away") || path.includes("/eat-in");

  return IsAdd ? (
    <UnEditableHeader {...props} />
  ) : (
    <EditableHeader {...props} />
  );
}

const EditableHeader = ({ _id, name, size }: Omit<ItemCollection, "items">) => {
  const { number } = useLocalSearchParams();

  const { control, handleSubmit, setFocus, watch } = useForm<
    Omit<ItemCollection, "items">
  >({
    defaultValues: {
      _id,
      name: name,
    },
  });
  const [update] = useUpdateItemCollectionMutation();
  const [confirm, setConfirm] = useState<Boolean>(false);

  const onSubmit = async (data: Omit<ItemCollection, "items">) => {
    try {
      await update(data).unwrap();
      setConfirm(false);
    } catch (error) {
      console.log(error);
    }
  };
  const liveName = watch("name");
  return (
    <View className="flex-row justify-between items-center w-full">
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <View className="relative  flex-row gap-1 items-center ">
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={() => {
                setConfirm(false);
              }}
              onFocus={() => setConfirm(true)}
              ref={field.ref}
              className="header-text focus:border-b-2 focus:border-white/80 "
            />
            <Text className="text-white font-bold text-xl">({size})</Text>
          </View>
        )}
      />
      <TextInput />
      <View>
        {number ? (
          <></>
        ) : name !== liveName || confirm ? (
          <Button
            className="!bg-green-500 !scale-[0.9]"
            SVG={PencilSquare}
            text="confirm"
            onClik={handleSubmit(onSubmit)}
            disabled={false}
          />
        ) : (
          <Button
            className="!bg-black !scale-[0.9]"
            SVG={PencilSquare}
            text="Edit"
            onClik={() => {
              setFocus("name");
              setConfirm(true);
            }}
            disabled={false}
          />
        )}
      </View>
    </View>
  );
};

const UnEditableHeader = ({
  _id,
  name,
  size,
}: Omit<ItemCollection, "items">) => (
  <Text className="header-text ">{`${name}(${size})`}</Text>
);
