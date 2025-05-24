import { Box, Button, Flex, Menu } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";

import { Table } from "@/components";
import {
  useCreateCourse,
  useDeleteCourse,
  useGetCourses,
  useUpdateCourse,
} from "@/hooks/course";
import { CourseDTO } from "@/interfaces/http/responses";

const COURSES_CATALOG_TABLE_COLUMNS: MRT_ColumnDef<CourseDTO>[] = [
  {
    id: "asignatura",
    header: "Asignatura",
    accessorFn: ({ subject }) => subject?.name,
    filterVariant: "autocomplete",
  },
  {
    id: "profesor",
    header: "Profesor",
    accessorFn: ({ teacher }) =>
      `${teacher?.name} ${teacher?.lastName} ${teacher?.secondLastName}`,
    filterVariant: "autocomplete",
  },
];

export const CoursesAdminPage = () => {
  const { isGettingCourses, courses } = useGetCourses();
  const { isCreatingACourse, showCreateCourseModal, createCourseModal } =
    useCreateCourse();
  const { isUpdatingACourse, showUpdateCourseModal, updateCourseModal } =
    useUpdateCourse();
  const { isDeletingACourse, deleteCourse } = useDeleteCourse();

  return (
    <>
      <Flex justify="flex-end" pt="xl">
        <Button onClick={showCreateCourseModal}>Añadir curso</Button>
      </Flex>

      <Box pb="xl" pt="md">
        <Table
          columns={COURSES_CATALOG_TABLE_COLUMNS}
          data={courses}
          enableRowActions
          mantineSearchTextInputProps={{
            placeholder: "Buscar un curso",
            mx: "0rem",
          }}
          renderRowActionMenuItems={({ row: { original: course } }) => (
            <>
              <Menu.Item
                leftSection={<IconEdit size="1rem" />}
                onClick={() => showUpdateCourseModal(course)}
              >
                Editar curso
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size="1rem" />}
                onClick={() => deleteCourse(course)}
              >
                Eliminar curso
              </Menu.Item>
            </>
          )}
          state={{
            isLoading: isGettingCourses,
            isSaving:
              isCreatingACourse || isUpdatingACourse || isDeletingACourse,
          }}
        />
        {createCourseModal}
        {updateCourseModal}
      </Box>
    </>
  );
};
