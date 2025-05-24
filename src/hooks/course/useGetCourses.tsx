import { notifications } from "@mantine/notifications";

import { useGetCourses as useGetCoursesService } from "@/api/course";
import { transformToSelectDataType } from "@/utils";

export const useGetCourses = () => {
  const { data, isError, isPending } = useGetCoursesService();

  if (isError) {
    notifications.show({
      title: "¡Oh no!",
      message:
        "Algo salió mal mientras tratabamos de obtener la información de los cursos.",
    });
  }

  return {
    isGettingCourses: isPending,
    courses: data?.data ?? [],
    transformedValues: transformToSelectDataType(data?.data, (course) => ({
      label: `${course.subject.name} - ${course.teacher.name} ${course.teacher.lastName} ${course.teacher.secondLastName}`,
      value: course.id,
    })),
  };
};
