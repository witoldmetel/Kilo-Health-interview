import { ProgressBar, QuestionWrapper, TopSection } from '@components/index';
import React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import styled from 'styled-components';

import { useQuiz } from '../hooks/useQuiz';

export const QuestionsScreen: React.FC = () => {
  const { isLoading, questions, activeQuestionIndex } = useQuiz();

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Wrapper>
          <TopSection
            title={String(
              `Step ${activeQuestionIndex + 1} of ${questions.length}`,
            )}
          />
          <ProgressBar
            step={activeQuestionIndex + 1}
            totalSteps={questions.length}
          />
          <QuestionWrapper />
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fffbf3;
`;

const Wrapper = styled(View)`
  margin: 16px;
  flex: 1;
`;
