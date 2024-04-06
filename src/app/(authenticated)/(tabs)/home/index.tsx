import { View, Text, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { dark } from "../../../../constants/colors";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Container>
      <ContainerText>Feeds</ContainerText>
      <Pressable onPress={() => setIsModalVisible(true)}>
        <Text style={{ color: "white" }}>Show Modal</Text>
      </Pressable>

      <Modal
        style={{ height: 400 }}
        visible={isModalVisible}
        // ! onRequest closed is called when the user presses the back button on an android or the back gesture on an IOS
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="formSheet" // ? formSheet, pageSheet or // fullscreen (on IOS the difference between formSheet and pageSheet is that formSheet is narrow and pageSheet is wider)
      >
        <View style={{ backgroundColor: "lightblue", padding: 30 }}>
          <Text>Modal Content Here</Text>
          <Pressable
            style={{
              backgroundColor: "red",
              padding: 10,
              width: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={{ color: "white" }}>Close</Text>
          </Pressable>
        </View>
      </Modal>
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
