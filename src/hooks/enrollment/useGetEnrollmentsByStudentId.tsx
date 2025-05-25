import { notifications } from "@mantine/notifications";

import { useGetEnrollmentsByStudentId as useGetEnrollmentsByStudentIdService } from "@/api/enrollment";

export const useGetEnrollmentsByStudentId = (studentId: string) => {
  const { data, isError, isPending } =
    useGetEnrollmentsByStudentIdService(studentId);

  if (isError) {
    notifications.show({
      title: "¡Oh no!",
      message:
        "Algo salió mal mientras tratabamos de obtener las calificaciones solicitadas.",
    });
  }

  return {
    isGettingEnrollments: isPending,
    enrollments: data?.data ?? [],
  };
};
