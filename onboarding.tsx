import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import {
  Inter_100Thin,
  Inter_600SemiBold,
  Inter_400Regular,
  useFonts,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Link, router } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { Button } from "./src/constants/components";

type TSteps = {
  active: boolean;
};

const onboardingSteps = [
  {
    icon: "people-arrows",
    title: "Join in the Buzz",
    description:
      "Don't miss tech conversations happening right now. Jump into the feed, see what's trending, and join the buzz before it fades.",
  },
  {
    icon: "code",
    title: "Code and connect",
    description:
      "Dive into a world of diverse skills, spark new connections, and share your knowledge.",
  },
  {
    icon: "link",
    title: "Build Better. Share Freely",
    description:
      "Showcase your projects, get feedback, and collaborate on building the future.",
  },
];

export default function OnboardingScreen() {
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  // ========= Move the onboarding screen's steps
  useEffect(() => {
    // * This function is called wheneever screenIndex changes
    // * So we define a timer
    let timer: any;

    function scrollOnboardingSteps() {
      const isLastScreen = screenIndex === onboardingSteps.length - 1;

      if (!isLastScreen) {
        setScreenIndex((oldScreenIndex) => oldScreenIndex + 1);
      } else {
        setScreenIndex(0);
      }
    }

    // ! Clear any existing timer that might have been created
    clearTimeout(timer);

    // * Now we set a timer to scroll the steps in 4000s
    // ? if screenIndex changes again, the function restarts, and clears the existing timer
    // NB This is helpful so that when the user scrolls the page using gesture(screenIndex will change), the useEffect is called, the timer is cleared, and then we set a new timer of 4s
    timer = setTimeout(scrollOnboardingSteps, 4000);

    // ! Cleanup function, if the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [screenIndex]);

  const [fontsLoaded, _fontError] = useFonts({
    InterThin: Inter_100Thin,
    InterSemiBold: Inter_600SemiBold,
    InterBold: Inter_900Black,
    InterRegular: Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} />;
  }

  function onContinue() {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      // endOnBoarding();
      // do something
    } else {
      setScreenIndex(screenIndex + 1);
    }
  }

  function onBack() {
    const isFirstScreen = screenIndex === 0;

    if (isFirstScreen) {
      // endOnBoarding();
      // do something
    } else {
      setScreenIndex(screenIndex - 1);
    }
  }

  function goToLogin() {
    setScreenIndex(0);
    router.push("/login");
  }

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
  );

  return (
    <Page>
      <StatusBar barStyle={"light-content"} />

      <GestureDetector gesture={swipes}>
        <MainContent key={screenIndex}>
          <Logo>
            Link
            <Text style={{ fontWeight: "800", color: primaryColor }}>
              Dev<Text style={{ color: "white" }}>.</Text>
            </Text>
          </Logo>
          {/* // ! Adding a unique key, tells react native to recreate the components on the screen when the key is different, so whenever we add the key react native recreates rhe component, and when the component is recreated the animation is triggered */}

          <Animated.View entering={FadeIn} exiting={FadeOut}>
            {data.icon !== undefined ? (
              <Image name={data.icon} color="#FC84A4" size={130} />
            ) : null}
          </Animated.View>
          <Footer>
            <Title entering={SlideInRight.delay(100)} exiting={SlideOutLeft}>
              {data.title}
            </Title>
            <Description
              entering={SlideInRight.delay(130)}
              exiting={SlideOutLeft}
            >
              {data.description}
            </Description>
            <StepIndicator>
              {onboardingSteps.map((_step, index) => {
                return <Step key={index} active={index === screenIndex} />;
              })}
            </StepIndicator>
            {/* <Actions>
              <SkipButton onPress={endOnBoarding}>
                <ButtonText>Skip</ButtonText>
              </SkipButton>
              <ContinueButton onPress={onContinue}>
                <ButtonText>Continue</ButtonText>
              </ContinueButton>
            </Actions> */}
            <Button onPress={goToLogin} style={{ marginTop: 30 }}>
              <ButtonText style={{ color: "black" }}>Login</ButtonText>
            </Button>
            <SignUpButton href={"/(auth)/register"} asChild>
              <ButtonText>
                New to LinkDev?{" "}
                <Text style={{ color: primaryColor }}>Sign up</Text>
              </ButtonText>
            </SignUpButton>
          </Footer>
        </MainContent>
      </GestureDetector>
    </Page>
  );
}

const primaryColor = "#FC84A4";

// * SafeAreaView does not allow us have a padding, because it does the padding based on the safeArea of the image for us
const Page = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  background-color: #15141a;
`;

const Logo = styled(Text)`
  color: white;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  margin-top: ${`${StatusBar.currentHeight}px`};
`;

const MainContent = styled(View)`
  padding: 20px;
  flex: 1;
`;

const Image = styled(FontAwesome5)`
  align-self: center;
  margin-top: 30px;
`;

const Title = styled(Animated.Text)`
  color: #fdfdfd;
  font-size: 38px;
  font-weight: bold;
  font-family: InterBold;
  letter-spacing: 1.2px;
  margin-bottom: 10px;
  text-align: center;
`;

const Description = styled(Animated.Text)`
  color: gray;
  font-size: 20px;
  font-family: InterRegular;
  line-height: 28px;
  text-align: center;
`;

const Footer = styled(View)`
  justify-self: flex-start;
  margin-top: auto;
  // * auto tells the browser to automaticallky calculate the space between the element and its parent and then creates a margin of that space
`;

// const Actions = styled(View)`
//   flex-direction: row;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const SkipButton = styled(Pressable)`
//   flex: 0.3;
//   padding: 13px;
// `;

// const ContinueButton = styled(Pressable)`
//   flex: 1;
//   padding: 13px;
//   background-color: #302e38;
//   border-radius: 30px;
//   flex-direction: row;
//   gap: 10px;
//   justify-content: center;
//   align-items: center;
// `;

const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
  text-align: center;
  font-family: "InterSemiBold";
`;

const StepIndicator = styled(View)`
  flex-direction: row;
  gap: 8px;
  align-items: center;
  margin-top: 70px;
  padding-top: ${StatusBar.currentHeight}px;
  justify-content: center;
`;

const Step = styled(View)<TSteps>`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.active ? "#FC84A4" : "gray")};
  /* flex: 0.5; */
  border-radius: 50px;
`;

const LoginButton = styled(Pressable)`
  background-color: ${primaryColor};
  padding: 12px;
  border-radius: 30px;
`;

const SignUpButton = styled(Link)`
  margin-top: 20px;
`;
