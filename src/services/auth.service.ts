'use server';

import { ICredentials } from '@/types';

export const login = async (credentials: ICredentials) => {
  const response = await fetch(`${process.env.BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  const data = await response.json();
  return data;
};
