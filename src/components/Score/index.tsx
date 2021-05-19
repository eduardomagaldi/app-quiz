import React, { useEffect, useState } from 'react';
import { getScore, getQuestions } from '../../services/data';

interface ScoreProps {
  idQuizz: string;
}

const Score: React.FC<ScoreProps> = ({ idQuizz }: ScoreProps) => {
  const score = getScore(idQuizz);
  const [questionsNumber, setQuestionsNumber] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const questions = await getQuestions(idQuizz, true);

      if (questions?.length > -1) {
        setQuestionsNumber(questions?.length);
      }
    })();
  }, [idQuizz]);

  if (!idQuizz || !score) {
    return <p>Not started.</p>
  }

  return (
    <>
      <p><strong>Score:</strong> {score}/{questionsNumber}</p>
    </>
  )
}

export default Score;
