import { useForm } from "react-hook-form";
import type Item from "@/interface/Item";
import ImagePickerField from "./Input-Field/ImagePicker";
import InputField from "./Input-Field/InputField";
import Tag from "@/svg/Tag";
import ThaiBaht from "@/svg/ThaiBaht";
import { useCreateItemMutation, useUpdateItemMutation } from "@/redux/api/item";
import type { ItemFormValues } from "./types";

type props = {
  defaultValues?: Item;
  item_collection: string;
  close: () => void;
};

export default function ItemForm({ defaultValues, item_collection, close }: props) {
  const { control, handleSubmit, setValue, watch } = useForm<ItemFormValues>({
    defaultValues: {
      _id: defaultValues?._id,
      name: defaultValues?.name || "",
      photo_url: defaultValues?.photo_url || "",
      price: defaultValues?.price?.toString() || "",
      item_collection: item_collection,
    },
  });

  const [create, { isLoading }] = useCreateItemMutation();
  const [update, { isLoading: UpdateisLoading }] = useUpdateItemMutation();

  const photo_url = watch("photo_url");

  const onSubmit = async (data: ItemFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name ?? "");

      if (data.photo) {
        formData.append("photo", data.photo);
      }

      formData.append("price", String(data.price ?? ""));
      formData.append("item_collection", data.item_collection ?? "");

      if (data._id) {
        await update({ id: data._id, body: formData }).unwrap();
      } else {
        await create(formData).unwrap();
      }
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[80%] flex flex-col gap-4 ">
      <span className="text-xl font-bold">
        {defaultValues ? "Edit Item" : "Create Item"}
      </span>
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

      <div className="flex flex-row justify-end">
        <button
          type="button"
          className="bg-blue-500 rounded-xl px-4 py-2"
          disabled={isLoading || UpdateisLoading}
          onClick={handleSubmit(onSubmit)}
        >
          <span className="text-white font-bold text-lg text-center">
            {isLoading ? "Creteing..." : "Create"}
          </span>
        </button>
      </div>
    </div>
  );
}
