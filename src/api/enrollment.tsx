import { useMutation, useQuery } from "@tanstack/react-query";

import { useAxiosClient } from "@/hooks";
import { CreateEnrollmentRequestDTO } from "@/interfaces/http/requests";
import { EnrollmentDTO, ResponseWrapper } from "@/interfaces/http/responses";

export const useGetEnrollmentsByCourseId = (courseId: string) => {
  const axiosClient = useAxiosClient();

  return useQuery({
    queryKey: ["course", courseId, "enrollments"],
    queryFn: async () => {
      const { data } = await axiosClient.get<ResponseWrapper<EnrollmentDTO[]>>(
        `/api/v1/courses/${courseId}/enrollments`
      );

      return data;
    },
  });
};

export const useGetEnrollmentsByStudentId = (studentId: string) => {
  const axiosClient = useAxiosClient();

  return useQuery({
    queryKey: ["student", studentId, "enrollments"],
    queryFn: async () => {
      const { data } = await axiosClient.get<ResponseWrapper<EnrollmentDTO[]>>(
        `/api/v1/students/${studentId}/enrollments`
      );

      return data;
    },
  });
};

export const useCreateEnrollment = () => {
  const axiosClient = useAxiosClient();

  return useMutation({
    mutationFn: async (enrollment: CreateEnrollmentRequestDTO) => {
      const { data } = await axiosClient.post<ResponseWrapper<EnrollmentDTO>>(
        "/api/v1/enrollments",
        enrollment
      );

      return data;
    },
  });
};

export const useDeleteEnrollment = () => {
  const axiosClient = useAxiosClient();

  return useMutation({
    mutationFn: async (enrollmentId: string) => {
      await axiosClient.delete<ResponseWrapper<void>>(
        `/api/v1/enrollments/${enrollmentId}`
      );
    },
  });
};
