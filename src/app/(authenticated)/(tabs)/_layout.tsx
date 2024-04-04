import React from "react";
import { Tabs, router, useNavigation } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { dark } from "../../../constants/colors";

export default function _layout() {
  const windowWidth = useWindowDimensions().width;
  const navigation = useNavigation();

  // TODO Find out the difference between useNavigation and useRouter

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: windowWidth > 800 ? true : false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#15141a",
          borderColor: "#15141a",
          shadowColor: "#15141a",
        },
        headerStyle: {
          backgroundColor: dark,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ marginLeft: 20 }}
          >
            <Image
              source={require("../../../assets/images/prettywoman.jpg")}
              resizeMode="contain"
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
          </TouchableOpacity>
        ),
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Feed",
          headerTintColor: "white",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications/all"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="bells" color={color} size={size} />
          ),
          tabBarLabelStyle: { marginLeft: 30 },
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: "#A89CF6", color: "white" },
        }}
      />
    </Tabs>
  );
}
