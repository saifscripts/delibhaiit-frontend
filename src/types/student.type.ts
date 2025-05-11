export interface IStudent {
  _id: string;
  certificateId: string;
  name: string;
  startDate: string;
  completionDate: string;
  photo: string;
  createdAt: string;
}

export interface ICreateStudentData {
  name: string;
  startDate: string;
  completionDate: string;
  photo: File;
}

export interface IUpdateStudentData {
  id: string;
  data: {
    name: string;
    startDate: string;
    completionDate: string;
  };
}
