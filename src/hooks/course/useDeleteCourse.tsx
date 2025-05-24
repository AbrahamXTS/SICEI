import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

import { useDeleteCourse as useDeleteCourseService } from "@/api/course";
import { CourseDTO } from "@/interfaces/http/responses";

export const useDeleteCourse = () => {
  const { isPending, mutate } = useDeleteCourseService();

  const _deleteCourse = (courseId: string) => {
    mutate(courseId, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratabamos de eliminar el curso. ${error.response?.data?.message}`,
          });
        }
      },
    });
  };

  const deleteCourse = ({ id, subject, teacher }: CourseDTO) => {
    modals.openConfirmModal({
      title: <Text fw="bold">¿Realmente deseas hacer esto?</Text>,
      children: (
        <Text size="sm">
          Estas a punto de eliminar el curso {subject.name} impartido por el
          profesor {teacher.name} {teacher.lastName} {teacher.secondLastName}
        </Text>
      ),
      centered: true,
      labels: {
        cancel: "No, cancelar",
        confirm: "Sí, eliminar",
      },
      onConfirm: () => _deleteCourse(id),
    });
  };

  return {
    deleteCourse,
    isDeletingACourse: isPending,
  };
};
