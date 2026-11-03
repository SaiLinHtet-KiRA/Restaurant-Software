import type Item from "@/interface/Item";

export default function FilterItem(data: Item[], _id: string) {
  return data.filter((item) => item._id == _id)[0];
}
