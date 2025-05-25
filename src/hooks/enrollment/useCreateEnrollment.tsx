import { Button, Modal, Select, Stack, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useMemo } from "react";

import { useCreateEnrollment as useCreateEnrollmentService } from "@/api/enrollment";
import { CreateEnrollmentRequestDTO } from "@/interfaces/http/requests";
import { CourseDTO } from "@/interfaces/http/responses";
import { transformToSelectDataType } from "@/utils";

import { useGetStudents } from "../student";

export const useCreateEnrollment = (course: CourseDTO) => {
  const queryClient = useQueryClient();

  const { students } = useGetStudents();

  const studentsInSameDegree = useMemo(() => {
    const studentsInSameDegree = students.filter(
      (student) => student.equivalentDegree === course.subject.offeredInDegree
    );

    return transformToSelectDataType(studentsInSameDegree, (student) => ({
      label: `${student.name} ${student.lastName} ${student.secondLastName}`,
      value: student.id,
    }));
  }, [course, students]);

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
          queryKey: ["course", course.id, "enrollments"],
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
              data={studentsInSameDegree}
              label="Estudiante"
              nothingFoundMessage="No se encontraron estudiantes cursando el mismo grado en el que se imparte el grupo"
              placeholder="Seleccione el estudiante a inscribir"
              searchable
              withAsterisk
              {...getInputProps("studentId")}
            />
            <Select
              data={[
                {
                  label: "Regular",
                  value: "REGULAR",
                },
                {
                  label: "Recursamiento",
                  value: "EXTRAORDINARY",
                },
              ]}
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
