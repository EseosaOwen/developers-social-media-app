import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";

export default function All() {
  return (
    <Container>
      <ContainerText>Notifications</ContainerText>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: black;
`;

const ContainerText = styled(Text)`
  color: #fff;
  font-size: 25px;
`;
