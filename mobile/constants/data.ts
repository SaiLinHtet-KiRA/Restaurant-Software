export type Tab = {
  name: string;
  title: string;
};
export type TabCollection = {
  title: string;
  tabs: Tab[];
};

export const Apptabs: Tab[] = [
  { name: "index", title: "Home" },
  { name: "orders", title: "Order" },
  { name: "history", title: "History" },
  { name: "more", title: "More" },
];

export const Moretabs: TabCollection[] = [
  {
    title: "Management",
    tabs: [
      { name: "item", title: "Items" },
      { name: "table", title: "Table" },
    ],
  },
];
