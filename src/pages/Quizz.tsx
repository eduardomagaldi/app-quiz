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

  const query: URLSearchParams = useQuery();
  const numberQuestion: number = parseInt(query.get('question') || '1', 10);
  const numberQuestionNext: number = numberQuestion + 1;
  const numberQuestionPrev: number = numberQuestion - 1;

  return (
    <>
      <div className="row">
        <div className="col">
          <a
            href="/"
            className="btn btn-light"
          >
            ←
          </a>
        </div>

        <Questions />

        <div className="col d-flex justify-content-between">
          <Link
            to={`/quizz/${idQuiz}?question=${numberQuestionPrev}`}
            className={`btn ${!numberQuestionPrev ? 'btn-outline-secondary disabled' : 'btn-primary'}`}>
            ← Back
          </Link>

          <Link
            to={`/quizz/${idQuiz}?question=${numberQuestionNext}`}
            className="btn btn-primary">
            Next →
          </Link>
        </div>
      </div>
    </>
  );
};

export default Quizz;
