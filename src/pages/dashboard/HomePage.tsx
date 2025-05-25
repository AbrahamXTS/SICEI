import { Box, Divider, Flex, Text, Title } from "@mantine/core";

import { useGetRegularStudentsGroupedByEquivalentDegree } from "@/hooks/metrics/useGetRegularStudentsGroupedByEquivalentDegree";
import { StudentsGroupedByEquivalentDegreeCardChart } from "@/components/dashboard/StudentsGroupedByEquivalentDegreeChart";
import { useGetIrregularStudentsGroupedByEquivalentDegree } from "@/hooks/metrics/useGetIrregularStudentsGroupedByEquivalentDegree";
import { useAuth0 } from "@auth0/auth0-react";

export const HomePage = () => {
  const { user } = useAuth0();

  const {
    isGettingRegularStudentsGroupedByEquivalentDegree,
    regularStudentsCountByEquivalentDegree,
  } = useGetRegularStudentsGroupedByEquivalentDegree();

  const {
    irregularStudentsCountByEquivalentDegree,
    isGettingIrregularStudentsGroupedByEquivalentDegree,
  } = useGetIrregularStudentsGroupedByEquivalentDegree();

  return (
    <>
      <Box pb="lg" pt="xl">
        <Title order={3} mb="md">
          Panel administrativo
        </Title>
        <Text>¡Bienvenido de vuelta, {user?.name}!</Text>
      </Box>

      <Divider />

      <Flex direction={{ base: "column", md: "row" }} gap="md" mt="1rem">
        <StudentsGroupedByEquivalentDegreeCardChart
          chartTitle="Estudiantes regulares por semestre"
          data={regularStudentsCountByEquivalentDegree}
          isGettingData={isGettingRegularStudentsGroupedByEquivalentDegree}
        />

        <StudentsGroupedByEquivalentDegreeCardChart
          chartTitle="Estudiantes con asignaturas reprobadas por semestre"
          data={irregularStudentsCountByEquivalentDegree}
          isGettingData={isGettingIrregularStudentsGroupedByEquivalentDegree}
          showCoursesFailedCount
        />
      </Flex>
    </>
  );
};
