import { View, Text, Button, Pressable } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import Item from "@/interface/Item";
import ImagePickerField from "./Input-Field/ImagePicker";
import InputField from "./Input-Field/InputField";
import Tag from "@/svg/Tag";
import ThaiBaht from "@/svg/ThaiBaht";
import { useCreateItemMutation } from "@/redux/api/item";

type props = {
  defaultValues?: Item;
};

export default function ItemForm({ defaultValues }: props) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Partial<Item>>({
    defaultValues: { name: "", photo_url: "", price: "" },
  });

  const [create] = useCreateItemMutation();
  const photo_url = watch("photo_url");

  const onSubmit = async (data: Partial<Item>) => {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("name", data.name ?? "");

      if (data.photo) {
        const response = await fetch(data.photo.uri);
        const blob = await response.blob();
        formData.append("photo", blob, data.photo.fileName ?? "image.jpg");
      }

      formData.append("price", data.price ?? "");
      await create(formData).unwrap();
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
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-bold text-lg text-center">
            Create
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
