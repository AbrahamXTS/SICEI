import { Button, Modal, Stack, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

import { useUpdateSubject as useUpdateSubjectService } from "@/api/subject";
import { UpdateSubjectRequestDTO } from "@/interfaces/http/requests";
import { SubjectDTO } from "@/interfaces/http/responses";

export const useUpdateSubject = () => {
  const { isPending, mutate } = useUpdateSubjectService();
  const [
    isUpdateSubjectModalOpen,
    { close: closeUpdateSubjectModal, open: openUpdateSubjectModal },
  ] = useDisclosure();

  const { getInputProps, onSubmit, reset, setValues } =
    useForm<UpdateSubjectRequestDTO>({
      initialValues: {
        id: "",
        name: "",
      },
      mode: "uncontrolled",
      validate: {
        id: isNotEmpty("El id de la asignatura es inválido."),
        name: isNotEmpty("El nombre de la asignatura es un campo requerido."),
      },
      validateInputOnChange: true,
    });

  const _updateSubject = (subject: UpdateSubjectRequestDTO) => {
    mutate(subject, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratábamos de actualizar la asignatura solicitada. ${error.response?.data?.message}`,
          });
        }
      },
    });

    closeUpdateSubjectModal();
    reset();
  };

  return {
    isUpdatingASubject: isPending,
    showUpdateSubjectModal: (subject: SubjectDTO) => {
      setValues({
        id: subject.id,
        name: subject.name,
      });

      openUpdateSubjectModal();
    },
    updateSubjectModal: (
      <Modal
        opened={isUpdateSubjectModalOpen}
        onClose={closeUpdateSubjectModal}
        title={<Text fw="bold">Editar asignatura</Text>}
        centered
      >
        <form onSubmit={onSubmit((product) => _updateSubject(product))}>
          <Stack gap="md">
            <TextInput
              disabled
              label="ID de la asignatura"
              withAsterisk
              {...getInputProps("id")}
            />
            <TextInput
              label="Nombre de la asignatura"
              placeholder="Sistemas distribuidos"
              withAsterisk
              {...getInputProps("name")}
            />
          </Stack>
          <Button mt="md" type="submit">
            Editar asignatura
          </Button>
        </form>
      </Modal>
    ),
  };
};
