import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { borderRadius, primaryColor } from "./colors";

export const Button = styled(TouchableOpacity)`
  background-color: ${primaryColor};
  padding: 13px;
  border-radius: ${borderRadius};
`;
