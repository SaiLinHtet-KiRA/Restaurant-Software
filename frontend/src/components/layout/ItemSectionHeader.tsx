type props = {
  text: string;
};

export default function ItemSectionHeader({ text }: props) {
  return <span className="section-title">{text}</span>;
}
