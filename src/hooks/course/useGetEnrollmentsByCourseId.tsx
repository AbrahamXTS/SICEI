import { notifications } from "@mantine/notifications";

import { useGetEnrollmentsByCourseId as useGetEnrollmentsByCourseIdService } from "@/api/course";

export const useGetEnrollmentsByCourseId = (courseId: string) => {
  const { data, isError, isPending } =
    useGetEnrollmentsByCourseIdService(courseId);

  if (isError) {
    notifications.show({
      title: "¡Oh no!",
      message:
        "Algo salió mal mientras tratabamos de obtener las inscripciones solicitadas.",
    });
  }

  return {
    isGettingEnrollments: isPending,
    enrollments: data?.data ?? [],
  };
};
