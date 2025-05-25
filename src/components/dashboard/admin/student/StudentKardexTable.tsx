import { Box } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";

import { Table } from "@/components";
import { EnrollmentDTO } from "@/interfaces/http/responses";
import { useGetEnrollmentsByStudentId } from "@/hooks/enrollment";

const STUDENT_KARDEX_TABLE_COLUMNS: MRT_ColumnDef<EnrollmentDTO>[] = [
  {
    id: "asignatura",
    header: "Asignatura",
    accessorFn: ({ course }) => course?.subject?.name,
    filterVariant: "autocomplete",
  },
  {
    id: "profesor",
    header: "Profesor",
    accessorFn: ({ course }) =>
      `${course?.teacher?.name} ${course?.teacher?.lastName} ${course?.teacher?.secondLastName}`,
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
      grade ? grade?.score : "Sin calificación asignada",
    filterFn: "inNumberRange",
  },
];

interface StudentKardexTableProps {
  studentId: string;
}

export const StudentKardexTable = ({ studentId }: StudentKardexTableProps) => {
  const { enrollments, isGettingEnrollments } =
    useGetEnrollmentsByStudentId(studentId);

  return (
    <>
      <Box pt="md">
        <Table
          columns={STUDENT_KARDEX_TABLE_COLUMNS}
          data={enrollments}
          mantineSearchTextInputProps={{
            placeholder: "Buscar una asignatura",
            mx: "0rem",
          }}
          state={{
            isLoading: isGettingEnrollments,
          }}
        />
      </Box>
    </>
  );
};
