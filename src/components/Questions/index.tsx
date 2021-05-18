import React, { useEffect, useReducer } from 'react';
import { getQuestions } from '../../services/data';
import { Question } from '../../common/interfaces';
import './index.css';
// import {  } from "react-router-dom";

import {
  BrowserRouter as Router,
  Link,
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
  }
}

// function Questions() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       Count: {state.count}
//       <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
//       <button onClick={() => dispatch({ type: 'increment' })}>+</button>
//     </>
//   );
// }

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
      {/* <h2>{currentQuestion.text}</h2> */}
      {JSON.stringify(getCurrQuestion())}

      <h1>{getCurrQuestion()?.text}</h1>



      {getCurrQuestion()?.options.split(',').map((option, index) => {
        return (
          <div className="col-12 mb-4" key={index}>
            <div
              className="alert alert-info d-flex justify-content-between"
              style={{ height: '100%' }}
            >
              {option}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Questions;





// export default Questions;

// interface Action {
//   type: string;
//   payload: any;
// }

// interface State {
//   questions: Question[];
//   currentQuestion: Question;
// }

// // function reducer(state: State, action: Action) {
// //   // The reducer normally looks at the action type field to decide what happens
// //   switch (action.type) {
// //     // Do something here based on the different types of actions
// //     default:
// //       state.questions = action.payload as Question[];
// //     // If this reducer doesn't recognize the action type, or doesn't
// //     // care about this specific action, return the existing state unchanged
// //     // return state
// //   }
// // }

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 };
//     case 'decrement':
//       return { count: state.count - 1 };
//     default:
//     // throw new Error();
//   }

//   return true;
// }

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