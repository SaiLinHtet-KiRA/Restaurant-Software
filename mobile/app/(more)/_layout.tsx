import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="item" options={{ headerShown: false }} />
      <Stack.Screen name="table" options={{ headerShown: false }} />
    </Stack>
  );
}
