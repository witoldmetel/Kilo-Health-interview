import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { clearState } from '@state/app/QuizSlice';
import styled from 'styled-components/native';

export const TopSection: React.FC<{ title?: string }> = ({ title }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Container>
      <TouchableOpacity onPress={navigation.goBack}>
        <MaterialIcon name="arrow-left" size={24} color="#612e3a" />
      </TouchableOpacity>

      {title ? <Title>{title}</Title> : null}

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();

          dispatch(clearState());
        }}
      >
        <MaterialIcon name="close" size={24} color="#612e3a" />
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  paddingbottom: 10px;
`;

const Title = styled(Text)`
  color: #612e3a;
  font-family: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
`;
