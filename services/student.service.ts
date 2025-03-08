'use server';

import { IResponse } from '@/types';
import { CreateStudentData, Student } from '@/types/student.type';
import { revalidatePath, revalidateTag } from 'next/cache';

export const createStudent = async (
  data: CreateStudentData
): Promise<IResponse<Student>> => {
  'use server';

  console.log({ base: `${process.env.BASE_URL}/api/v1/students/` });

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

export const getStudent = async (
  certificateId: string
): Promise<IResponse<Student>> => {
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
