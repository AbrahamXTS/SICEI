export interface CreateCourseRequestDTO {
  subjectId: string;
  teacherId: string;
}

export interface UpdateCourseRequestDTO {
  id: string;
  subjectId: string;
  teacherId: string;
}
