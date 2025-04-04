'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateStudent, useGetStudent } from '@/hooks/student.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parseISO } from 'date-fns';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  startDate: z.string(),
  completionDate: z.string(),
});

export default function EditStudentPage() {
  const { certificateId } = useParams() as { certificateId: string };
  const { student, isLoading } = useGetStudent(certificateId);

  const { mutate: createStudent, isPending } = useCreateStudent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: student?.name || '',
      startDate: student?.startDate
        ? format(parseISO(student?.startDate), 'yyyy-MM-dd')
        : '',
      completionDate: student?.completionDate
        ? format(parseISO(student?.completionDate), 'yyyy-MM-dd')
        : '',
    },
  });

  useEffect(() => {
    if (student) {
      form.reset({
        name: student?.name,
        startDate: student?.startDate
          ? format(parseISO(student?.startDate), 'yyyy-MM-dd')
          : '',
        completionDate: student?.completionDate
          ? format(parseISO(student?.completionDate), 'yyyy-MM-dd')
          : '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    createStudent(values);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Edit Student Profile</h1>
      <div className="mt-8 max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completion Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending || isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
