import { Tabs } from "expo-router";
import { Apptabs } from "@/constants/data";
import HomeSvg from "@/svg/Home";
import ShoppingBagSvg from "@/svg/ShoppingBag";
import ListBulletSvg from "@/svg/ListBullet";
import EllipsisHorizontalCircleSvg from "@/svg/EllipsisHorizontalCircle";

const TabIcon: Record<string, (props: { color: string }) => React.JSX.Element> =
  {
    index: (props) => <HomeSvg stroke={props.color} width={24} height={24} />,
    orders: (props) => (
      <ShoppingBagSvg stroke={props.color} width={24} height={24} />
    ),
    history: (props) => (
      <ListBulletSvg stroke={props.color} width={24} height={24} />
    ),
    more: (props) => (
      <EllipsisHorizontalCircleSvg
        stroke={props.color}
        width={24}
        height={24}
      />
    ),
  };

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      {Apptabs.map(({ name, title }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: TabIcon[name],
          }}
        />
      ))}
    </Tabs>
  );
}
