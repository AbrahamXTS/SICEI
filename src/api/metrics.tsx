import { useQuery } from "@tanstack/react-query";

import { useAxiosClient } from "@/hooks";
import { ResponseWrapper } from "@/interfaces/http/responses";
import { StudentsGroupedByEquivalentDegree } from "@/interfaces/http/responses/Metrics";

export const useGetRegularStudentsGroupedByEquivalentDegree = () => {
  const axiosClient = useAxiosClient();

  return useQuery({
    queryKey: ["metrics", "students-approved-by-grade"],
    queryFn: async () => {
      const { data } = await axiosClient.get<
        ResponseWrapper<StudentsGroupedByEquivalentDegree>
      >(`/api/v1/metrics/students/approved-by-grade`);

      return data;
    },
  });
};

export const useGetIrregularStudentsGroupedByEquivalentDegree = () => {
  const axiosClient = useAxiosClient();

  return useQuery({
    queryKey: ["metrics", "students-with-failures-by-grade"],
    queryFn: async () => {
      const { data } = await axiosClient.get<
        ResponseWrapper<StudentsGroupedByEquivalentDegree>
      >(`/api/v1/metrics/students/with-failures-by-grade`);

      return data;
    },
  });
};
