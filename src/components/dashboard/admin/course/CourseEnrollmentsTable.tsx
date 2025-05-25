import { Box, Button, Flex, Menu } from "@mantine/core";
import { IconDeviceIpadStar, IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";

import { Table } from "@/components";
import { useGetEnrollmentsByCourseId } from "@/hooks/enrollment";
import { useCreateEnrollment, useDeleteEnrollment } from "@/hooks/enrollment";
import { EnrollmentDTO } from "@/interfaces/http/responses";
import { useCreateGrade, useUpdateGrade } from "@/hooks/grade";

const COURSE_ENROLLMENTS_TABLE_COLUMNS: MRT_ColumnDef<EnrollmentDTO>[] = [
  {
    id: "alumno",
    header: "Nombre del estudiante",
    accessorFn: ({ student }) =>
      `${student?.name} ${student?.lastName} ${student?.secondLastName}`,
    filterVariant: "autocomplete",
  },
  {
    header: "Tipo de inscripción",
    accessorKey: "enrollmentType",
    filterVariant: "select",
  },
  {
    id: "calificacion",
    header: "Calificación",
    accessorFn: ({ grade }) =>
      grade ? grade.score : "Sin calificación asignada",
    filterFn: "inNumberRange",
  },
];

interface CourseEnrollmentsTableProps {
  courseId: string;
}

export const CourseEnrollmentsTable = ({
  courseId,
}: CourseEnrollmentsTableProps) => {
  const { enrollments, isGettingEnrollments } =
    useGetEnrollmentsByCourseId(courseId);
  const {
    createEnrollmentModal,
    isCreatingAEnrollment,
    showCreateEnrollmentModal,
  } = useCreateEnrollment(courseId);
  const { deleteEnrollment, isDeletingAEnrollment } =
    useDeleteEnrollment(courseId);

  const { createGradeModal, isCreatingAGrade, showCreateGradeModal } =
    useCreateGrade(courseId);
  const { isUpdatingAGrade, showUpdateGradeModal, updateGradeModal } =
    useUpdateGrade(courseId);

  return (
    <>
      <Flex justify="flex-end">
        <Button onClick={() => showCreateEnrollmentModal(courseId)}>
          Inscribir alumno al curso
        </Button>
      </Flex>

      <Box pt="md">
        <Table
          columns={COURSE_ENROLLMENTS_TABLE_COLUMNS}
          data={enrollments}
          enableRowActions
          mantineSearchTextInputProps={{
            placeholder: "Buscar una inscripción",
            mx: "0rem",
          }}
          renderRowActionMenuItems={({ row: { original: enrollment } }) => (
            <>
              <Menu.Item
                leftSection={<IconDeviceIpadStar size="1rem" />}
                onClick={() => {
                  if (enrollment.grade) {
                    showUpdateGradeModal(enrollment.grade);
                  } else {
                    showCreateGradeModal(enrollment.id);
                  }
                }}
              >
                {enrollment.grade
                  ? "Editar calificación"
                  : "Asignar calificación"}
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size="1rem" />}
                onClick={() => deleteEnrollment(enrollment)}
              >
                Eliminar inscripción
              </Menu.Item>
            </>
          )}
          state={{
            isLoading: isGettingEnrollments,
            isSaving:
              isCreatingAEnrollment ||
              isDeletingAEnrollment ||
              isCreatingAGrade ||
              isUpdatingAGrade,
          }}
        />
        {createEnrollmentModal}
        {createGradeModal}
        {updateGradeModal}
      </Box>
    </>
  );
};
