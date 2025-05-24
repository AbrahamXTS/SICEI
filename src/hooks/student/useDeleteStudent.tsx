import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

import { useDeleteStudent as useDeleteStudentService } from "@/api/student";
import { StudentDTO } from "@/interfaces/http/responses";

export const useDeleteStudent = () => {
  const { isPending, mutate } = useDeleteStudentService();

  const _deleteStudent = (studentId: string) => {
    mutate(studentId, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratabamos de eliminar al estudiante. ${error.response?.data?.message}`,
          });
        }
      },
    });
  };

  const deleteStudent = ({
    id,
    lastName,
    name,
    secondLastName,
  }: StudentDTO) => {
    modals.openConfirmModal({
      title: <Text fw="bold">¿Realmente deseas hacer esto?</Text>,
      children: (
        <Text size="sm">
          Estas a punto de eliminar al estudiante {name} {lastName}{" "}
          {secondLastName}
        </Text>
      ),
      centered: true,
      labels: {
        cancel: "No, cancelar",
        confirm: "Sí, eliminar",
      },
      onConfirm: () => _deleteStudent(id),
    });
  };

  return {
    deleteStudent,
    isDeletingAStudent: isPending,
  };
};
