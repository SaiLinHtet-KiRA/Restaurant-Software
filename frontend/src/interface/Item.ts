export default interface Item {
  _id: string;
  name: string;
  photo?: File;
  photo_url: string;
  price: number;
  item_collection: string;
  count: number;
}
