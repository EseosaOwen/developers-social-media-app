import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";

export default function feed() {
  return (
    <Container>
      <ContainerText>Feed</ContainerText>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: red;
  /* border: solid 2px red; */
`;

const ContainerText = styled(Text)`
  color: #fff;
  font-size: 25px;
`;
