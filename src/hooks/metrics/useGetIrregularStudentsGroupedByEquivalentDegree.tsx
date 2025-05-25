import { notifications } from "@mantine/notifications";
import { useMemo } from "react";

import { useGetIrregularStudentsGroupedByEquivalentDegree as useGetIrregularStudentsGroupedByEquivalentDegreeService } from "@/api/metrics";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CFE",
  "#FF6699",
  "#339933",
  "#993333",
  "#9999FF",
  "#FFCCCC",
  "#CCFF99",
  "#FF9966",
];

export const useGetIrregularStudentsGroupedByEquivalentDegree = () => {
  const { data, isError, isPending } =
    useGetIrregularStudentsGroupedByEquivalentDegreeService();

  const irregularStudentsCountByEquivalentDegree = useMemo(() => {
    if (data?.data) {
      return Object.keys(data.data).map((degree, index) => {
        return {
          name: `Semestre ${degree}`,
          value: Object.keys(data.data[degree]).length,
          color: COLORS[index % COLORS.length],
        };
      });
    }
  }, [data]);

  if (isError) {
    notifications.show({
      title: "¡Oh no!",
      message:
        "Algo salió mal mientras tratabamos de obtener las metricas solicitadas.",
    });
  }

  return {
    isGettingIrregularStudentsGroupedByEquivalentDegree: isPending,
    irregularStudentsCountByEquivalentDegree:
      irregularStudentsCountByEquivalentDegree ?? [],
  };
};
