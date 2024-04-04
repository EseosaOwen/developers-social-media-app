import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";
import { dark } from "../../../../constants/colors";

export default function Index() {
  return (
    <Container>
      <ContainerText>Feeds</ContainerText>
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
