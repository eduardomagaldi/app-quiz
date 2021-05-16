import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Questions() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}

export default Questions;

// import React, { useEffect, useReducer, useState } from 'react';
// import { getQuestions } from '../../services/data';
// import { Question } from '../../common/interfaces';
// import './index.css';
// import {
//   Link,
// } from "react-router-dom";
// import { useParams } from 'react-router';

// const Questions: React.FC = () => {
//   const { idQuiz }: any = useParams();

//   // const [questions, setQuestions] = useState<Question[] | null>(null);
//   // const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

//   const [state, dispatch] = useReducer(reducer, { questions: null, currentQuestion: null });

//   useEffect(() => {
//     (async () => {
//       const result = await getQuestions(idQuiz);
//       // setQuestions(result);
//       // setCurrentQuestion(questions?.[0] || null)

//       dispatch();
//     })();
//   }, [idQuiz]);

//   // function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//   // }

//   if (!state.currentQuestion) {
//     return (
//       <span>Loading...</span>
//     );
//   }

//   return (
//     <>
//       {/* <h2>{currentQuestion.text}</h2> */}
//     </>
//   );
// }

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
