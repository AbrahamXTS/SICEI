import { SubjectDTO } from "./Subject";
import { TeacherDTO } from "./Teacher";

export interface CourseDTO {
  id: string;
  subject: SubjectDTO;
  teacher: TeacherDTO;
}
