import { useState } from "react";
import { useParams } from "react-router-dom";
import type ItemCollection from "@/interface/ItemCollection";
import type Item from "@/interface/Item";
import PencilSquare from "@/svg/PencilSquare";
import Trash from "@/svg/Trash";
import { useDeleteItemMutation } from "@/redux/api/item";
import PopUpModal from "../Model/PopUpModal";
import ItemForm from "../Form/ItemForm";
import Button from "../Button/Button";
import InputItemSectionHeader from "./InputItemSectionHeader";
import ItemList from "./ItemList";
import ItemCardAddFooter from "../footer/ItemCardAddFooter";

type props = {
  data: ItemCollection[];
};

export default function ItemSection({ data }: props) {
  const { type } = useParams();
  const [showModal, setShowModal] = useState<string | null>(null);

  const [defaultValues, setDefaultValues] = useState<Item | undefined>(
    undefined,
  );
  const [deleteItem] = useDeleteItemMutation();

  const DeleteItem = (item: Item) => {
    if (
      window.confirm(`Are you sure you want to delete "${item.name}"?`)
    ) {
      deleteItem(item._id);
    }
  };

  return (
    <>
      {data.map(({ _id, items, name, size }) => (
        <div
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
                <div className="flex-1 h-10 flex flex-row ">
                  <Button
                    className="scale-[0.9] bg-sky-500!"
                    SVG={PencilSquare}
                    disabled={false}
                    text="Edit"
                    onClik={() => {
                      setDefaultValues(item);
                      setShowModal(_id);
                    }}
                  />
                  <Button
                    className="scale-[0.9] bg-red-500!"
                    SVG={Trash}
                    disabled={false}
                    text="Delete"
                    onClik={() => DeleteItem(item)}
                  />
                </div>
              )
            }
          </ItemList>
        </div>
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
