import { createStudent, geAllStudents } from '@/services/student.service';
import { IResponse } from '@/types';
import { ICreateStudentData, IStudent } from '@/types/student.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useCreateStudent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateStudentData) => createStudent(payload),
    onSuccess: (data: IResponse<IStudent>) => {
      if (data?.success) {
        router.push('/dashboard/students');
        queryClient.invalidateQueries({ queryKey: ['STUDENTS'] });
        toast.success('Student Profile Created Successfully!');
      }
    },
  });
};

export const useGetAllStudents = () => {
  const result = useQuery({
    queryKey: ['STUDENTS'],
    queryFn: geAllStudents,
  });

  return { ...result, students: result?.data?.data || [] };
};
