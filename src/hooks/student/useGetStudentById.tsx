import { notifications } from "@mantine/notifications";

import { useGetStudentById as useGetStudentByIdService } from "@/api/student";

export const useGetStudentById = (studentId: string) => {
  const { data, isError, isPending } = useGetStudentByIdService(studentId);

  if (isError) {
    notifications.show({
      title: "¡Oh no!",
      message:
        "Algo salió mal mientras tratabamos de obtener al estudiante solicitado.",
    });
  }

  return {
    isGettingStudent: isPending,
    student: data?.data,
  };
};
