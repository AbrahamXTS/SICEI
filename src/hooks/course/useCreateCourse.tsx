import { Button, Modal, Select, Stack, Text } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

import { useCreateCourse as useCreateCourseService } from "@/api/course";
import { CreateCourseRequestDTO } from "@/interfaces/http/requests";

import { useGetTeachers } from "../teacher";
import { useGetSubjects } from "../subject";

export const useCreateCourse = () => {
  const { transformedValues: subjects } = useGetSubjects();
  const { transformedValues: teachers } = useGetTeachers();

  const { isPending, mutate } = useCreateCourseService();
  const [
    isCreateCourseModalOpen,
    { close: closeCreateCourseModal, open: openCreateCourseModal },
  ] = useDisclosure();

  const { getInputProps, onSubmit, reset } = useForm<CreateCourseRequestDTO>({
    initialValues: {
      subjectId: "",
      teacherId: "",
    },
    mode: "uncontrolled",
    validate: {
      subjectId: isNotEmpty("La asignatura es un campo requerido."),
      teacherId: isNotEmpty("El profesor es un campo requerido."),
    },
    validateInputOnChange: true,
  });

  const _createCourse = (course: CreateCourseRequestDTO) => {
    mutate(course, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratábamos de crear el curso solicitado. ${error.response?.data?.message}`,
          });
        }
      },
    });

    closeCreateCourseModal();
    reset();
  };

  return {
    createCourseModal: (
      <Modal
        opened={isCreateCourseModalOpen}
        onClose={closeCreateCourseModal}
        title={<Text fw="bold">Nuevo curso</Text>}
        centered
      >
        <form onSubmit={onSubmit((course) => _createCourse(course))}>
          <Stack gap="md">
            <Select
              data={subjects}
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
            Crear curso
          </Button>
        </form>
      </Modal>
    ),
    isCreatingACourse: isPending,
    showCreateCourseModal: openCreateCourseModal,
  };
};
