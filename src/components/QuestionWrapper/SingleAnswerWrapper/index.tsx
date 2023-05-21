import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button } from '@components/index';
import styled from 'styled-components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Question } from '@typings/questions';

interface SingleAnswerWrapperProps {
  question: Question;
  handleQuestionChange: () => void;
}

export const SingleAnswerWrapper: React.FC<SingleAnswerWrapperProps> = ({
  question,
  handleQuestionChange,
}) => (
  <>
    <SectionTitle>{question.label}</SectionTitle>
    {'options' in question ? (
      <FlatList
        data={question.options}
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

const SectionTitle = styled(Text)`
  color: #410413;
  font-family: ${({ theme }) => theme.fonts.weight.semiBold};
  font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
  margin-vertical: 16px;
  margin-horizontal: 4px;
`;

const ButtonTitle = styled(Text)`
  color: #612e3a;
  font-family: ${({ theme }) => theme.fonts.weight.regular};
  font-size: 16px;
`;
