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
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-50 flex flex-row border-t border-slate-200/80 bg-white/90 pt-1 shadow-[0_-6px_24px_-12px_rgba(15,23,42,0.25)] backdrop-blur-md">
        {Apptabs.map(({ name, title }) => {
          const to = name === "index" ? "/" : `/${name}`;
          return (
            <NavLink
              key={name}
              to={to}
              end={name === "index"}
              aria-label={title}
              className={({ isActive }) =>
                `press group relative flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors ${
                  isActive ? "text-sky-600" : "text-slate-400 hover:text-sky-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute -top-1 h-0.5 w-8 rounded-full bg-sky-500 transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    className={`flex size-9 items-center justify-center rounded-xl transition-colors ${
                      isActive ? "bg-sky-50" : "group-hover:bg-sky-50/60"
                    }`}
                  >
                    <span className="block size-6">
                      {TabIcon[name]({
                        color: isActive ? "#0284c7" : "#94a3b8",
                      })}
                    </span>
                  </span>
                  <span className="text-[11px] font-semibold tracking-wide">
                    {title}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
