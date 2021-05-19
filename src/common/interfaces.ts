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

interface Score {

}

export interface QuizzesById {
  [id: string]: {
    name: string;
    score?: Score;
  }
}

export interface Answer {
  answer: string;
  correct: boolean;
}
