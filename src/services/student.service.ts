'use server';

import { IResponse } from '@/types';
import { ICreateStudentData, IStudent } from '@/types/student.type';
import { revalidatePath, revalidateTag } from 'next/cache';

export const createStudent = async (
  data: ICreateStudentData
): Promise<IResponse<IStudent>> => {
  'use server';

  const response = await fetch(`${process.env.BASE_URL}/api/v1/students/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Student Creation Failed!');
  }

  const result = await response.json();

  if (result.success) {
    revalidateTag('student');
    revalidateTag('students');
    revalidatePath(`/dashboard/verify/${result.data.certificateId}`);
  }

  return result;
};

export const getSingleStudent = async (
  certificateId: string
): Promise<IResponse<IStudent>> => {
  'use server';

  const response = await fetch(
    `${process.env.BASE_URL}/api/v1/students/${certificateId}`,
    { next: { tags: ['student'] } }
  );

  if (!response.ok) {
    throw new Error('Certificate Verification Failed!');
  }

  return response.json();
};

export const geAllStudents = async (
  query: string = ''
): Promise<IResponse<IStudent[]>> => {
  'use server';

  const response = await fetch(
    `${process.env.BASE_URL}/api/v1/students${query ? `?${query}` : ''}`,
    {
      next: { tags: ['students'] },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch students!');
  }

  return response.json();
};

export const deleteStudent = async (id: string): Promise<IResponse<null>> => {
  'use server';

  const response = await fetch(
    `${process.env.BASE_URL}/api/v1/students/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Student Deletion Failed!');
  }

  const result = await response.json();

  if (result.success) {
    revalidateTag('student');
    revalidateTag('students');
    revalidatePath(`/dashboard/verify/${result.data.certificateId}`);
  }

  return result;
};
