'use server';

import { ICredentials } from '@/types';
import { redirect } from 'next/navigation';

export const login = async (credentials: ICredentials) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed!');
    }

    redirect('/dashboard');
  } catch (error) {
    throw error;
  }
};
