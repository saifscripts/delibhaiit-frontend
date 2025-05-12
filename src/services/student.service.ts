'use server';

import { objectToFormData } from '@/lib/objectToFormData';
import { IResponse } from '@/types';
import {
  ICreateStudentData,
  IStudent,
  IUpdateStudentData,
} from '@/types/student.type';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const createStudent = async (
  data: ICreateStudentData
): Promise<IResponse<IStudent>> => {
  'use server';

  const response = await fetch(`${process.env.BASE_URL}/api/v1/students/`, {
    method: 'POST',
    body: objectToFormData(data),
  });

  if (!response.ok) {
    throw new Error('Student Creation Failed!');
  }

  const result = await response.json();

  console.log({ result });

  if (result.success) {
    revalidateTag('student');
    revalidateTag('students');
    revalidatePath(`/dashboard/verify/${result.data.certificateId}`);
  }

  return result;
};

export const updateStudent = async (
  options: IUpdateStudentData
): Promise<IResponse<IStudent>> => {
  'use server';

  const cookieStore = await cookies();
  const auth_token = cookieStore.get('auth_token')?.value;

  const response = await fetch(
    `${process.env.BASE_URL}/api/v1/students/${options.id}`,
    {
      method: 'PUT',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Cookie: `auth_token=${auth_token}`,
      },
      body: objectToFormData(options.data),
    }
  );

  if (!response.ok) {
    throw new Error('Student Update Failed!');
  }

  const result = await response.json();

  console.log({ result });

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

  const cookieStore = await cookies();
  const auth_token = cookieStore.get('auth_token')?.value;

  const response = await fetch(
    `${process.env.BASE_URL}/api/v1/students/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `auth_token=${auth_token}`,
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
