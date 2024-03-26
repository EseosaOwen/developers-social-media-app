import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Login() {
  return (
    <SafeAreaView>
      <Text>Login Page</Text>
      <Link href={"/(drawer)/(tabs)/home/feed"} asChild replace>
        <Text>Login</Text>
      </Link>
      <Link href={"/onboarding"}>Go back to onboarding</Link>
    </SafeAreaView>
  );
}
