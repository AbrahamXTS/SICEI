import { PieChart, PieChartCell } from "@mantine/charts";
import {
  ActionIcon,
  Card,
  Center,
  Flex,
  Loader,
  Menu,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { IconDotsVertical, IconPrinter } from "@tabler/icons-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <Card radius="md" shadow="lg" w="100%">
      <Stack ref={contentRef}>
        <Flex justify="space-between">
          <Title order={4}>{chartTitle}</Title>

          <Menu>
            <Menu.Target>
              <ActionIcon color="gray" size="sm" variant="subtle">
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconPrinter size="1rem" />}
                onClick={reactToPrintFn}
              >
                Imprimir gráfico
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>

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
