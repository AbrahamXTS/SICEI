import { notifications } from "@mantine/notifications";

import { useGetTeacherById as useGetTeacherByIdService } from "@/api/teacher";

export const useGetTeacherById = (teacherId: string) => {
  const { data, isError, isPending } = useGetTeacherByIdService(teacherId);

  if (isError) {
    notifications.show({
      title: "¡Oh no!",
      message:
        "Algo salió mal mientras tratabamos de obtener al profesor solicitado.",
    });
  }

  return {
    isGettingTeacher: isPending,
    teacher: data?.data,
  };
};
