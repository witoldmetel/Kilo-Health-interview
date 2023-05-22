import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setActiveQuestion, setAnswer } from '@state/app/QuizSlice';
import {
  selectActiveQuestion,
  selectActiveQuestionIndex,
  selectAnswers,
  selectError,
  selectIsLoading,
  selectQuestions,
} from '@state/selectors';
import { fetchQuestionsRequest } from '@state/app/QuizSaga';

export const useQuiz = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const questions = useSelector(selectQuestions);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const activeQuestionIndex = useSelector(selectActiveQuestionIndex);
  const activeQuestion = useSelector(selectActiveQuestion);
  const answers = useSelector(selectAnswers);

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

  const handleAnswerSelection = (answer: string | string[]) => {
    dispatch(setAnswer({ questionIndex: activeQuestionIndex, answer }));
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
    answers,
    handleAnswerSelection,
  };
};
