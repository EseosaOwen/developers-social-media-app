import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { borderRadius, primaryColor } from "../../constants/colors";
import { Button } from "../../constants/components";
import { Link } from "expo-router";
import { Ionicons, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";

export default function Login() {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fontsLoaded, fontsError] = useFonts({
    Inter: Inter_900Black,
    InterRegular: Inter_400Regular,
    InterMedium: Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Title>
            <Text style={{ color: primaryColor }}>Welcome</Text> Back!
          </Title>
          <Description>
            Sign in to access your account and connect with the world on coding
            topics
          </Description>
          <InputView>
            <View style={pageConstants.flexDirectionRow}>
              <MaterialIcons
                name="mail-outline"
                size={20}
                color={"black"}
                style={{ position: "absolute", top: 10, left: 10 }}
              />
              <InputField
                placeholder="Email"
                autoCorrect={false}
                autoComplete="email"
                keyboardType="email-address"
                onChangeText={setEmailField}
                autoCapitalize="none"
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <SimpleLineIcons
                name="lock"
                size={20}
                color={"black"}
                style={{ position: "absolute", top: 10, left: 10 }}
              />
              <InputField
                placeholder="Password"
                autoCorrect={false}
                secureTextEntry
                onChangeText={setPasswordField}
              />
            </View>
          </InputView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <RememberMe>
              <CheckBox
                value={rememberMe}
                onValueChange={setRememberMe}
                color={rememberMe ? primaryColor : "#F4ECEC"}
              />
              <Pressable onPress={() => setRememberMe((oldState) => !oldState)}>
                <Text style={pageConstants.textFont}>Remember Me</Text>
              </Pressable>
            </RememberMe>
            <Text style={[pageConstants.textFont, { color: primaryColor }]}>
              Forgot password?
            </Text>
          </View>
          <Buttons>
            <Button
              style={{ marginBottom: 20 }}
              onPress={() => console.log("pressed")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "#fff",
                  fontFamily: "InterRegular",
                }}
              >
                Sign In
              </Text>
            </Button>
            <BorderLines>
              <BorderLine />
              <Text style={pageConstants.textFont}>or</Text>
              <BorderLine />
            </BorderLines>
            <GoogleButton>
              <Ionicons name="logo-google" size={20} color={primaryColor} />
              <Text
                style={[
                  pageConstants.textFont,
                  pageConstants.textAlignCenter,
                  { fontSize: 18, color: "black" },
                ]}
              >
                Continue with Google
              </Text>
            </GoogleButton>
          </Buttons>
          {/* // ! It's advisable to always add a touchable opacity nested in a link, its better for the opacity click feeling and its also removes that grey onClick background */}
          <Link href={"/register"} replace asChild>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 60,
                marginBottom: 60,
              }}
            >
              <Text
                style={
                  (pageConstants.textFont,
                  {
                    fontSize: 16,
                    color: "gray",
                  })
                }
              >
                {" "}
                Don't have an account?{" "}
              </Text>
              <Text
                style={{
                  color: primaryColor,
                  fontWeight: "600",
                  fontFamily: "InterMedium",
                  fontSize: 16,
                }}
              >
                Create an account
              </Text>
            </TouchableOpacity>
          </Link>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const pageConstants = StyleSheet.create({
  textFont: {
    fontFamily: "InterRegular",
  },
  textAlignCenter: {
    textAlign: "center",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
});

const Container = styled(View)`
  background-color: white;
  padding: 0 14px;
  flex: 1;
`;

const Title = styled(Text)`
  font-size: 45px;
  font-weight: 900;
  margin-bottom: 12px;
  font-family: Inter;
  margin-top: 15px;
`;

const Description = styled(Text)`
  color: #606060;
  font-family: InterRegular;
  font-size: 16px;
`;

const InputView = styled(View)`
  margin-top: 20px;
  gap: 12px;
`;

const InputField = styled(TextInput)`
  border: ${`solid ${StyleSheet.hairlineWidth}px gray`};
  height: 43px;
  border-radius: ${borderRadius};
  padding-left: 40px;
  flex: 1;
  font-size: 16px;
  font-family: InterRegular;
`;

const BorderLines = styled(View)`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const BorderLine = styled(View)`
  flex: 0.5;
  height: ${StyleSheet.hairlineWidth}px;
  background-color: gray;
`;

const Buttons = styled(View)`
  margin-top: 50px;
  margin-bottom: 40px;
`;

const GoogleButton = styled(TouchableOpacity)`
  margin-top: 20px;
  background-color: white;
  flex-direction: row;
  gap: 6px;
  justify-content: center;
  border: ${`solid ${StyleSheet.hairlineWidth}px gray`};
  padding: 13px;
  border-radius: ${borderRadius};
`;

const RememberMe = styled(View)`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

// const [labelTransition, setLabelTransition] = useState({
//   emailLabel: false,
//   passwordLabel: false,
// });

// function handleInputFocus(label: string) {
//   setLabelTransition((oldLabelTransition) => {
//     return {
//       ...oldLabelTransition,
//       [label]: true,
//     };
//   });
// }

// function handleRemoveFocus(label: string) {
//   setLabelTransition((oldLabelTransition) => {
//     return {
//       ...oldLabelTransition,
//       [label]: false,
//     };
//   });
// }
