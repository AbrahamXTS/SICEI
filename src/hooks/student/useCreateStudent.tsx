import {
  Button,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

import { useCreateStudent as useCreateStudentService } from "@/api/student";
import { CreateStudentRequestDTO } from "@/interfaces/http/requests";

export const useCreateStudent = () => {
  const { isPending, mutate } = useCreateStudentService();
  const [
    isCreateStudentModalOpen,
    { close: closeCreateStudentModal, open: openCreateStudentModal },
  ] = useDisclosure();

  const { getInputProps, onSubmit, reset } = useForm<CreateStudentRequestDTO>({
    initialValues: {
      email: "",
      equivalentDegree: 0,
      lastName: "",
      name: "",
      secondLastName: "",
    },
    mode: "uncontrolled",
    validate: {
      email: isEmail("El correo electrónico del estudiante es inválido."),
      lastName: isNotEmpty("El apellido del estudiante es un campo requerido."),
      name: isNotEmpty("El nombre del estudiante es un campo requerido."),
      equivalentDegree: (value) =>
        value < 0 || value > 20
          ? "El semestre equivalente debe estar entre 0 y 20."
          : null,
    },
    validateInputOnChange: true,
  });

  const _createStudent = (student: CreateStudentRequestDTO) => {
    mutate(student, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratábamos de crear al estudiante solicitado. ${error.response?.data?.message}`,
          });
        }
      },
    });

    closeCreateStudentModal();
    reset();
  };

  return {
    createStudentModal: (
      <Modal
        opened={isCreateStudentModalOpen}
        onClose={closeCreateStudentModal}
        title={<Text fw="bold">Nuevo estudiante</Text>}
        centered
      >
        <form onSubmit={onSubmit((student) => _createStudent(student))}>
          <Stack gap="md">
            <TextInput
              label="Nombre del estudiante"
              placeholder="Abraham"
              withAsterisk
              {...getInputProps("name")}
            />
            <TextInput
              label="Primer apellido del estudiante"
              placeholder="Espinosa"
              withAsterisk
              {...getInputProps("lastName")}
            />
            <TextInput
              label="Segundo apellido del estudiante"
              placeholder="Mendoza"
              {...getInputProps("secondLastName")}
            />
            <TextInput
              label="Email del estudiante"
              placeholder="aespinosam@uady.mx"
              {...getInputProps("email")}
            />
            <NumberInput
              label="Semestre equivalente"
              min={0}
              max={20}
              placeholder="1"
              {...getInputProps("equivalentDegree")}
            />
          </Stack>
          <Button mt="md" type="submit">
            Crear estudiante
          </Button>
        </form>
      </Modal>
    ),
    isCreatingAStudent: isPending,
    showCreateStudentModal: openCreateStudentModal,
  };
};
