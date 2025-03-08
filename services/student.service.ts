import { AxiosPrivate } from '@/lib/api';
import { CreateStudentData } from '@/types/student.type';

export const createStudent = async (data: CreateStudentData) => {
  const response = await AxiosPrivate.post('/students', data);
  return response.data;
};
