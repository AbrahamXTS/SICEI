import { useMutation } from "@tanstack/react-query";

import { useAxiosClient } from "@/hooks";
import {
  CreateGradeRequestDTO,
  UpdateGradeRequestDTO,
} from "@/interfaces/http/requests";
import { GradeDTO, ResponseWrapper } from "@/interfaces/http/responses";

export const useCreateGrade = () => {
  const axiosClient = useAxiosClient();

  return useMutation({
    mutationFn: async (grade: CreateGradeRequestDTO) => {
      const { data } = await axiosClient.post<ResponseWrapper<GradeDTO>>(
        "/api/v1/grades",
        grade
      );

      return data;
    },
  });
};

export const useUpdateGrade = () => {
  const axiosClient = useAxiosClient();

  return useMutation({
    mutationFn: async (grade: UpdateGradeRequestDTO) => {
      const { data } = await axiosClient.put<ResponseWrapper<GradeDTO>>(
        "/api/v1/grades",
        grade
      );

      return data;
    },
  });
};
