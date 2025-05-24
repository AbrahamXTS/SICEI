import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAxiosClient } from "@/hooks";
import {
  CreateTeacherRequestDTO,
  UpdateTeacherRequestDTO,
} from "@/interfaces/http/requests";
import { TeacherDTO, ResponseWrapper } from "@/interfaces/http/responses";

export const useGetTeachers = () => {
  const axiosClient = useAxiosClient();

  return useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data } = await axiosClient.get<ResponseWrapper<TeacherDTO[]>>(
        "/api/v1/teachers",
      );

      return data;
    },
  });
};

export const useCreateTeacher = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teacher: CreateTeacherRequestDTO) => {
      const { data } = await axiosClient.post<ResponseWrapper<TeacherDTO>>(
        "/api/v1/teachers",
        teacher,
      );

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teachers"] }),
  });
};

export const useUpdateTeacher = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teacher: UpdateTeacherRequestDTO) => {
      const { data } = await axiosClient.put<ResponseWrapper<TeacherDTO>>(
        "/api/v1/teachers",
        teacher,
      );

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teachers"] }),
  });
};

export const useDeleteTeacher = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teacherId: string) => {
      await axiosClient.delete<ResponseWrapper<void>>(
        `/api/v1/teachers/${teacherId}`,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teachers"] }),
  });
};