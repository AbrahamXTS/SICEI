import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

import { useDeleteTeacher as useDeleteTeacherService } from "@/api/teacher";
import { TeacherDTO } from "@/interfaces/http/responses";

export const useDeleteTeacher = () => {
  const { isPending, mutate } = useDeleteTeacherService();

  const _deleteTeacher = (teacherId: string) => {
    mutate(teacherId, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratabamos de eliminar al profesor. ${error.response?.data?.message}`,
          });
        }
      },
    });
  };

  const deleteTeacher = ({
    employeeId: id,
    lastName,
    name,
    secondLastName,
  }: TeacherDTO) => {
    modals.openConfirmModal({
      title: <Text fw="bold">¿Realmente deseas hacer esto?</Text>,
      children: (
        <Text size="sm">
          Estas a punto de eliminar al profesor {name} {lastName}{" "}
          {secondLastName}
        </Text>
      ),
      centered: true,
      labels: {
        cancel: "No, cancelar",
        confirm: "Sí, eliminar",
      },
      onConfirm: () => _deleteTeacher(id),
    });
  };

  return {
    deleteTeacher,
    isDeletingATeacher: isPending,
  };
};
