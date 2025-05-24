export interface CreateGradeRequestDTO {
  enrollmentId: string;
  score: number;
}

export interface UpdateGradeRequestDTO {
  id: string;
  score: number;
}
