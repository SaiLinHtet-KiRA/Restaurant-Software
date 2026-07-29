import { Image, Pressable, Text, View, Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Photo from "@/svg/Photo";
import { UseFormSetValue } from "react-hook-form";
import Item from "@/interface/Item";

type props = {
  setValue: UseFormSetValue<Partial<Item>>;
  photo_url?: string;
};

export default function ImagePickerField({ setValue, photo_url }: props) {
  const pickImage = async () => {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (!granted) {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        if (!permission.canAskAgain) {
          Alert.alert(
            "Permission Required",
            "Photo library access was denied. Please enable it in Settings.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Open Settings", onPress: () => Linking.openSettings() },
            ],
          );
        }
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setValue("photo", result.assets[0]);

      setValue("photo_url", result.assets[0].uri);
    }
  };

  return (
    <Pressable
      onPress={pickImage}
      className="bg-gray-500/60 outline-3  outline-dashed outline-white !w-full item-card overflow-hidden relative"
    >
      {photo_url ? (
        <Image source={{ uri: photo_url }} className="absolute size-full" />
      ) : (
        <>
          <View className="size-10">
            <Photo stroke="white" />
          </View>
          <Text className="font-bold text-white text-lg">Add Image</Text>
        </>
      )}
    </Pressable>
  );
}
