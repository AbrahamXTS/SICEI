export interface CreateTeacherRequestDTO {
  email: string;
  lastName: string;
  name: string;
  secondLastName: string;
}

export interface UpdateTeacherRequestDTO {
  email: string;
  employeeId: string;
  lastName: string;
  name: string;
  secondLastName: string;
}
