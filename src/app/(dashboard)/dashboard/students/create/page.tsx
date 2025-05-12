'use client';

import FormImageUploader from '@/components/form/FormImageUploader';
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
import { useCreateStudent } from '@/hooks/student.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  startDate: z.string(),
  completionDate: z.string(),
  photo: z.instanceof(File, { message: 'Photo is required' }),
});

export default function AddStudentPage() {
  const { mutate: createStudent, isPending } = useCreateStudent();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      startDate: '',
      completionDate: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createStudent(values);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Create Student Profile</h1>
      <div className="mt-8 max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormImageUploader
              name="photo"
              label="Photo"
              width={150}
              height={180}
              imageSize="150x180"
            />
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
            <Button type="submit" disabled={isPending}>
              Create Student
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
