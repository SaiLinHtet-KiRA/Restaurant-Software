import { useNavigate } from "react-router-dom";
import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import { Moretabs } from "@/constants/data";
import TabBadge from "@/components/Buget/TabBadge";

export default function More() {
  const navigate = useNavigate();
  return (
    <SafeAreaViewLayout>
      <div className="flex-1 px-6">
        {Moretabs.map(({ tabs, title }) => (
          <div key={title} className="flex flex-col flex-1 gap-4">
            <span className="font-bold md:text-4xl text-2xl">{title}</span>
            <div className="flex flex-row flex-wrap justify-center gap-x-5 gap-y-3 md:gap-x-10 md:gap-y-6">
              {tabs.map((tab, i) => (
                <button
                  type="button"
                  key={title + "-tabs-" + i}
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
