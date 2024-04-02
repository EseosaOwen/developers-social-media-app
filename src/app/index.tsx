import React from "react";
import { useFocusEffect, useRouter } from "expo-router";

export default function Page() {
  const isLoggedIn = false;
  const router = useRouter();

  useFocusEffect(() => {
    if (!isLoggedIn) router.replace("/onboarding");
  });
}
