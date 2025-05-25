import { Button, Modal, Stack, Text, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

import { useCreateTeacher as useCreateTeacherService } from "@/api/teacher";
import { CreateTeacherRequestDTO } from "@/interfaces/http/requests";

export const useCreateTeacher = () => {
  const { isPending, mutate } = useCreateTeacherService();
  const [
    isCreateTeacherModalOpen,
    { close: closeCreateTeacherModal, open: openCreateTeacherModal },
  ] = useDisclosure();

  const { getInputProps, onSubmit, reset } = useForm<CreateTeacherRequestDTO>({
    initialValues: {
      email: "",
      lastName: "",
      name: "",
      secondLastName: "",
    },
    mode: "uncontrolled",
    validate: {
      email: isEmail("El correo electrónico del profesor es inválido."),
      lastName: isNotEmpty("El apellido del profesor es un campo requerido."),
      name: isNotEmpty("El nombre del profesor es un campo requerido."),
    },
    validateInputOnChange: true,
  });

  const _createTeacher = (teacher: CreateTeacherRequestDTO) => {
    mutate(teacher, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratábamos de crear al profesor solicitado. ${error.response?.data?.message}`,
          });
        }
      },
    });

    closeCreateTeacherModal();
    reset();
  };

  return {
    createTeacherModal: (
      <Modal
        opened={isCreateTeacherModalOpen}
        onClose={closeCreateTeacherModal}
        title={<Text fw="bold">Nuevo profesor</Text>}
        centered
      >
        <form onSubmit={onSubmit((teacher) => _createTeacher(teacher))}>
          <Stack gap="md">
            <TextInput
              label="Nombre del profesor"
              placeholder="Luis Fernando"
              withAsterisk
              {...getInputProps("name")}
            />
            <TextInput
              label="Primer apellido del profesor"
              placeholder="Curi"
              withAsterisk
              {...getInputProps("lastName")}
            />
            <TextInput
              label="Segundo apellido del profesor"
              placeholder="Quintal"
              {...getInputProps("secondLastName")}
            />
            <TextInput
              label="Email del profesor"
              placeholder="cquintal@uady.mx"
              withAsterisk
              {...getInputProps("email")}
            />
          </Stack>
          <Button mt="md" type="submit">
            Crear profesor
          </Button>
        </form>
      </Modal>
    ),
    isCreatingATeacher: isPending,
    showCreateTeacherModal: openCreateTeacherModal,
  };
};
