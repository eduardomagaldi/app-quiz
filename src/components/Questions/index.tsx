import React, { useEffect, useReducer } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { useParams } from 'react-router';

import { getQuestions, getQuizzes, saveAnswer } from '../../services/data';
import { Question, Params, QuizzesById } from '../../common/interfaces';
import './index.css';
import Header from '../Header';

interface State {
  questions: Question[];
  indexQuestion: number;
  quizzesById: QuizzesById | null,
}

const initialState: State = {
  questions: [{
    options: '...,...,...,...',
    text: '...',
    answer: '',
  }],
  indexQuestion: 0,
  quizzesById: null,
};

const Questions: React.FC = () => {
  const { idQuiz }: Params = useParams();
  const query = useQuery();
  const indexQuestion = parseInt(query.get('question') || '1', 10) - 1;
  const history = useHistory();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      dispatch({ ...initialState });

      const result: any = await Promise.all([
        getQuestions(idQuiz),
        getQuizzes(),
      ]);

      const questions = result[0];
      const quizzesById = result[1];

      if (questions?.length && !questions?.[indexQuestion]) {
        history.push('/');
        return '';
      }

      dispatch({
        indexQuestion,
        questions,
        quizzesById,
      });
    })();
  }, [idQuiz, indexQuestion, history]);

  const getCurrQuestion = (): Question => {
    return state?.questions?.[state?.indexQuestion];
  }

  const onOptionChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue: string = e.currentTarget.value;

    saveAnswer({
      indexQuestion,
      idQuiz,
      answer: newValue,
      correct: getCurrQuestion()?.answer === newValue
    })
  }

  return (
    <>
      <Header text={state?.quizzesById?.[idQuiz]?.name || ''} />

      <div className="col-12">
        <h2>{getCurrQuestion()?.text}</h2>
      </div>

      {getCurrQuestion()?.options?.split(',').map((option, index) => {
        return (
          <div className="col-12 mb-1" key={index}>
            <label
              htmlFor={generateIdHtml(index.toString(), idQuiz)}
              className="alert alert-secondary d-block align-items-center mb-0"
            >
              <input
                type="radio"
                id={generateIdHtml(index.toString(), idQuiz)}
                name="response-option"
                className="me-2"
                onChange={onOptionChange}
                value={option}
              />
              {option}
            </label>
          </div>
        );
      })}
    </>
  );
}

export default Questions;

function reducer(state: State, action: State): State {
  return {
    ...state,
    ...action,
  };
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function generateIdHtml(index: string, idQuiz: string) {
  return `option-${index}-${idQuiz}`;
}
