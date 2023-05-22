import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { TopSection } from '@components/index';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';

import { useQuiz } from '../hooks/useQuiz';

export const AnswersScreen: React.FC = () => {
  const { answers } = useQuiz();

  const jsonString = JSON.stringify(answers, null, 2);

  return (
    <Container>
      <Wrapper>
        <TopSection />
        <StyledViewContainer>
          <TextAnswer>Answers:</TextAnswer>
          <TextAnswer>{jsonString}</TextAnswer>
        </StyledViewContainer>
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

const StyledViewContainer = styled(ScrollView)`
  margin-top: 26px;
`;

const TextAnswer = styled(Text)`
  color: black;
  font-family: ${({ theme }) => theme.fonts.weight.semiBold};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
`;
