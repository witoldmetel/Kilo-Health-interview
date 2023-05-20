import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button } from '@components/index';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const AnswersScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Wrapper>
        <Button onPress={() => navigation.navigate('home')} text="Close quiz">
          <MaterialIcon name="close" size={24} color="#612e3a" />
        </Button>
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
`;
