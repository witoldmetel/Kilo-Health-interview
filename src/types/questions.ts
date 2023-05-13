export type QuestionOption = {
  label: string;
  value: string;
  custom?: {
    icon?: string;
    iconSize?: number;
  };
  [key: string]: unknown;
};

export type QuestionTypes = 'single' | 'multiple' | 'info';

export type Question = {
  type: QuestionTypes;
  options: QuestionOption[];
  label: string;
  key: string;
  description?: string;
};
