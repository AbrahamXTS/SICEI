import { EnrollmentDTO } from "./Enrollment";

export type StudentsGroupedByEquivalentDegree = Record<
  string,
  Record<string, EnrollmentDTO[]>
>;
