import { Button, QuestionWrapper } from '@components/index';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const QuestionsScreen: React.FC = () => {
  const navigation = useNavigation();

  // @todo: Temporary
  // if (questions.length === 0) {
  //   return (
  //     <Container>
  //       <ActivityIndicator />
  //     </Container>
  //   );
  // }

  return (
    <Container>
      <Wrapper>
        <Button onPress={() => navigation.goBack()} text="Close quiz">
          <MaterialIcon name="close" size={24} color="#612e3a" />
        </Button>
        <QuestionWrapper />
      </Wrapper>
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
