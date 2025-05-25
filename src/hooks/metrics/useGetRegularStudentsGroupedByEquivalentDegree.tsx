import { notifications } from "@mantine/notifications";
import { useMemo } from "react";

import { useGetRegularStudentsGroupedByEquivalentDegree as useGetRegularStudentsGroupedByEquivalentDegreeService } from "@/api/metrics";
import { GRAPHIC_COLORS } from "@/configurations";

export const useGetRegularStudentsGroupedByEquivalentDegree = () => {
  const { data, isError, isPending } =
    useGetRegularStudentsGroupedByEquivalentDegreeService();

  const regularStudentsCountByEquivalentDegree = useMemo(() => {
    if (data?.data) {
      return Object.keys(data.data).map((degree, index) => {
        return {
          dataset: Object.values(data.data[degree]),
          name: `Semestre ${degree}`,
          value: Object.keys(data.data[degree]).length,
          color: GRAPHIC_COLORS[index % GRAPHIC_COLORS.length],
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
    isGettingRegularStudentsGroupedByEquivalentDegree: isPending,
    regularStudentsCountByEquivalentDegree:
      regularStudentsCountByEquivalentDegree ?? [],
  };
};
