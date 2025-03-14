'use server';

import { ICredentials } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

  if (data?.success) {
    (await cookies()).set({
      name: 'auth_token',
      value: data.token,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
  }

  return data;
};

export const logout = async () => {
  (await cookies()).delete('auth_token');
  redirect('/login');
};
