export type Tab = {
  name: string;
  title: string;
};
export type TabCollection = {
  title: string;
  tabs: Tab[];
};

export const Apptabs = [
  { name: "index", title: "Home" },
  { name: "orders", title: "Order" },
  { name: "history", title: "History" },
  { name: "more", title: "More" },
] as const satisfies Tab[];

export const Moretabs = [
  {
    title: "Management",
    tabs: [
      { name: "item", title: "Items" },
      { name: "table", title: "Table" },
    ],
  },
] as const satisfies TabCollection[];
