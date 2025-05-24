import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { useDeleteEnrollment as useDeleteEnrollmentService } from "@/api/enrollment";
import { EnrollmentDTO } from "@/interfaces/http/responses";

export const useDeleteEnrollment = (courseId: string) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useDeleteEnrollmentService();

  const _deleteEnrollment = (enrollmentId: string) => {
    mutate(enrollmentId, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratabamos de eliminar la inscripción. ${error.response?.data?.message}`,
          });
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["course", courseId, "enrollments"],
        });
      },
    });
  };

  const deleteEnrollment = ({ id, course, student }: EnrollmentDTO) => {
    modals.openConfirmModal({
      title: <Text fw="bold">¿Realmente deseas hacer esto?</Text>,
      children: (
        <Text size="sm">
          Estas a punto de eliminar la inscripción de {student.name}{" "}
          {student.lastName} {student.secondLastName} del curso "
          {course.subject.name}" impartido por el profesor {course.teacher.name}{" "}
          {course.teacher.lastName} {course.teacher.secondLastName}
        </Text>
      ),
      centered: true,
      labels: {
        cancel: "No, cancelar",
        confirm: "Sí, eliminar",
      },
      onConfirm: () => _deleteEnrollment(id),
    });
  };

  return {
    deleteEnrollment,
    isDeletingAEnrollment: isPending,
  };
};
