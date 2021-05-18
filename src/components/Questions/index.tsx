import React, { useEffect, useReducer } from 'react';
import { getQuestions } from '../../services/data';
import { Question } from '../../common/interfaces';
import './index.css';

import {
  useLocation,
  useHistory
} from "react-router-dom";

import { useParams } from 'react-router';

function reducer(state: any, action: any): any {
  // switch (action.type) {
  //   case 'increment':
  //     return { count: state.count + 1 };
  //   case 'decrement':
  //     return { count: state.count - 1 };
  //   default:
  //     throw new Error();
  // }

  return {
    ...state,
    ...action,
  };
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Questions: React.FC = () => {
  const { idQuiz }: any = useParams();
  const query = useQuery();
  const indexQuestion = parseInt(query.get('question') || '1', 10) - 1;
  const history = useHistory();

  const initialState = {
    questions: null,
    indexQuestion,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      let result;
      const idLocalStorage = `questions-${idQuiz}`;

      if (window?.localStorage) {
        result = JSON.parse(window.localStorage?.getItem(idLocalStorage) as string);
        console.log('result from localstorage', result);
      }

      if (!result) {
        result = await getQuestions(idQuiz);
        console.log('result fetched', result);

        if (window?.localStorage) {
          window.localStorage?.setItem(
            idLocalStorage,
            JSON.stringify(
              sanitize(result, ['answer', 'options', 'text'])
            )
          );
        }
      }

      if (!result?.[indexQuestion]) {
        history.push('/');
        return '';
      }

      dispatch({
        indexQuestion,
        questions: result,
      });
    })();
  }, [idQuiz, indexQuestion, history]);

  // function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  // }

  // if (!state.currentQuestion) {
  //   return (
  //     <span>Loading...</span>
  //   );
  // }

  const getCurrQuestion = (): Question => {
    return state?.questions?.[state?.indexQuestion];
  }

  return (
    <>
      <div className="col-12">
        <h2>{getCurrQuestion()?.text}</h2>
      </div>

      {getCurrQuestion()?.options.split(',').map((option, index) => {
        return (
          <div className="col-12 mb-1">
            <label
              htmlFor={'option' + index}
              className="alert alert-secondary d-block align-items-center mb-0"
              key={index}
            >
              <input
                type="radio"
                id={'option' + index}
                name="response-option"
                className="me-2"
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

function sanitize(originalObject: any, fields: string[]): object {
  const sanitized: any = {};

  fields.forEach((field) => {
    const originalValue = originalObject[field];

    if (originalValue !== originalObject) {
      sanitized[field] = originalValue;
    }
  });

  return sanitized;
}