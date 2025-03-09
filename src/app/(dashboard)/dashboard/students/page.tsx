'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllStudents } from '@/hooks/student.hook';
import { format } from 'date-fns';
import { CopyIcon, EyeIcon, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function StudentsPage() {
  const { students, isLoading } = useGetAllStudents();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Students</h1>
        <Link href="/dashboard/students/create">
          <Button>
            <PlusCircle className="h-5 w-5 mr-2" />
            New Student
          </Button>
        </Link>
      </div>

      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Certificate ID</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Completion Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[50px] ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.certificateId}
                  className="cursor-default"
                >
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.certificateId}</TableCell>
                  <TableCell>{format(student.startDate, 'PPP')}</TableCell>
                  <TableCell>{format(student.completionDate, 'PPP')}</TableCell>
                  <TableCell className="flex justify-end items-center gap-3">
                    <EyeIcon
                      className="cursor-pointer hover:text-blue-500 size-5"
                      onClick={() =>
                        window.open(
                          `${window.location.origin}/verify/${student.certificateId}`
                        )
                      }
                    />
                    <CopyIcon
                      className="cursor-pointer hover:text-green-500 size-4"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/verify/${student.certificateId}`
                        );
                        toast.success('Link Copied Successfully!');
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
