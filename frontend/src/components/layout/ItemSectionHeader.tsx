type props = {
  text: string;
};

export default function ItemSectionHeader({ text }: props) {
  return <span className="text-xl font-bold text-white ">{text}</span>;
}
