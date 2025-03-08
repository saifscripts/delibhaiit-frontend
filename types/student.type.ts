export interface Student {
  certificateId: string;
  name: string;
  startDate: string;
  completionDate: string;
}

export interface CreateStudentData {
  name: string;
  startDate: string;
  completionDate: string;
}
