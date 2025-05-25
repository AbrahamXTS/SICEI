import { Box, Button, Flex, Menu } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";

import { Table } from "@/components";
import { StudentKardexTable } from "@/components/dashboard/admin/student/StudentKardexTable";
import {
  useCreateStudent,
  useDeleteStudent,
  useGetStudents,
  useUpdateStudent,
} from "@/hooks/student";
import { StudentDTO } from "@/interfaces/http/responses";

const STUDENTS_CATALOG_TABLE_COLUMNS: MRT_ColumnDef<StudentDTO>[] = [
  {
    header: "Matrícula",
    accessorKey: "id",
    enableColumnFilter: false,
  },
  {
    header: "Nombre",
    accessorKey: "name",
    filterVariant: "autocomplete",
  },
  {
    header: "Primer apellido",
    accessorKey: "lastName",
    filterVariant: "autocomplete",
  },
  {
    header: "Segundo apellido",
    accessorKey: "secondLastName",
    filterVariant: "autocomplete",
  },
  {
    header: "Email",
    accessorKey: "email",
    filterVariant: "autocomplete",
  },
  {
    id: "equivalentDegree",
    header: "Semestre equivalente",
    accessorKey: "equivalentDegree",
    filterFn: "inNumberRange",
  },
];

export const StudentsAdminPage = () => {
  const { isGettingStudents, students } = useGetStudents();
  const { isCreatingAStudent, showCreateStudentModal, createStudentModal } =
    useCreateStudent();
  const { isUpdatingAStudent, showUpdateStudentModal, updateStudentModal } =
    useUpdateStudent();
  const { isDeletingAStudent, deleteStudent } = useDeleteStudent();

  return (
    <>
      <Flex justify="flex-end" pt="xl">
        <Button onClick={showCreateStudentModal}>Añadir estudiante</Button>
      </Flex>

      <Box pb="xl" pt="md">
        <Table
          columns={STUDENTS_CATALOG_TABLE_COLUMNS}
          data={students}
          enableRowActions
          mantineSearchTextInputProps={{
            placeholder: "Buscar un estudiante",
            mx: "0rem",
          }}
          positionExpandColumn="last"
          renderDetailPanel={({ row: { original: student } }) => (
            <StudentKardexTable studentId={student.id} />
          )}
          renderRowActionMenuItems={({ row: { original: student } }) => (
            <>
              <Menu.Item
                leftSection={<IconEdit size="1rem" />}
                onClick={() => showUpdateStudentModal(student)}
              >
                Editar estudiante
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size="1rem" />}
                onClick={() => deleteStudent(student)}
              >
                Eliminar estudiante
              </Menu.Item>
            </>
          )}
          state={{
            isLoading: isGettingStudents,
            isSaving:
              isCreatingAStudent || isUpdatingAStudent || isDeletingAStudent,
          }}
        />
        {createStudentModal}
        {updateStudentModal}
      </Box>
    </>
  );
};
