import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { Button } from '@components/index';
import styled from 'styled-components';

import { useQuestions } from '../../hooks/useQuestions';
import { SingleAnswerWrapper } from './SingleAnswerWrapper';
import { MultiAnswersWrapper } from './MultiAnswersWrapper';

export function QuestionWrapper() {
  const { handleQuestionChange, activeQuestion } = useQuestions();

  if (!activeQuestion) {
    return <ActivityIndicator />;
  }

  if (activeQuestion.type === 'single') {
    return (
      <SingleAnswerWrapper
        question={activeQuestion}
        handleQuestionChange={handleQuestionChange}
      />
    );
  }

  if (activeQuestion.type === 'multiple') {
    return (
      <MultiAnswersWrapper
        question={activeQuestion}
        handleQuestionChange={handleQuestionChange}
      />
    );
  }

  if (activeQuestion.type === 'info') {
    return (
      <>
        <SectionTitle>{activeQuestion.label}</SectionTitle>
        <Description>{activeQuestion.description}</Description>
        <ButtonNext onPress={handleQuestionChange} variant="contained">
          <ButtonTextNext>Next</ButtonTextNext>
        </ButtonNext>
      </>
    );
  }

  return <SectionTitle>Unknown question type</SectionTitle>;
}

const SectionTitle = styled(Text)`
  color: #410413;
  font-family: ${({ theme }) => theme.fonts.weight.semiBold};
  font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
  margin-vertical: 16px;
  margin-horizontal: 4px;
`;

const Description = styled(Text)`
  color: #612e3a;
  font-family: ${({ theme }) => theme.fonts.weight.regular};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
`;

const ButtonNext = styled(Button)`
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
  border-radius: 12;
  border-color: 'transparent';
  background-color: #f63501;
`;

const ButtonTextNext = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.weight.semiBold};
  font-size: 16px;
  color: white;
`;
