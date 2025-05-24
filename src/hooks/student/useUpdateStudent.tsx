import { Button, Modal, NumberInput, Stack, Text, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

import { useUpdateStudent as useUpdateStudentService } from "@/api/student";
import { UpdateStudentRequestDTO } from "@/interfaces/http/requests";
import { StudentDTO } from "@/interfaces/http/responses";

export const useUpdateStudent = () => {
  const { isPending, mutate } = useUpdateStudentService();
  const [
    isUpdateStudentModalOpen,
    { close: closeUpdateStudentModal, open: openUpdateStudentModal },
  ] = useDisclosure();

  const { getInputProps, onSubmit, reset, setValues } =
    useForm<UpdateStudentRequestDTO>({
      initialValues: {
        id: "",
        email: "",
        equivalentDegree: 0,
        lastName: "",
        name: "",
        secondLastName: "",
      },
      mode: "uncontrolled",
      validate: {
        id: isNotEmpty("El id del estudiante es inválido."),
        email: isEmail("El correo electrónico del estudiante es inválido."),
        equivalentDegree: (value) =>
          value < 0 || value > 20
            ? "El semestre equivalente debe estar entre 0 y 20."
            : null,
        lastName: isNotEmpty(
          "El apellido del estudiante es un campo requerido."
        ),
        name: isNotEmpty("El nombre del estudiante es un campo requerido."),
      },
      validateInputOnChange: true,
    });

  const _updateStudent = (student: UpdateStudentRequestDTO) => {
    mutate(student, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratábamos de actualizar al estudiante solicitado. ${error.response?.data?.message}`,
          });
        }
      },
    });

    closeUpdateStudentModal();
    reset();
  };

  return {
    isUpdatingAStudent: isPending,
    showUpdateStudentModal: (student: StudentDTO) => {
      setValues({
        id: student.id,
        email: student.email,
        equivalentDegree: student.equivalentDegree,
        lastName: student.lastName,
        name: student.name,
        secondLastName: student.secondLastName,
      });

      openUpdateStudentModal();
    },
    updateStudentModal: (
      <Modal
        opened={isUpdateStudentModalOpen}
        onClose={closeUpdateStudentModal}
        title={<Text fw="bold">Editar estudiante</Text>}
        centered
      >
        <form onSubmit={onSubmit((product) => _updateStudent(product))}>
          <Stack gap="md">
            <TextInput
              disabled
              label="ID del estudiante"
              withAsterisk
              {...getInputProps("id")}
            />
            <TextInput
              label="Nombre del estudiante"
              placeholder="Luis Fernando"
              withAsterisk
              {...getInputProps("name")}
            />
            <TextInput
              label="Primer apellido del estudiante"
              placeholder="Curi"
              withAsterisk
              {...getInputProps("lastName")}
            />
            <TextInput
              label="Segundo apellido del estudiante"
              placeholder="Quintal"
              {...getInputProps("secondLastName")}
            />
            <TextInput
              label="Email del estudiante"
              placeholder="cquintal@uady.mx"
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
            Editar estudiante
          </Button>
        </form>
      </Modal>
    ),
  };
};
