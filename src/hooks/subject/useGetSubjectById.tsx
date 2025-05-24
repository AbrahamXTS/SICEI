import { notifications } from "@mantine/notifications";

import { useGetSubjectById as useGetSubjectByIdService } from "@/api/subject";

export const useGetSubjectById = (subjectId: string) => {
  const { data, isError, isPending } = useGetSubjectByIdService(subjectId);

  if (isError) {
    notifications.show({
      title: "¡Oh no!",
      message:
        "Algo salió mal mientras tratabamos de obtener la asignatura solicitada.",
    });
  }

  return {
    isGettingSubject: isPending,
    subject: data?.data,
  };
};
