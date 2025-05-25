import { notifications } from "@mantine/notifications";

import { useGetSubjects as useGetSubjectsService } from "@/api/subject";
import { transformToSelectDataType } from "@/utils";

export const useGetSubjects = () => {
  const { data, isError, isPending } = useGetSubjectsService();

  if (isError) {
    notifications.show({
      title: "¡Oh no!",
      message:
        "Algo salió mal mientras tratabamos de obtener la información de las asignaturas.",
    });
  }

  return {
    isGettingSubjects: isPending,
    subjects: data?.data ?? [],
    transformedValues: transformToSelectDataType(data?.data, (subject) => ({
      label: `${subject.name} - Semestre ${subject.offeredInDegree}`,
      value: subject.id,
    })),
  };
};
