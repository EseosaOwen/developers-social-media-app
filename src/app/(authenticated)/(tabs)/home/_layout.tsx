import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Stack, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

export default function Layout() {
  const navigation = useNavigation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
                style={{ marginLeft: 20, marginRight: 20 }}
              >
                <Image
                  source={require("../../../../assets/images/prettywoman.jpg")}
                  resizeMode="contain"
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                />
              </TouchableOpacity>
            );
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="feed"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
