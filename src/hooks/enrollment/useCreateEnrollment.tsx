import { Button, Modal, Select, Stack, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { useCreateEnrollment as useCreateEnrollmentService } from "@/api/enrollment";
import { CreateEnrollmentRequestDTO } from "@/interfaces/http/requests";

import { useGetStudents } from "../student";

export const useCreateEnrollment = (courseId: string) => {
  const queryClient = useQueryClient();

  const { transformedValues: students } = useGetStudents();
  const { isPending, mutate } = useCreateEnrollmentService();
  const [
    isCreateEnrollmentModalOpen,
    { close: closeCreateEnrollmentModal, open: openCreateEnrollmentModal },
  ] = useDisclosure();

  const { getInputProps, onSubmit, reset, setValues } =
    useForm<CreateEnrollmentRequestDTO>({
      initialValues: {
        courseId: "",
        enrollmentType: "REGULAR",
        studentId: "",
      },
      mode: "uncontrolled",
      validate: {
        courseId: isNotEmpty("El curso es un campo requerido."),
        enrollmentType: isNotEmpty(
          "El tipo de inscripción es un campo requerido."
        ),
        studentId: isNotEmpty("El alumno es un campo requerido."),
      },
      validateInputOnChange: true,
    });

  const _createEnrollment = (enrollment: CreateEnrollmentRequestDTO) => {
    mutate(enrollment, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratábamos de crear la inscripción solicitada. ${error.response?.data?.message}`,
          });
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["course", courseId, "enrollments"],
        });
      },
    });

    closeCreateEnrollmentModal();
    reset();
  };

  return {
    createEnrollmentModal: (
      <Modal
        opened={isCreateEnrollmentModalOpen}
        onClose={closeCreateEnrollmentModal}
        title={<Text fw="bold">Nueva inscripción</Text>}
        centered
      >
        <form
          onSubmit={onSubmit((enrollment) => _createEnrollment(enrollment))}
        >
          <Stack gap="md">
            <TextInput
              disabled
              label="ID del curso"
              withAsterisk
              {...getInputProps("courseId")}
            />
            <Select
              data={students}
              label="Estudiante"
              nothingFoundMessage="Sin coincidencias"
              placeholder="Seleccione el estudiante a inscribir"
              searchable
              withAsterisk
              {...getInputProps("studentId")}
            />
            <Select
              data={["REGULAR", "EXTRAORDINARY"]}
              label="Tipo de inscripción"
              placeholder="Seleccione el tipo de inscripción del alumno"
              withAsterisk
              {...getInputProps("enrollmentType")}
            />
          </Stack>
          <Button mt="md" type="submit">
            Realizar inscripción
          </Button>
        </form>
      </Modal>
    ),
    isCreatingAEnrollment: isPending,
    showCreateEnrollmentModal: (courseId: string) => {
      setValues({
        courseId,
      });

      openCreateEnrollmentModal();
    },
  };
};
