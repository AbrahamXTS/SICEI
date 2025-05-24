import { notifications } from "@mantine/notifications";

import { useGetTeachers as useGetTeachersService } from "@/api/teacher";
import { transformToSelectDataType } from "@/utils";

export const useGetTeachers = () => {
  const { data, isError, isPending } = useGetTeachersService();

  if (isError) {
    notifications.show({
      title: "¡Oh no!",
      message:
        "Algo salió mal mientras tratabamos de obtener la información de los profesores.",
    });
  }

  return {
    isGettingTeachers: isPending,
    teachers: data?.data ?? [],
    transformedValues: transformToSelectDataType(data?.data, (teacher) => ({
      label: `${teacher.name} ${teacher.lastName} ${teacher.secondLastName}`,
      value: teacher.employeeId,
    })),
  };
};
