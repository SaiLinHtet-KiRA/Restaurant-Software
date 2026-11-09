import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import type ItemCollection from "@/interface/ItemCollection";
import { useUpdateItemCollectionMutation } from "@/redux/api/item-collection";
import PencilSquare from "@/svg/PencilSquare";
import Button from "../Button/Button";

export default function InputItemSectionHeader(
  props: Omit<ItemCollection, "items">,
) {
  const path = useLocation().pathname;
  const IsAdd = path.includes("/take-away") || path.includes("/eat-in");

  return IsAdd ? (
    <UnEditableHeader {...props} />
  ) : (
    <EditableHeader {...props} />
  );
}

const EditableHeader = ({ _id, name, size }: Omit<ItemCollection, "items">) => {
  const { number } = useParams();

  const { control, handleSubmit, setFocus, watch } = useForm<
    Omit<ItemCollection, "items">
  >({
    defaultValues: {
      _id,
      name: name,
    },
  });
  const [update] = useUpdateItemCollectionMutation();
  const [confirm, setConfirm] = useState<boolean>(false);

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
    <div className="flex flex-row justify-between items-center w-full">
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <div className="relative flex flex-row gap-1 items-center ">
            <input
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={() => {
                setConfirm(false);
              }}
              onFocus={() => setConfirm(true)}
              ref={field.ref}
              className="header-text bg-transparent outline-none transition-[border-color] focus:border-b-2 focus:border-white/80"
              aria-label="Section name"
            />
            <span className="section-title">({size})</span>
          </div>
        )}
      />
      <div>
        {number ? (
          <></>
        ) : name !== liveName || confirm ? (
          <Button
            className="bg-green-500!"
            SVG={PencilSquare}
            text="Confirm"
            onClik={handleSubmit(onSubmit)}
            disabled={false}
          />
        ) : (
          <Button
            className="bg-slate-800!"
            SVG={PencilSquare}
            text="Edit"
            onClik={() => {
              setFocus("name");
              setConfirm(true);
            }}
            disabled={false}
          />
        )}
      </div>
    </div>
  );
};

const UnEditableHeader = ({
  name,
  size,
}: Omit<ItemCollection, "items">) => (
  <span className="header-text ">{`${name}(${size})`}</span>
);
