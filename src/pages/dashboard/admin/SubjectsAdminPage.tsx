import { Box, Button, Flex, Menu } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";

import { Table } from "@/components";
import {
  useCreateSubject,
  useDeleteSubject,
  useGetSubjects,
  useUpdateSubject,
} from "@/hooks/subject";
import { SubjectDTO } from "@/interfaces/http/responses";

const SUBJECTS_CATALOG_TABLE_COLUMNS: MRT_ColumnDef<SubjectDTO>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
    filterVariant: "autocomplete",
  },
];

export const SubjectsAdminPage = () => {
  const { isGettingSubjects, subjects } = useGetSubjects();
  const { isCreatingASubject, showCreateSubjectModal, createSubjectModal } =
    useCreateSubject();
  const { isUpdatingASubject, showUpdateSubjectModal, updateSubjectModal } =
    useUpdateSubject();
  const { isDeletingASubject, deleteSubject } = useDeleteSubject();

  return (
    <>
      <Flex justify="flex-end" pt="xl">
        <Button onClick={showCreateSubjectModal}>Añadir asignatura</Button>
      </Flex>

      <Box pb="xl" pt="md">
        <Table
          columns={SUBJECTS_CATALOG_TABLE_COLUMNS}
          data={subjects}
          enableRowActions
          mantineSearchTextInputProps={{
            placeholder: "Buscar una asignatura",
            mx: "0rem",
          }}
          renderRowActionMenuItems={({ row: { original: subject } }) => (
            <>
              <Menu.Item
                leftSection={<IconEdit size="1rem" />}
                onClick={() => showUpdateSubjectModal(subject)}
              >
                Editar asignatura
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size="1rem" />}
                onClick={() => deleteSubject(subject)}
              >
                Eliminar asignatura
              </Menu.Item>
            </>
          )}
          state={{
            isLoading: isGettingSubjects,
            isSaving:
              isCreatingASubject || isUpdatingASubject || isDeletingASubject,
          }}
        />
        {createSubjectModal}
        {updateSubjectModal}
      </Box>
    </>
  );
};
