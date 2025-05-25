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
import { isAxiosError } from "axios";

import { useCreateSubject as useCreateSubjectService } from "@/api/subject";
import { CreateSubjectRequestDTO } from "@/interfaces/http/requests";

export const useCreateSubject = () => {
  const { isPending, mutate } = useCreateSubjectService();
  const [
    isCreateSubjectModalOpen,
    { close: closeCreateSubjectModal, open: openCreateSubjectModal },
  ] = useDisclosure();

  const { getInputProps, onSubmit, reset } = useForm<CreateSubjectRequestDTO>({
    initialValues: {
      name: "",
      offeredInDegree: 0,
    },
    mode: "uncontrolled",
    validate: {
      name: isNotEmpty("El nombre de la asignatura es un campo requerido."),
      offeredInDegree: (value) =>
        value < 1 || value > 20
          ? "El grado en que se oferta la asignatura debe estar entre 1 y 20."
          : null,
    },
    validateInputOnChange: true,
  });

  const _createSubject = (subject: CreateSubjectRequestDTO) => {
    mutate(subject, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratábamos de crear la asignatura solicitada. ${error.response?.data?.message}`,
          });
        }
      },
    });

    closeCreateSubjectModal();
    reset();
  };

  return {
    createSubjectModal: (
      <Modal
        opened={isCreateSubjectModalOpen}
        onClose={closeCreateSubjectModal}
        title={<Text fw="bold">Nueva asignatura</Text>}
        centered
      >
        <form onSubmit={onSubmit((subject) => _createSubject(subject))}>
          <Stack gap="md">
            <TextInput
              label="Nombre de la asignatura"
              placeholder="Sistemas distribuidos"
              withAsterisk
              {...getInputProps("name")}
            />
            <NumberInput
              label="Grado en que se imparte"
              min={1}
              max={20}
              placeholder="1"
              withAsterisk
              {...getInputProps("offeredInDegree")}
            />
          </Stack>
          <Button mt="md" type="submit">
            Crear asignatura
          </Button>
        </form>
      </Modal>
    ),
    isCreatingASubject: isPending,
    showCreateSubjectModal: openCreateSubjectModal,
  };
};
