import { createStudent } from '@/services/student.service';
import { CreateStudentData } from '@/types/student.type';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreateStudent = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: CreateStudentData) => createStudent(payload),
    onSuccess: (data: any) => {
      console.log({ data });
      if (data?.success) {
        router.push('/dashboard/students');
      }
    },
  });
};
