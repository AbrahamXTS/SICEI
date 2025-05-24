export interface CreateEnrollmentRequestDTO {
  studentId: string;
  courseId: string;
  enrollmentType: "EXTRAORDINARY" | "REGULAR";
}
