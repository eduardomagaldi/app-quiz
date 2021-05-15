import { AvailabilityResponse } from '../common/interfaces';

const url = 'https://api-staging.felmo.de/v1/scheduling/availabilities?zip=';

export const getAvailabilities = (postalcode: string): Promise<AvailabilityResponse> => {
  return fetch(url + '10117')
    .then((response: any) => {
      const result: any = response.json() as unknown;
      return result as AvailabilityResponse;
    });
};

export const saveBooking = (time: string): Promise<AvailabilityResponse> => {
  return post('https://api-staging.felmo.de/coding-challenge', { slot: time })
    .then((response: any) => {
      const result: any = response.json() as unknown;
      return result as AvailabilityResponse;
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

  if (handleErrors(response)) {
    return;
  }

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
    console.error('e', e);
  });

  return data;
}

function handleErrors(resp: any) {
  return false;
}