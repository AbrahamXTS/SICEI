import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAxiosClient } from "@/hooks";
import {
  CreateCourseRequestDTO,
  UpdateCourseRequestDTO,
} from "@/interfaces/http/requests";
import { CourseDTO, ResponseWrapper } from "@/interfaces/http/responses";

export const useGetCourses = () => {
  const axiosClient = useAxiosClient();

  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } =
        await axiosClient.get<ResponseWrapper<CourseDTO[]>>("/api/v1/courses");

      return data;
    },
  });
};

export const useCreateCourse = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (course: CreateCourseRequestDTO) => {
      const { data } = await axiosClient.post<ResponseWrapper<CourseDTO>>(
        "/api/v1/courses",
        course
      );

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
};

export const useUpdateCourse = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (course: UpdateCourseRequestDTO) => {
      const { data } = await axiosClient.put<ResponseWrapper<CourseDTO>>(
        "/api/v1/courses",
        course
      );

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
};

export const useDeleteCourse = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      await axiosClient.delete<ResponseWrapper<void>>(
        `/api/v1/courses/${courseId}`
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
};
