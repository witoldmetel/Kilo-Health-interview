import React from 'react';
import styled from 'styled-components/native';
import { StyleProp, ViewStyle } from 'react-native';

interface DefaultButtonProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  children?: React.ReactNode;
  disabled?: boolean;

  onPress: (event: unknown) => void;
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  onPress,
  style,
  title,
  children,
  disabled,
}) => (
  <TouchableWrapper onPress={onPress} style={style} disabled={disabled}>
    {title && <ButtonTitle>{title}</ButtonTitle>}
    {children}
  </TouchableWrapper>
);

const ButtonTitle = styled.Text`
  color: #612e3a;
  font-family: ${({ theme }) => theme.fonts.weight.regular};
  font-size: 20px;
`;

const TouchableWrapper = styled.TouchableOpacity`
  height: 56px;
  border-radius: 8px;
  background-color: white;
  border: black;
  margin-top: 8px;
  padding-vertical: 10px;
  padding-horizontal: 15px;
  align-items: center;
  justify-content: ${({ children }) => (children ? 'space-between' : 'center')};
  flex-direction: row;
`;
