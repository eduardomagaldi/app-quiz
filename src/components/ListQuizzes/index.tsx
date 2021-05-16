import React, { useEffect, useState } from 'react';
import { getQuizzes } from '../../services/data';
import { Quizz } from '../../common/interfaces';
import './index.css';
import {
  Link,
} from "react-router-dom";

const ListQuizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quizz[] | null>(null);

  useEffect(() => {
    (async () => {
      const result = await getQuizzes();
      setQuizzes(result);
    })();
  }, []);

  // function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  // }

  if (!quizzes) {
    return (
      <span>Loading...</span>
    );
  }

  if (!quizzes.length) {
    return (
      <span>There are no available Quizzes :(</span>
    );
  }

  return (
    <>
      {quizzes.map((quizz, index) => {
        return (
          <div className="col-12 col-md-6 mb-4" key={index}>
            <div
              className="alert alert-info d-flex justify-content-between"
              style={{ height: '100%' }}
            >
              <div>
                <h2>{quizz.name}</h2>
                <p><strong>Score:</strong> 8/10</p>
              </div>

              <Link
                to={`/quizz/${quizz.id}`}
                className="btn btn-primary align-self-end"
              >
                Start | Redo
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ListQuizzes;
