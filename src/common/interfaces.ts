export interface Quizz {
  id: string;
  name: string;
}

export interface Question {
  text: string;
  answer: string;
  options: string;
}