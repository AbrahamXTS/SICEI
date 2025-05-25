import { PieChart, PieChartCell } from "@mantine/charts";
import { Card, Center, Loader, Stack, Table, Title } from "@mantine/core";

interface StudentsGroupedByEquivalentDegreeChartProps {
  chartTitle: string;
  data: PieChartCell[];
  isGettingData: boolean;
}

export const StudentsGroupedByEquivalentDegreeCardChart = ({
  data,
  isGettingData,
  chartTitle,
}: StudentsGroupedByEquivalentDegreeChartProps) => {
  return (
    <Card radius="md" shadow="lg" w="100%">
      <Stack>
        <Title order={4}>{chartTitle}</Title>
        {isGettingData ? (
          <Center>
            <Loader type="dots" />
          </Center>
        ) : (
          <>
            <Center>
              <PieChart
                data={data}
                labelsPosition="outside"
                labelsType="percent"
                withLabels
                withLabelsLine
                withTooltip
              />
            </Center>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Grado</Table.Th>
                  <Table.Th>No. de alumnos</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.map((degree) => (
                  <Table.Tr key={degree.name}>
                    <Table.Td>{degree.name}</Table.Td>
                    <Table.Td>{degree.value}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </>
        )}
      </Stack>
    </Card>
  );
};
