import { useNavigate } from "react-router-dom";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import { Moretabs } from "@/constants/data";
import TabBadge from "@/components/Buget/TabBadge";

export default function More() {
  const navigate = useNavigate();
  return (
    <SafeAreaViewLayout>
      <div className="screen">
        {Moretabs.map(({ tabs, title }) => (
          <div key={title} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="page-title">{title}</span>
              <span className="page-subtitle">
                Manage your restaurant setup
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tabs.map((tab, i) => (
                <button
                  type="button"
                  key={title + "-tabs-" + i}
                  className="rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
                  onClick={() => navigate(`/${tab.name}`)}
                >
                  <TabBadge {...tab} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SafeAreaViewLayout>
  );
}
