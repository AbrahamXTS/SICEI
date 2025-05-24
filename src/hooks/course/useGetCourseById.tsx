import { notifications } from "@mantine/notifications";

import { useGetCourseById as useGetCourseByIdService } from "@/api/course";

export const useGetCourseById = (courseId: string) => {
  const { data, isError, isPending } = useGetCourseByIdService(courseId);

  if (isError) {
    notifications.show({
      title: "¡Oh no!",
      message:
        "Algo salió mal mientras tratabamos de obtener el curso solicitado.",
    });
  }

  return {
    isGettingCourse: isPending,
    course: data?.data,
  };
};
