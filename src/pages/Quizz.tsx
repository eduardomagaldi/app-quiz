

import React from 'react';

import Questions from '../components/Questions';

import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useHistory,
  useParams
} from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}





const Quizz: React.FC = () => {
  const { idQuiz }: any = useParams();

  const query = useQuery();
  const numberQuestion = parseInt(query.get('question') || '1', 10);

  return (
    <>
      <div className="row">
        <Questions />

        <Link to={`/quizz/${idQuiz}?question=${numberQuestion + 1}`}>
          Next
        </Link>
      </div>
    </>
  );
};

export default Quizz;
