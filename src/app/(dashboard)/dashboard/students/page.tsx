'use client';

import { ConfirmDeleteDialog } from '@/components/dashboard/students/confirm-delete-dialogue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useDebouncedState } from '@/hooks/debounce.hook';
import { useGetAllStudents } from '@/hooks/student.hook';
import { format } from 'date-fns';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EditIcon,
  EyeIcon,
  PlusCircle,
  SearchIcon,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import CopyButton from './_components/copy-button';
import DownloadQRCode from './_components/download-qr-code';

export default function StudentsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, debouncedQuery, setQuery] = useDebouncedState('', 400);
  const { students, meta, isLoading, isRefetching } =
    useGetAllStudents(searchParams);

  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  //   const searchTerm = searchParams.get('searchTerm') || '';
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

    router.replace(`${pathname}${query}`);
  };

  useEffect(() => {
    setSearchParams('searchTerm', debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

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
        <div className="relative max-w-md">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, Certificate ID"
            className="w-full pr-8"
          />
          <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
        </div>
      </div>

      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Certificate ID</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Completion Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading || isRefetching ? (
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
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
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        {student.photo ? (
                          <Image
                            src={student.photo}
                            alt={student.name}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-muted flex items-center justify-center">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <span>{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.certificateId}</TableCell>
                  <TableCell>{format(student.startDate, 'PPP')}</TableCell>
                  <TableCell>{format(student.completionDate, 'PPP')}</TableCell>
                  <TableCell className="flex justify-end items-center">
                    <DownloadQRCode student={student} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-blue-500 hover:bg-blue-500/10"
                      onClick={() =>
                        window.open(
                          `${window.location.origin}/verify/${student.certificateId}`
                        )
                      }
                    >
                      <EyeIcon className="size-4" />
                    </Button>
                    <CopyButton
                      link={`${window.location.origin}/verify/${student.certificateId}`}
                    />
                    <Link
                      href={`/dashboard/students/edit/${student.certificateId}`}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-400 hover:text-blue-500 hover:bg-blue-500/10"
                      >
                        <EditIcon className="size-4" />
                      </Button>
                    </Link>
                    <ConfirmDeleteDialog
                      studentName={student.name}
                      studentId={student._id}
                      certificateId={student.certificateId}
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
