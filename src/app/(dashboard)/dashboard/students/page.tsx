'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CopyIcon,
  EyeIcon,
  PlusCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function StudentsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { students, meta, isFetching } = useGetAllStudents(searchParams);

  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const totalPages = meta?.totalPages || 0;

  const setSearchParams = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (!value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

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
          {isFetching ? (
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
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

      <div className="flex items-center justify-between gap-2 mt-8">
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchParams('page', '1')}
            disabled={currentPage === 1}
          >
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchParams('page', String(currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="flex items-center gap-2">
            <span className="hidden sm:inline">Page </span>
            <span className="">{currentPage}</span>{' '}
            <span>of {meta?.totalPages}</span>
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchParams('page', String(currentPage + 1))}
            disabled={currentPage >= totalPages}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchParams('page', String(totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronsRightIcon />
          </Button>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setSearchParams('limit', value);
            }}
          >
            <SelectTrigger className="w-[80px] focus:outline-0">
              <SelectValue placeholder="Select page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[10, 20, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={String(pageSize)}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Patination Info */}
      {/* <PaginationInfo /> */}
    </div>
  );
}

// function PaginationInfo() {
//     const { table } = useStudyTable();

//     const pageIndex = table.getState().pagination.pageIndex;
//     const pageSize = table.getState().pagination.pageSize;

//     const startIndex = pageIndex * pageSize + 1;
//     const lastIndex = pageIndex * pageSize + pageSize;

//     const totalRows = table.getRowCount();

//     return (
//       <div className="">
//         View {startIndex} - {lastIndex > totalRows ? totalRows : lastIndex} of{' '}
//         {totalRows}
//       </div>
//     );
//   }
