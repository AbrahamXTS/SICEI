import { ActionIcon, Box, Button, Flex, Menu } from "@mantine/core";
import {
  IconDeviceIpadStar,
  IconPrinter,
  IconTrash,
} from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { Table } from "@/components";
import {
  useCreateEnrollment,
  useDeleteEnrollment,
  useGetEnrollmentsByCourseId,
} from "@/hooks/enrollment";
import { useCreateGrade, useUpdateGrade } from "@/hooks/grade";
import { CourseDTO, EnrollmentDTO } from "@/interfaces/http/responses";

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
  course: CourseDTO;
}

export const CourseEnrollmentsTable = ({
  course,
}: CourseEnrollmentsTableProps) => {
  const { id: courseId } = course;

  const { enrollments, isGettingEnrollments } =
    useGetEnrollmentsByCourseId(courseId);
  const {
    createEnrollmentModal,
    isCreatingAEnrollment,
    showCreateEnrollmentModal,
  } = useCreateEnrollment(course);
  const { deleteEnrollment, isDeletingAEnrollment } =
    useDeleteEnrollment(courseId);

  const { createGradeModal, isCreatingAGrade, showCreateGradeModal } =
    useCreateGrade(courseId);
  const { isUpdatingAGrade, showUpdateGradeModal, updateGradeModal } =
    useUpdateGrade(courseId);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <Flex gap="sm" justify="flex-end">
        <ActionIcon color="secondary" onClick={reactToPrintFn} size="input-sm">
          <IconPrinter />
        </ActionIcon>

        <Button onClick={() => showCreateEnrollmentModal(courseId)}>
          Inscribir alumno al curso
        </Button>
      </Flex>

      <Box pt="md" ref={contentRef}>
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
