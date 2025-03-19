export interface IStudent {
  _id: string;
  certificateId: string;
  name: string;
  startDate: string;
  completionDate: string;
}

export interface ICreateStudentData {
  name: string;
  startDate: string;
  completionDate: string;
}
