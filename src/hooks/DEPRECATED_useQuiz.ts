import { useEffect, useState } from 'react';
import axios from 'axios';
import { Question } from '@typings/questions';
import { useNavigation } from '@react-navigation/native';

// @todo: Old implementation, Now I use redux-toolkit
export const useQuiz = () => {
  const navigation = useNavigation();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  const fetchQuestions = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        // @todo: Move to consts
        'https://api.jsonbin.io/v3/b/62cd20b4ecfa6c12a01fa4ed',
      );

      // @todo: Add better data checking
      if (response && 'data' in response) {
        setQuestions(response.data.record.questions);
      }
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  const getActiveQuestion = () => questions[activeQuestionIndex];

  const setActiveQuestion = () => {
    if (questions.length - 1 > activeQuestionIndex) {
      setActiveQuestionIndex(prev => prev + 1);
    } else {
      navigation.navigate('home');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return {
    isLoading,
    error,
    questions,
    getActiveQuestion,
    setActiveQuestion,
  };
};
