import { ImagePickerAsset } from "expo-image-picker";

export default interface Item {
  _id: string;
  name: string;
  photo: ImagePickerAsset;
  photo_url: string;
  price: number;
  item_collection: string;
  count: number;
}
