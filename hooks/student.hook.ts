import { createStudent, geAllStudents } from '@/services/student.service';
import { CreateStudentData } from '@/types/student.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useCreateStudent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateStudentData) => createStudent(payload),
    onSuccess: (data: any) => {
      console.log({ data });
      if (data?.success) {
        router.push('/dashboard/students');
        queryClient.invalidateQueries(['STUDENTS'] as any);
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
