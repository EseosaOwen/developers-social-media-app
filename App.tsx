import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

import AppProvider from "./src/provider/AppProvider";

SplashScreen.preventAutoHideAsync();

function DemoText() {
  return (
    <View>
      <Text style={{ fontFamily: "Inter" }}>
        Open up App.tsx to start working on your app!
      </Text>
    </View>
  );
}

export default function App() {
  const isLoggedIn = true;
  // const [isAppReady, setIsAppReady] = useState(false);
  const [fontloaded, fontError] = useFonts({ Inter: Inter_900Black }); // * The hook gives us access to booleans that can be used to hide the SplashScreen

  useEffect(() => {
    if (fontloaded || fontError) {
      SplashScreen.hideAsync(); // ! Hide the Splash screen if font is loaded
    }
  }, [fontloaded, fontError]);

  if (!fontloaded && !fontError) {
    return null;
  } //* making sure not to display the main content until font is loaded(could be anything not just fonts)

  return (
    <AppProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <View>
            <Text>Logged In</Text>
          </View>
        ) : (
          <View>
            <Text>Login</Text>
          </View>
        )}
        <DemoText />
      </NavigationContainer>
    </AppProvider>
  );
}
