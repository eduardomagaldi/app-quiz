import React, { useEffect, useReducer } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { useParams } from 'react-router';

import { getQuestions } from '../../services/data';
import { Question, Params } from '../../common/interfaces';
import './index.css';

interface State {
  questions: Question[];
  indexQuestion: number;
}

const initialState: State = {
  questions: [{
    options: '...,...,...,...',
    text: '...',
    answer: '',
  }],
  indexQuestion: 0,
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

      const result: Question[] = await getQuestions(idQuiz);

      console.log('result', result);

      if (result && result?.length && !result?.[indexQuestion]) {
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
          <div className="col-12 mb-1" key={index}>
            <label
              htmlFor={'option' + index}
              className="alert alert-secondary d-block align-items-center mb-0"
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

function reducer(state: State, action: State): State {
  return {
    ...state,
    ...action,
  };
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}