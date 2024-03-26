import { View, Text } from "react-native";
import React from "react";
import { Link, Redirect, useFocusEffect, useRouter } from "expo-router";
import OnboardingScreen from "./onboarding";

export default function Page() {
  const isLoggedIn = false;
  const router = useRouter();

  useFocusEffect(() => {
    if (!isLoggedIn) router.replace("/onboarding");
  });
}
