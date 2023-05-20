import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Button } from '@components/index';
import styled from 'styled-components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { QuestionOption } from '@typings/questions';

import { useQuestions } from '../../hooks/useQuestions';

export function QuestionWrapper() {
  const { handleQuestionChange, activeQuestion } = useQuestions();
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionOption[]>(
    [],
  );

  console.log(
    'file: QuestionWrapper.tsx:17 ~ QuestionWrapper ~ activeQuestion:',
    activeQuestion,
  );

  useEffect(() => {
    setSelectedQuestions([]);
  }, []);

  // const selectQuestion = (value: string) => {
  //   const questionToSelect = activeQuestion.options.find(
  //     question => value === question.value,
  //   ) as QuestionOption;

  //   const isQuestionSelected = selectedQuestions.some(
  //     selectedQuestion => selectedQuestion.value === value,
  //   );

  //   setSelectedQuestions(prevQuestion => {
  //     if (isQuestionSelected) {
  //       return prevQuestion.filter(item => item.value !== value);
  //     } else {
  //       return [...prevQuestion, questionToSelect];
  //     }
  //   });
  // };

  if (!activeQuestion) {
    return <ActivityIndicator />;
  }

  // @todo: Move to separate components
  if (activeQuestion.type === 'single') {
    return (
      <>
        <SectionTitle>{activeQuestion.label}</SectionTitle>
        {'options' in activeQuestion ? (
          <FlatList
            data={activeQuestion.options}
            keyExtractor={item => item.value}
            renderItem={({ item }) => (
              <Button key={item.value} onPress={handleQuestionChange}>
                <ButtonTitle>Start quiz</ButtonTitle>
                <MaterialIcon name="chevron-right" size={24} color="#612e3a" />
              </Button>
            )}
          />
        ) : null}
      </>
    );
  }

  if (activeQuestion.type === 'multiple') {
    return (
      <>
        <SectionTitle>{activeQuestion.label}</SectionTitle>
        {'options' in activeQuestion ? (
          <>
            <FlatList
              data={activeQuestion.options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <View>{item.label}</View>
                // <Button
                //   item={item}
                //   selectedItems={selectedQuestions}
                //   handleChange={selectQuestion}
                // />
              )}
            />
            <Button
              onPress={handleQuestionChange}
              style={{
                backgroundColor:
                  selectedQuestions.length === 0 ? 'gray' : '#F63501',
                borderRadius: 12,
                borderColor: 'transparent',
              }}
              disabled={selectedQuestions.length === 0}
            >
              <Text>Next</Text>
            </Button>
          </>
        ) : null}
      </>
    );
  }

  if (activeQuestion.type === 'info') {
    return (
      <>
        <SectionTitle>{activeQuestion.label}</SectionTitle>
        <Description>{activeQuestion.description}</Description>
        {/* <DefaultButton
          onPress={setActiveQuestion}
          style={{
            backgroundColor: '#F63501',
            borderRadius: 12,
            borderColor: 'transparent',
          }}
        >
          <Text>Next</Text>
        </DefaultButton> */}
      </>
    );
  }

  return <SectionTitle>Unknown question type</SectionTitle>;
}

const SectionTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.weight.semiBold};
  font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
  margin-vertical: 6px;
`;

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.weight.semiBold};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
`;

const ButtonTitle = styled(Text)`
  color: #612e3a;
  font-family: ${({ theme }) => theme.fonts.weight.regular};
  font-size: 20px;
`;
