import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

import { useDeleteSubject as useDeleteSubjectService } from "@/api/subject";
import { SubjectDTO } from "@/interfaces/http/responses";

export const useDeleteSubject = () => {
  const { isPending, mutate } = useDeleteSubjectService();

  const _deleteSubject = (subjectId: string) => {
    mutate(subjectId, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratabamos de eliminar la asignatura. ${error.response?.data?.message}`,
          });
        }
      },
    });
  };

  const deleteSubject = ({ id, name }: SubjectDTO) => {
    modals.openConfirmModal({
      title: <Text fw="bold">¿Realmente deseas hacer esto?</Text>,
      children: (
        <Text size="sm">Estas a punto de eliminar la asignatura {name}</Text>
      ),
      centered: true,
      labels: {
        cancel: "No, cancelar",
        confirm: "Sí, eliminar",
      },
      onConfirm: () => _deleteSubject(id),
    });
  };

  return {
    deleteSubject,
    isDeletingASubject: isPending,
  };
};
