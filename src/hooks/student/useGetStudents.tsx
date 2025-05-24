import { notifications } from "@mantine/notifications";

import { useGetStudents as useGetStudentsService } from "@/api/student";
import { transformToSelectDataType } from "@/utils";

export const useGetStudents = () => {
  const { data, isError, isPending } = useGetStudentsService();

  if (isError) {
    notifications.show({
      title: "¡Oh no!",
      message:
        "Algo salió mal mientras tratabamos de obtener la información de los estudiantes.",
    });
  }

  return {
    isGettingStudents: isPending,
    students: data?.data ?? [],
    transformedValues: transformToSelectDataType(data?.data, (student) => ({
      label: `${student.name} ${student.lastName} ${student.secondLastName}`,
      value: student.id,
    })),
  };
};
