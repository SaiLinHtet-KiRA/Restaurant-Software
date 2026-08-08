import Order from "./Order";

export default interface History extends Order {
  paymentMethod: string;
}
