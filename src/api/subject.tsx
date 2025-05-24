import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAxiosClient } from "@/hooks";
import {
  CreateSubjectRequestDTO,
  UpdateSubjectRequestDTO,
} from "@/interfaces/http/requests";
import { SubjectDTO, ResponseWrapper } from "@/interfaces/http/responses";

export const useGetSubjects = () => {
  const axiosClient = useAxiosClient();

  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const { data } =
        await axiosClient.get<ResponseWrapper<SubjectDTO[]>>(
          "/api/v1/subjects"
        );

      return data;
    },
  });
};

export const useCreateSubject = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subject: CreateSubjectRequestDTO) => {
      const { data } = await axiosClient.post<ResponseWrapper<SubjectDTO>>(
        "/api/v1/subjects",
        subject
      );

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });
};

export const useUpdateSubject = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subject: UpdateSubjectRequestDTO) => {
      const { data } = await axiosClient.put<ResponseWrapper<SubjectDTO>>(
        "/api/v1/subjects",
        subject
      );

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });
};

export const useDeleteSubject = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subjectId: string) => {
      await axiosClient.delete<ResponseWrapper<void>>(
        `/api/v1/subjects/${subjectId}`
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });
};
