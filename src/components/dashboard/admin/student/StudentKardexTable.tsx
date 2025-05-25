import { ActionIcon, Badge, Box, Flex, Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { IconPrinter } from "@tabler/icons-react";
import { useMemo, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { Table } from "@/components";
import { useGetEnrollmentsByStudentId } from "@/hooks/enrollment";
import { EnrollmentDTO } from "@/interfaces/http/responses";

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

  const gradePointAverage = useMemo(() => {
    if (enrollments.length === 0) return "0.00";

    let scoreSum = 0;

    enrollments.forEach(
      (enrollment) => (scoreSum += enrollment.grade?.score ?? 0)
    );

    return (scoreSum / enrollments.length).toFixed(2);
  }, [enrollments]);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <Box ref={contentRef}>
      <Flex align="center" justify="space-between">
        <Group>
          <Badge color="gray">Promedio general: {gradePointAverage}</Badge>
        </Group>

        <ActionIcon color="secondary" onClick={reactToPrintFn} size="input-sm">
          <IconPrinter />
        </ActionIcon>
      </Flex>

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
    </Box>
  );
};
