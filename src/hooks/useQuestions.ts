import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setActiveQuestion } from '@state/app/QuestionsSlice';
import {
  selectActiveQuestion,
  selectActiveQuestionIndex,
  selectError,
  selectIsLoading,
  selectQuestions,
} from '@state/selectors';
import { fetchQuestionsRequest } from '@state/app/QuestionsSaga';

export const useQuestions = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const questions = useSelector(selectQuestions);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const activeQuestionIndex = useSelector(selectActiveQuestionIndex);
  const activeQuestion = useSelector(selectActiveQuestion);

  const handleQuestionChange = () => {
    if (questions.length - 1 > activeQuestionIndex) {
      dispatch(
        setActiveQuestion({
          index: activeQuestionIndex + 1,
          question: questions[activeQuestionIndex + 1],
        }),
      );
    } else {
      navigation.navigate('answers');
    }
  };

  useEffect(() => {
    dispatch(fetchQuestionsRequest());
  }, [dispatch]);

  return {
    isLoading,
    error,
    questions,
    activeQuestion,
    handleQuestionChange,
  };
};
