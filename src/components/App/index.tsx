import './index.css';

import React, { useEffect, useState } from 'react';
import { getQuizzes } from '../../services/data';
import { Quizz } from '../../common/interfaces';

const App: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quizz[] | null>(null);

  useEffect(() => {
    (async () => {
      const result = await getQuizzes();
      setQuizzes(result);
    })();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  }

  if (!quizzes) {
    return (
      <>
        <span>Loading...</span>
      </>
    );
  }

  if (!quizzes.length) {
    return (
      <>
        <span>There are no available Quizzes :(</span>
      </>
    );
  }

  return (
    <>
      <input
        type="text"
        name="postalcode"
        onChange={handleChange}
        maxLength={5}
      />

      {quizzes.map((quizz, index) => {
        return (
          <div key={index}>
            {quizz.name}
          </div>
        );
      })}
    </>
  );
};

const Day: any = (props: any) => {
  function handleClick(time: any) {
    return () => {
      return time;
    };
  }

  return (
    <label htmlFor={props.index} className="accordion__item">
      <strong>{props.dateName}</strong>
      <input type="checkbox" className="accordion__checkbox" id={props.index} />

      <span className="accordion__content">

      </span>
    </label>
  );
}

export default App;
