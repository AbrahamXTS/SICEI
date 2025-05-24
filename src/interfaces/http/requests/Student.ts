export interface CreateStudentRequestDTO {
  email: string;
  equivalentDegree: number;
  lastName: string;
  name: string;
  secondLastName: string;
}

export interface UpdateStudentRequestDTO {
  email: string;
  equivalentDegree: number;
  id: string;
  lastName: string;
  name: string;
  secondLastName: string;
}
