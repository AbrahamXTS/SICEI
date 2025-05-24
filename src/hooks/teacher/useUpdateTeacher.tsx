import { Button, Modal, Stack, Text, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";

import { useUpdateTeacher as useUpdateTeacherService } from "@/api/teacher";
import { UpdateTeacherRequestDTO } from "@/interfaces/http/requests";
import { TeacherDTO } from "@/interfaces/http/responses";

export const useUpdateTeacher = () => {
  const { isPending, mutate } = useUpdateTeacherService();
  const [
    isUpdateTeacherModalOpen,
    { close: closeUpdateTeacherModal, open: openUpdateTeacherModal },
  ] = useDisclosure();

  const { getInputProps, onSubmit, reset, setValues } =
    useForm<UpdateTeacherRequestDTO>({
      initialValues: {
        employeeId: "",
        email: "",
        lastName: "",
        name: "",
        secondLastName: "",
      },
      mode: "uncontrolled",
      validate: {
        employeeId: isNotEmpty("El id del profesor es inválido."),
        email: isEmail("El correo electrónico del profesor es inválido."),
        lastName: isNotEmpty("El apellido del profesor es un campo requerido."),
        name: isNotEmpty("El nombre del profesor es un campo requerido."),
      },
      validateInputOnChange: true,
    });

  const _updateTeacher = (teacher: UpdateTeacherRequestDTO) => {
    mutate(teacher, {
      onError: (error) => {
        if (isAxiosError(error)) {
          notifications.show({
            title: "¡Oh no!",
            message: `Algo salió mal mientras tratábamos de actualizar al profesor solicitado. ${error.response?.data?.message}`,
          });
        }
      },
    });

    closeUpdateTeacherModal();
    reset();
  };

  return {
    isUpdatingATeacher: isPending,
    showUpdateTeacherModal: (teacher: TeacherDTO) => {
      setValues({
        employeeId: teacher.employeeId,
        email: teacher.email,
        lastName: teacher.lastName,
        name: teacher.name,
        secondLastName: teacher.secondLastName,
      });

      openUpdateTeacherModal();
    },
    updateTeacherModal: (
      <Modal
        opened={isUpdateTeacherModalOpen}
        onClose={closeUpdateTeacherModal}
        title={<Text fw="bold">Editar profesor</Text>}
        centered
      >
        <form onSubmit={onSubmit((product) => _updateTeacher(product))}>
          <Stack gap="md">
            <TextInput
              disabled
              label="ID del profesor"
              withAsterisk
              {...getInputProps("employeeId")}
            />
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
              {...getInputProps("email")}
            />
          </Stack>
          <Button mt="md" type="submit">
            Editar profesor
          </Button>
        </form>
      </Modal>
    ),
  };
};
