import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DefaultButton } from '@components/index';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <Container>
      <Wrapper>
        <SectionTitle>{t('quiz:title')}</SectionTitle>
        <DefaultButton
          onPress={() => navigation.navigate('questions')}
          title={t('quiz:startQuiz')}
        >
          <MaterialIcon name="chevron-right" size={24} color="#612e3a" />
        </DefaultButton>
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

const SectionTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.weight.semiBold};
  font-size: ${({ theme }) => theme.fonts.size.xxxl}px;
`;
