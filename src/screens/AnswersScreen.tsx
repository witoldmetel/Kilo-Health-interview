import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button } from '@components/index';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQuiz } from '../hooks/useQuiz';

export const AnswersScreen: React.FC = () => {
  const navigation = useNavigation();
  const { answers } = useQuiz();

  const jsonString = JSON.stringify(answers, null, 2);

  return (
    <Container>
      <Wrapper>
        <Button onPress={() => navigation.navigate('home')} text="Close quiz">
          <MaterialIcon name="close" size={24} color="#612e3a" />
        </Button>
        <TextAnswer>Answers:</TextAnswer>
        <TextAnswer>{jsonString}</TextAnswer>
      </Wrapper>
    </Container>
  );
};

// @todo: Define color in theme
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fffbf3;
`;

const Wrapper = styled(View)`
  margin: 16px;
  flex: 1;
`;

const TextAnswer = styled(Text)`
  color: #612e3a;
  font-family: ${({ theme }) => theme.fonts.weight.regular};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
`;
