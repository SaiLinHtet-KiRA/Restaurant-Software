import Plate from "@/svg/Plate";
import Table from "@/svg/Table";

export type Tab = {
  name: string;
  title: string;
  svg: SVGComponent;
};
export type TabCollection = {
  title: string;
  tabs: Tab[];
};

export const Apptabs = [
  { name: "index", title: "Home", svg: Table },
  { name: "orders", title: "Order", svg: Table },
  { name: "history", title: "History", svg: Table },
  { name: "more", title: "More", svg: Table },
] as const satisfies Tab[];

export const Moretabs = [
  {
    title: "Management",
    tabs: [
      { name: "item", title: "Items", svg: Plate },
      { name: "table", title: "Table", svg: Table },
    ],
  },
] as const satisfies TabCollection[];

export const PaymentMethods = [
  {
    name: "Cash",
  },
  {
    name: "Scan",
  },
  {
    name: "Credit Card",
  },
];
