"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

const initialStudents = [
  {
    id: "1",
    name: "John Doe",
    startDate: "2024-01-01",
    completionDate: "2024-03-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    startDate: "2024-02-01",
    completionDate: "2024-04-01",
  },
]

export default function StudentsPage() {
  const [students] = useState(initialStudents)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Students</h1>
        <Link href="/dashboard/students/add">
          <Button>
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Student
          </Button>
        </Link>
      </div>
      
      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Completion Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.startDate}</TableCell>
                <TableCell>{student.completionDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}