import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
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
import { router } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";

type TSteps = {
  active: boolean;
};

const onboardingSteps = [
  {
    icon: "people-arrows",
    title: "Hey, there",
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

  const [fontsLoaded, fontError] = useFonts({
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
      endOnBoarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
    console.log("Tried");
  }

  function onBack() {
    const isFirstScreen = screenIndex === 0;

    if (isFirstScreen) {
      endOnBoarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  }

  function endOnBoarding() {
    setScreenIndex(0);
    router.replace("/login");
  }

  const swipeForward = Gesture.Fling();
  swipeForward.direction(Directions.LEFT);
  swipeForward.onEnd(() => {
    onContinue();
  });

  const swipeBackward = Gesture.Fling();
  swipeBackward.direction(Directions.RIGHT);
  swipeBackward.onEnd(() => {
    onBack();
  });

  const swipes = Gesture.Simultaneous(swipeBackward, swipeForward);

  // const swipes = Gesture.Simultaneous(
  //   Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
  //   Gesture.Simultaneous(
  //     Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
  //   )
  // );

  return (
    <Page>
      <StatusBar barStyle={"light-content"} />

      <GestureDetector gesture={swipes}>
        <MainContent key={screenIndex}>
          {/* // ! Adding a unique key, tells react native to recreate the components on the screen when the key is different, so whenever we add the key react native recreates rhe component, and when the component is recreated the animation is triggered */}
          <StepIndicator>
            {onboardingSteps.map((_step, index) => {
              return <Step key={index} active={index === screenIndex} />;
            })}
          </StepIndicator>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Image name={data.icon} color="#CEF202" size={130} />
          </Animated.View>
          <Footer>
            <Title entering={SlideInRight.delay(100)} exiting={SlideOutLeft}>
              {data.title}
            </Title>
            <Description
              entering={SlideInRight.delay(200)}
              exiting={SlideOutLeft}
            >
              {data.description}
            </Description>
            <Actions>
              <SkipButton onPress={endOnBoarding}>
                <ButtonText>Skip</ButtonText>
              </SkipButton>
              <ContinueButton onPress={onContinue}>
                <ButtonText>Continue</ButtonText>
                {/* <ForwardIcon name="chevron-forward" size={20} color={"white"} /> */}
              </ContinueButton>
            </Actions>
          </Footer>
        </MainContent>
      </GestureDetector>
    </Page>
  );
}

// * SafeAreaView does not allow us have a padding, because it does the padding based on the safeArea of the image for us
const Page = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  background-color: #15141a;
`;

const MainContent = styled(View)`
  padding: 20px;
  flex: 1;
`;

const Image = styled(FontAwesome5)`
  align-self: center;
  /* margin-bottom: 20px; */
  margin-top: 50px;
`;

const Title = styled(Animated.Text)`
  color: #fdfdfd;
  font-size: 48px;
  font-weight: bold;
  font-family: InterBold;
  letter-spacing: 1.2px;
  margin-bottom: 10px;
`;

const Description = styled(Animated.Text)`
  color: gray;
  font-size: 20px;
  font-family: InterRegular;
  line-height: 28px;
`;

const Footer = styled(View)`
  justify-self: flex-start;
  /* border: solid 2px red; */
  margin-top: auto;
  // * auto tells the browser to automaticallky calculate the space between the element and its parent and then creates a margin of that space
`;

const Actions = styled(View)`
  /* border: solid 2px red; */
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;
`;

const SkipButton = styled(Pressable)`
  flex: 0.3;
  padding: 13px;
  /* border: solid 2px red; */
`;

const ContinueButton = styled(Pressable)`
  flex: 1;
  padding: 13px;
  background-color: #302e38;
  border-radius: 30px;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

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
  margin-bottom: 80px;
  padding-top: ${StatusBar.currentHeight}px;
`;

const Step = styled(View)<TSteps>`
  height: 3px;
  background-color: ${(props) => (props.active ? "#CEF202" : "gray")};
  flex: 0.5;
  border-radius: 5px;
`;
