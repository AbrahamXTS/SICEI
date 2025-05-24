import { useMutation } from "@tanstack/react-query";

import { useAxiosClient } from "@/hooks";
import { CreateEnrollmentRequestDTO } from "@/interfaces/http/requests";
import { EnrollmentDTO, ResponseWrapper } from "@/interfaces/http/responses";

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
