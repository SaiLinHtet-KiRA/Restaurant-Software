import { Tabs } from "expo-router";
import { Apptabs } from "@/constants/data";

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
            title: title,
          }}
        />
      ))}
    </Tabs>
  );
}
