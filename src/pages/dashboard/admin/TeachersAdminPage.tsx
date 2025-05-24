import { Box, Button, Flex, Menu } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";

import { Table } from "@/components";
import {
  useCreateTeacher,
  useDeleteTeacher,
  useGetTeachers,
  useUpdateTeacher,
} from "@/hooks/teacher";
import { TeacherDTO } from "@/interfaces/http/responses";

const TEACHERS_CATALOG_TABLE_COLUMNS: MRT_ColumnDef<TeacherDTO>[] = [
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
];

export const TeachersAdminPage = () => {
  const { isGettingTeachers, teachers } = useGetTeachers();
  const { isCreatingATeacher, showCreateTeacherModal, createTeacherModal } =
    useCreateTeacher();
  const { isUpdatingATeacher, showUpdateTeacherModal, updateTeacherModal } =
    useUpdateTeacher();
  const { isDeletingATeacher, deleteTeacher } = useDeleteTeacher();

  return (
    <>
      <Flex justify="flex-end" pt="xl">
        <Button onClick={showCreateTeacherModal}>Añadir profesor</Button>
      </Flex>

      <Box pb="xl" pt="md">
        <Table
          columns={TEACHERS_CATALOG_TABLE_COLUMNS}
          data={teachers}
          enableRowActions
          mantineSearchTextInputProps={{
            placeholder: "Buscar un profesor",
            mx: "0rem",
          }}
          renderRowActionMenuItems={({ row: { original: teacher } }) => (
            <>
              <Menu.Item
                leftSection={<IconEdit size="1rem" />}
                onClick={() => showUpdateTeacherModal(teacher)}
              >
                Editar profesor
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size="1rem" />}
                onClick={() => deleteTeacher(teacher)}
              >
                Eliminar profesor
              </Menu.Item>
            </>
          )}
          state={{
            isLoading: isGettingTeachers,
            isSaving:
              isCreatingATeacher || isUpdatingATeacher || isDeletingATeacher,
          }}
        />
        {createTeacherModal}
        {updateTeacherModal}
      </Box>
    </>
  );
};
