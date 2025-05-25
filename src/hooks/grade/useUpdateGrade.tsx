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

import { useUpdateGrade as useUpdateGradeService } from "@/api/grade";
import { UpdateGradeRequestDTO } from "@/interfaces/http/requests";
import { GradeDTO } from "@/interfaces/http/responses";

export const useUpdateGrade = (courseId: string) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useUpdateGradeService();
  const [
    isUpdateGradeModalOpen,
    { close: closeUpdateGradeModal, open: openUpdateGradeModal },
  ] = useDisclosure();

  const { getInputProps, onSubmit, reset, setValues } =
    useForm<UpdateGradeRequestDTO>({
      initialValues: {
        id: "",
        score: 0,
      },
      mode: "uncontrolled",
      validate: {
        id: isNotEmpty("El id de la calificación es inválido."),
        score: (value) =>
          value < 0 || value > 100
            ? "La calificación asignada debe estar entre 0 y 100."
            : null,
      },
      validateInputOnChange: true,
    });

  const _updateGrade = (grade: UpdateGradeRequestDTO) => {
    mutate(grade, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratábamos de actualizar la calificación solicitada. ${error.response?.data?.message}`,
          });
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["course", courseId, "enrollments"],
        });
      },
    });

    closeUpdateGradeModal();
    reset();
  };

  return {
    isUpdatingAGrade: isPending,
    showUpdateGradeModal: (grade: GradeDTO) => {
      setValues({
        id: grade.id,
        score: grade.score,
      });

      openUpdateGradeModal();
    },
    updateGradeModal: (
      <Modal
        opened={isUpdateGradeModalOpen}
        onClose={closeUpdateGradeModal}
        title={<Text fw="bold">Editar calificación</Text>}
        centered
      >
        <form onSubmit={onSubmit((product) => _updateGrade(product))}>
          <Stack gap="md">
            <TextInput
              disabled
              label="ID de la calificación"
              withAsterisk
              {...getInputProps("id")}
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
            Editar calificación
          </Button>
        </form>
      </Modal>
    ),
  };
};
