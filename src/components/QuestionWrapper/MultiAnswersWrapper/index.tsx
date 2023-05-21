import React, { useState } from 'react';
import { Text } from 'react-native';
import { Button, CheckboxList } from '@components/index';
import styled from 'styled-components';
import { Question } from '@typings/questions';

interface MultiAnswersWrapperProps {
  question: Question;

  handleQuestionChange: () => void;
}

export const MultiAnswersWrapper: React.FC<MultiAnswersWrapperProps> = ({
  question,
  handleQuestionChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectionChange = (updatedValues: string[]) => {
    setSelectedValues(updatedValues);
  };

  return (
    <>
      <SectionTitle>{question.label}</SectionTitle>
      {'options' in question ? (
        <>
          <CheckboxList
            items={question.options}
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
};

const SectionTitle = styled(Text)`
  color: #410413;
  font-family: ${({ theme }) => theme.fonts.weight.semiBold};
  font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
  margin-vertical: 16px;
  margin-horizontal: 4px;
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
