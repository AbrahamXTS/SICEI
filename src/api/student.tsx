import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAxiosClient } from "@/hooks";
import {
  CreateStudentRequestDTO,
  UpdateStudentRequestDTO,
} from "@/interfaces/http/requests";
import { StudentDTO, ResponseWrapper } from "@/interfaces/http/responses";

export const useGetStudents = () => {
  const axiosClient = useAxiosClient();

  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data } =
        await axiosClient.get<ResponseWrapper<StudentDTO[]>>(
          "/api/v1/students"
        );

      return data;
    },
  });
};

export const useCreateStudent = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (student: CreateStudentRequestDTO) => {
      const { data } = await axiosClient.post<ResponseWrapper<StudentDTO>>(
        "/api/v1/students",
        student
      );

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });
};

export const useUpdateStudent = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (student: UpdateStudentRequestDTO) => {
      const { data } = await axiosClient.put<ResponseWrapper<StudentDTO>>(
        "/api/v1/students",
        student
      );

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });
};

export const useDeleteStudent = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentId: string) => {
      await axiosClient.delete<ResponseWrapper<void>>(
        `/api/v1/students/${studentId}`
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });
};
