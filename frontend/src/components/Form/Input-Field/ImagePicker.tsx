import type { ChangeEvent } from "react";
import type { UseFormSetValue } from "react-hook-form";
import Photo from "@/svg/Photo";
import type { ItemFormValues } from "../types";

type props = {
  setValue: UseFormSetValue<ItemFormValues>;
  photo_url?: string;
};

export default function ImagePickerField({ setValue, photo_url }: props) {
  const pickImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("photo", file);
    setValue("photo_url", URL.createObjectURL(file));
  };

  return (
    <label className="bg-white outline-3 outline-dashed outline-black w-full! item-card overflow-hidden relative cursor-pointer">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={pickImage}
      />
      {photo_url ? (
        <img
          src={photo_url}
          alt="preview"
          className="absolute size-full object-cover"
        />
      ) : (
        <>
          <span className="block size-10">
            <Photo stroke="black" />
          </span>
          <span className="font-bold text-black text-lg">Add Image</span>
        </>
      )}
    </label>
  );
}
