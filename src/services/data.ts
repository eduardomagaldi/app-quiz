import { Quizz } from '../common/interfaces';

const url = 'https://tilda-quiz.hasura.app/v1/graphql';

interface QueryOptions {
  [index: string]: string[]
}

interface Response {
  data: any;
}

export const getQuizzes = (): Promise<Quizz[]> => {
  const param = 'quizzes';
  const columns = ['id', 'name'];

  const options: QueryOptions = {};
  options[param] = columns;

  return get(options)
    .then((response: { quizzes: Quizz[] }) => {
      return response?.quizzes;
    });
};

const get = (options: QueryOptions): Promise<any> => {
  return post(
    url,
    makeQuery(options),
  )
    .then((response: Response) => {
      console.log('response post function', response);
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
    let query = `${prop} {\n${options[prop].join('\n')}\n}`;
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

  // query MyQuery {
  //   questions(where: {quiz_id: {_eq: "53498e5a-3f7e-4f74-88fc-1106451c1dd9"}}) {
  //     answer
  //     options
  //     text
  //     quiz_id
  //   }
  // }
}