import { Quizz, Question, QuizzesById, Answer } from '../common/interfaces';

interface QueryOptions {
  [index: string]: {
    columns: string[];
    where?: string;
  }
}

interface Response {
  data: any;
}

const url: string = 'https://tilda-quiz.hasura.app/v1/graphql';

export const getQuestions = (idQuiz: string, localOnly?: boolean): Promise<Question[]> => {
  let result: Question[] | null = null;
  const idLocalStorage = `questions-${idQuiz}`;

  if (localStorage) {
    result = JSON.parse(localStorage?.getItem(idLocalStorage) as string);
  }

  if (!result && !localOnly) {
    const columns: string[] = [
      'answer',
      'options',
      'text',
    ];

    const options: QueryOptions = {};
    options.questions = {
      columns,
      where: `where: {quiz_id: {_eq: "${idQuiz}"}}`,
    };

    return get(options)
      .then((response: { questions: Question[] }) => {
        result = response?.questions;

        if (localStorage && result?.length) {
          const resultFiltered = result.map((question) => {
            return filterFields(question, ['answer', 'options', 'text']);
          });

          localStorage.setItem(
            idLocalStorage,
            JSON.stringify(resultFiltered)
          );
        }

        return result;
      });
  }

  return new Promise((resolve: Function) => {
    resolve(result);
  })
};

export const getQuizzes = (): Promise<QuizzesById> => {
  let result: QuizzesById | Quizz[] | null = null;
  const idLocalStorage: string = 'quizzesById';

  if (localStorage) {
    result = JSON.parse(localStorage?.getItem(idLocalStorage) as string);
  }

  if (!result) {
    const param: string = 'quizzes';
    const columns: string[] = ['id', 'name'];

    const options: QueryOptions = {};
    options[param] = {
      columns,
    };

    return get(options)
      .then((response: { quizzes: QuizzesById }) => {
        result = response?.quizzes;

        if (Array.isArray(result)) {
          result = getQuizzesById(result);
        }

        if (localStorage && result) {
          localStorage.setItem(
            idLocalStorage,
            JSON.stringify(result),
          );
        }

        return result;
      });
  }

  return new Promise((resolve: Function) => {
    resolve(result);
  })
};

export const saveAnswer = ({ answer, correct, idQuiz, indexQuestion }: any): void => {
  const idLocalStorage = `answers-${idQuiz}`;
  const answers: Answer[] = getAnswers(idQuiz) || [];

  answers[indexQuestion] = {
    answer,
    correct,
  };

  if (localStorage) {
    localStorage.setItem(
      idLocalStorage,
      JSON.stringify(answers),
    );
  }
};

// ---------------------------------

const get = (options: QueryOptions): Promise<any> => {
  return post(url, makeQuery(options))
    .then((response: Response) => {
      return response?.data;
    });
};

async function post(url: string, data: object) {
  const response: any = await fetch(
    url,
    {
      ...getOptions(),
      method: 'POST',
      body: JSON.stringify(data || {}),
    },
  );

  return await parseBody(response);
}

function getOptions(): any {
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };
}

async function parseBody(response: any) {
  const data = await response.json().catch((e: any) => {
    console.error('error', e);
  });

  return data;
}

export interface QueryObject {
  query: string;
}

// usage: makeQuery({ quizzes: ['id', 'name'] });
function makeQuery(options: QueryOptions): QueryObject {
  const queries = [];

  for (const prop in options) {
    const where = options?.[prop]?.where || '';
    const whereString = where ? `(${where})` : '';
    let query = `${prop} ${whereString} {\n${options?.[prop]?.columns?.join('\n')}\n}`;
    queries.push(query);
  }

  const templateQuery = `
    query MyQuery {
      ${queries.join('\n')}
    }
  `;

  return {
    query: templateQuery,
  };
}

function filterFields(originalObject: any, fields: string[]): object | null {
  if (!originalObject) return null;
  const filtered: any = {};

  fields.forEach((field) => {
    const originalValue = originalObject?.[field];

    if (originalValue !== originalObject) {
      filtered[field] = originalValue;
    }
  });

  return filtered;
}

function getQuizzesById(quizzesList: Quizz[]): QuizzesById {
  const quizzesById: QuizzesById = {};

  quizzesList.forEach((quizz: Quizz) => {
    quizzesById[quizz.id] = {
      name: quizz.name,
    };
  });

  return quizzesById;
}

export function getScore(idQuiz: string): string | null {
  if (!idQuiz) {
    return null;
  }

  const answers = getAnswers(idQuiz);

  if (answers?.length) {
    const correct = answers.filter((answer: Answer) => {
      return answer.correct;
    });

    return correct.length;
  }

  return null;
};

function getAnswers(idQuiz: string): any {
  let result: Answer[] | null = null;

  const idLocalStorage = `answers-${idQuiz}`;

  if (localStorage) {
    result = JSON.parse(localStorage?.getItem(idLocalStorage) as string);
  }

  return result;
};
