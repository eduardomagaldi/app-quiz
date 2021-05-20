import React, { useEffect, useState } from 'react';
import { getQuizzes } from '../../services/data';
import { Quizz, QuizzesById } from '../../common/interfaces';
import { Link } from "react-router-dom";
import Score from '../Score';

const quizzEmpty = {
  id: '',
  name: '...',
};

const ListQuizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quizz[] | null>([quizzEmpty, quizzEmpty, quizzEmpty]);

  useEffect(() => {
    (async () => {
      let quizzesById: QuizzesById = await getQuizzes();
      const result: Quizz[] = [];

      for (const idQuizz in quizzesById) {
        result.push({
          ...quizzesById[idQuizz],
          id: idQuizz,
        });
      }

      setQuizzes(result as Quizz[]);
    })();
  }, []);

  if (!quizzes) {
    return (
      <span>There are no available Quizzes :(</span>
    );
  }

  if (quizzes && !quizzes.length) {
    return (
      <span>There are no available Quizzes :(</span>
    );
  }

  return (
    <>
      {(quizzes as Quizz[]).map((quizz, index) => {
        return (
          <div className="col-12 col-md-6 mb-4" key={index}>
            <div
              className="js_card__quizz alert alert-info d-flex justify-content-between"
              style={{ height: '100%' }}
            >
              <div>
                <h2>{quizz.name}</h2>
                <Score idQuizz={quizz.id} />
              </div>

              <Link
                to={`/quizz/${quizz.id}?question=1`}
                className={`btn btn-primary align-self-end ${!quizz.id ? 'disabled' : ''}`}
              >
                Start&nbsp;|&nbsp;Redo
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ListQuizzes;
