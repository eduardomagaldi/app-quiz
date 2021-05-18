import React from 'react';
import Questions from '../components/Questions';

import {
  Link,
  useLocation,
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

        <div className="col d-flex justify-content-end">
          <Link
            to={`/quizz/${idQuiz}?question=${numberQuestion + 1}`}
            className="btn btn-primary">
            Next -{'>'}
          </Link>
        </div>

      </div>
    </>
  );
};

export default Quizz;
