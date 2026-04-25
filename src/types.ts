export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  correctAnswer: string;
}

export type QuizState = 'start' | 'playing' | 'results';

export type Answers = Record<number, string>;
