import { CourseDTO } from "./Course";
import { GradeDTO } from "./Grade";
import { StudentDTO } from "./Student";

export interface EnrollmentDTO {
  id: string;
  student: StudentDTO;
  course: CourseDTO;
  grade: GradeDTO | null;
  enrollmentType: "EXTRAORDINARY" | "REGULAR";
}