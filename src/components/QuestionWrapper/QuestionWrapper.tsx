import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Button, CheckboxList } from '@components/index';
import styled from 'styled-components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQuestions } from '../../hooks/useQuestions';

export function QuestionWrapper() {
  const { handleQuestionChange, activeQuestion } = useQuestions();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectionChange = (updatedValues: string[]) => {
    setSelectedValues(updatedValues);
  };

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
              <Button
                key={item.value}
                onPress={handleQuestionChange}
                variant="outlined"
              >
                <ButtonTitle>{item.label}</ButtonTitle>
                <MaterialIcon name="chevron-right" size={24} color="#612e3a" />
              </Button>
            )}
            style={{ paddingHorizontal: 4, paddingVertical: 8 }}
            ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
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
            <CheckboxList
              items={activeQuestion.options}
              selectedValues={selectedValues}
              onSelectionChange={handleSelectionChange}
            />
            <ButtonNext
              onPress={handleQuestionChange}
              selectedValuesLength={selectedValues.length}
              disabled={selectedValues.length === 0}
              variant="contained"
            >
              <ButtonTextNext selectedValuesLength={selectedValues.length}>
                Next
              </ButtonTextNext>
            </ButtonNext>
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
        <ButtonNext
          onPress={handleQuestionChange}
          selectedValuesLength={selectedValues.length}
          disabled={selectedValues.length === 0}
          variant="contained"
        >
          <ButtonTextNext selectedValuesLength={selectedValues.length}>
            Next
          </ButtonTextNext>
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

const ButtonTitle = styled(Text)`
  color: #612e3a;
  font-family: ${({ theme }) => theme.fonts.weight.regular};
  font-size: 16px;
`;

const ButtonNext = styled(Button)<{ selectedValuesLength: number }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
  border-radius: 12;
  border-color: 'transparent';
  background-color: ${({ selectedValuesLength }) =>
    selectedValuesLength === 0 ? 'gray' : '#F63501'};
`;

const ButtonTextNext = styled(Text)<{ selectedValuesLength: number }>`
  font-family: ${({ theme }) => theme.fonts.weight.semiBold};
  font-size: 16px;
  color: ${({ selectedValuesLength }) =>
    selectedValuesLength === 0 ? 'black' : 'white'};
`;
