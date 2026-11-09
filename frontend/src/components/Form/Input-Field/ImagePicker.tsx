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
    <label className="relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl bg-white/70 outline-2 outline-dashed outline-slate-400 transition hover:bg-white hover:outline-sky-500">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={pickImage}
      />
      {photo_url ? (
        <>
          <img
            src={photo_url}
            alt="preview"
            className="absolute size-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white opacity-0 transition-opacity hover:opacity-100">
            Change image
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="flex size-10 items-center justify-center rounded-full bg-slate-100 p-2.5">
            <Photo stroke="currentColor" />
          </span>
          <span className="text-sm font-semibold">Add Image</span>
        </div>
      )}
    </label>
  );
}
