import React from "react";
import { Tabs } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";

export default function _layout() {
  const windowWidth = useWindowDimensions().width;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: windowWidth > 800 ? true : false,
        tabBarActiveTintColor: "white",
        tabBarStyle: { backgroundColor: "black", borderColor: "black", shadowColor: "black" },
        headerLeft: () => <DrawerToggleButton />,
      }}
    >
      <Tabs.Screen
        name="home/feed"
        options={{
          title: "Feed",
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
