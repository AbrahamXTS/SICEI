import { Button, Modal, Select, Stack, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

import { useUpdateCourse as useUpdateCourseService } from "@/api/course";
import { UpdateCourseRequestDTO } from "@/interfaces/http/requests";
import { CourseDTO } from "@/interfaces/http/responses";

import { useGetSubjects } from "../subject";
import { useGetTeachers } from "../teacher";

export const useUpdateCourse = () => {
  const { transformedValues: subjects } = useGetSubjects();
  const { transformedValues: teachers } = useGetTeachers();

  const { isPending, mutate } = useUpdateCourseService();
  const [
    isUpdateCourseModalOpen,
    { close: closeUpdateCourseModal, open: openUpdateCourseModal },
  ] = useDisclosure();

  const { getInputProps, onSubmit, reset, setValues } =
    useForm<UpdateCourseRequestDTO>({
      initialValues: {
        id: "",
        subjectId: "",
        teacherId: "",
      },
      mode: "uncontrolled",
      validate: {
        id: isNotEmpty("El id del estudiante es inválido."),
        subjectId: isNotEmpty("La asignatura es un campo requerido."),
        teacherId: isNotEmpty("El profesor es un campo requerido."),
      },
      validateInputOnChange: true,
    });

  const _updateCourse = (course: UpdateCourseRequestDTO) => {
    mutate(course, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratábamos de actualizar el curso solicitado. ${error.response?.data?.message}`,
          });
        }
      },
    });

    closeUpdateCourseModal();
    reset();
  };

  return {
    isUpdatingACourse: isPending,
    showUpdateCourseModal: (course: CourseDTO) => {
      setValues({
        id: course.id,
        subjectId: course.subject.id,
        teacherId: course.teacher.employeeId,
      });

      openUpdateCourseModal();
    },
    updateCourseModal: (
      <Modal
        opened={isUpdateCourseModalOpen}
        onClose={closeUpdateCourseModal}
        title={<Text fw="bold">Editar estudiante</Text>}
        centered
      >
        <form onSubmit={onSubmit((product) => _updateCourse(product))}>
          <Stack gap="md">
            <TextInput
              disabled
              label="ID del curso"
              withAsterisk
              {...getInputProps("id")}
            />
            <Select
              data={subjects}
              disabled
              label="Nombre de la asignatura"
              nothingFoundMessage="Sin coincidencias"
              placeholder="Seleccione la asignatura que se impartirá"
              searchable
              withAsterisk
              {...getInputProps("subjectId")}
            />
            <Select
              data={teachers}
              label="Nombre del profesor"
              nothingFoundMessage="Sin coincidencias"
              placeholder="Seleccione el profesor que impartirá la asignatura"
              searchable
              withAsterisk
              {...getInputProps("teacherId")}
            />
          </Stack>
          <Button mt="md" type="submit">
            Editar estudiante
          </Button>
        </form>
      </Modal>
    ),
  };
};
