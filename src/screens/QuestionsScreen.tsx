import { Button, QuestionWrapper } from '@components/index';
import React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQuestions } from '../hooks/useQuestions';

export const QuestionsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { isLoading } = useQuestions();

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Wrapper>
          <Button onPress={() => navigation.goBack()} text="Close quiz">
            <MaterialIcon name="close" size={24} color="#612e3a" />
          </Button>
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
`;
