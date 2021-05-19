export interface Quizz {
  id: string;
  name: string;
}

export interface Question {
  text: string;
  answer: string;
  options: string;
}

export interface Params {
  idQuiz: string;
}

export interface QuizzesById {
  [id: string]: {
    name: string
  }
}
