import { NavLink, Outlet } from "react-router-dom";
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

export default function TabsLayout() {
  return (
    <div className="min-h-screen bg-bg pb-16">
      <Outlet />
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex flex-row bg-white border-t border-gray-200">
        {Apptabs.map(({ name, title }) => {
          const to = name === "index" ? "/" : `/${name}`;
          return (
            <NavLink
              key={name}
              to={to}
              end={name === "index"}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center gap-1 py-2 ${
                  isActive ? "text-sky-600" : "text-gray-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="block size-6">
                    {TabIcon[name]({ color: isActive ? "#0284c7" : "#9ca3af" })}
                  </span>
                  <span className="text-xs font-semibold">{title}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
