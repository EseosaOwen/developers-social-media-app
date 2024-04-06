import { View, Text, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { dark } from "../../../../constants/colors";
import { Link, router } from "expo-router";

export default function feed() {

  return (
    <Container>
      <ContainerText>Feed more</ContainerText>
      <Pressable onPress={router.back}>
        <Text style={{ color: "white" }}>Back</Text>
      </Pressable>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: ${dark};
  /* border: solid 2px red; */
`;

const ContainerText = styled(Text)`
  color: #fff;
  font-size: 25px;
`;
