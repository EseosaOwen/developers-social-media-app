import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppProvider from "../provider/AppProvider";
import { Stack, router, useSegments } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";


function RootLayoutNav() {
  const segments = useSegments();
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

  console.log("Mamnner zone");

  useEffect(() => {
    console.log(isLoggedIn);
    const inAuthGroup = segments[0] === "(authenticated)";

    if (isLoggedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/home");
    } else {
      router.replace("/");
    }
  }, [isLoggedIn]);

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)/login"
        options={{
          title: "",
          headerBackTitle: "",
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.replace("/")}>
                <Ionicons name="arrow-back" size={25} color={"black"} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="(authenticated)"
        options={{
          title: "Drawer Nav",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(splash)/animation"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <RootLayoutNav />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
