import { View, Text, Button, Pressable } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import Item from "@/interface/Item";
import ImagePickerField from "./Input-Field/ImagePicker";
import InputField from "./Input-Field/InputField";
import Tag from "@/svg/Tag";
import ThaiBaht from "@/svg/ThaiBaht";
import { useCreateItemMutation, useUpdateItemMutation } from "@/redux/api/item";

type props = {
  defaultValues?: Item;
  item_collection: string;
  close: () => void;
};

export default function ItemForm({
  defaultValues,
  item_collection,
  close,
}: props) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Partial<Item>>({
    defaultValues: {
      _id: defaultValues?._id,
      name: defaultValues?.name || "",
      photo_url: defaultValues?.photo_url || "",
      price: defaultValues?.price.toString() || "",
      item_collection: item_collection,
    },
  });

  const [create, { isLoading }] = useCreateItemMutation();
  const [update, { isLoading: UpdateisLoading }] = useUpdateItemMutation();

  const photo_url = watch("photo_url");

  const onSubmit = async (data: Partial<Item>) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name ?? "");

      if (data.photo) {
        formData.append("photo", {
          uri: data.photo.uri,
          name: data.photo.fileName ?? "image.jpg",
          type: data.photo.mimeType ?? "image/jpeg",
        } as any);
      }

      formData.append("price", data.price ?? "");
      formData.append("item_collection", data.item_collection ?? "");

      data._id
        ? await update({ id: data._id, body: formData })
        : await create(formData).unwrap();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className=" w-[80%] flex gap-4 ">
      <Text className="text-xl font-bold">
        {defaultValues ? "Edit Item" : "Create Item"}
      </Text>
      <ImagePickerField setValue={setValue} photo_url={photo_url} />
      <InputField
        Svg={Tag}
        control={control}
        placeholder={"eg.Cake,Colo,Bugger,..."}
        name="name"
        keyboardType="default"
      />
      <InputField
        Svg={ThaiBaht}
        control={control}
        name="price"
        placeholder={"500"}
        keyboardType="numeric"
      />

      {/* {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )} */}
      <View className="flex-row justify-end">
        <Pressable
          className="bg-blue-500 content-end rounded-xl px-4 py-2"
          disabled={isLoading || UpdateisLoading}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-bold text-lg text-center">
            {isLoading ? "Creteing..." : "Create"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
