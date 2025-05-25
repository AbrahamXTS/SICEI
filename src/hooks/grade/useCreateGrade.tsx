import {
  Button,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { useCreateGrade as useCreateGradeService } from "@/api/grade";
import { CreateGradeRequestDTO } from "@/interfaces/http/requests";

export const useCreateGrade = (courseId: string) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useCreateGradeService();
  const [
    isCreateGradeModalOpen,
    { close: closeCreateGradeModal, open: openCreateGradeModal },
  ] = useDisclosure();

  const { getInputProps, onSubmit, reset, setValues } =
    useForm<CreateGradeRequestDTO>({
      initialValues: {
        enrollmentId: "",
        score: 0,
      },
      mode: "uncontrolled",
      validate: {
        enrollmentId: isNotEmpty("La inscripción es un campo requerido."),
        score: (value) =>
          value < 0 || value > 100
            ? "La calificación asignada debe estar entre 0 y 100."
            : null,
      },
      validateInputOnChange: true,
    });

  const _createGrade = (grade: CreateGradeRequestDTO) => {
    mutate(grade, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratábamos de asignar la calificación solicitada. ${error.response?.data?.message}`,
          });
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["course", courseId, "enrollments"],
        });
      },
    });

    closeCreateGradeModal();
    reset();
  };

  return {
    createGradeModal: (
      <Modal
        opened={isCreateGradeModalOpen}
        onClose={closeCreateGradeModal}
        title={<Text fw="bold">Asignar calificación</Text>}
        centered
      >
        <form onSubmit={onSubmit((grade) => _createGrade(grade))}>
          <Stack gap="md">
            <TextInput
              disabled
              label="ID de la inscripción"
              withAsterisk
              {...getInputProps("enrollmentId")}
            />
            <NumberInput
              label="Calificación"
              min={0}
              max={100}
              withAsterisk
              {...getInputProps("score")}
            />
          </Stack>
          <Button mt="md" type="submit">
            Asignar calificación
          </Button>
        </form>
      </Modal>
    ),
    isCreatingAGrade: isPending,
    showCreateGradeModal: (enrollmentId: string) => {
      setValues({
        enrollmentId,
      });

      openCreateGradeModal();
    },
  };
};
