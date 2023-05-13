// @todo: Add type
export const getQuestionType = currentQuestion => {
  switch (currentQuestion.type) {
    case 'single':
      return 'single';
    case 'multiple':
      return 'multiple';

    default:
      return 'unknown';
  }
};
