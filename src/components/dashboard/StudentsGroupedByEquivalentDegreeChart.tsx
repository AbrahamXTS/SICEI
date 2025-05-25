import { PieChart, PieChartCell } from "@mantine/charts";
import {
  ActionIcon,
  Card,
  Center,
  ColorSwatch,
  Flex,
  Group,
  Loader,
  Menu,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { IconDotsVertical, IconPrinter } from "@tabler/icons-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { EnrollmentDTO } from "@/interfaces/http/responses";

interface ChartData extends PieChartCell {
  dataset: EnrollmentDTO[][];
}

interface StudentsGroupedByEquivalentDegreeChartProps {
  chartTitle: string;
  data: ChartData[];
  isGettingData: boolean;
  showCoursesFailedCount?: boolean;
}

export const StudentsGroupedByEquivalentDegreeCardChart = ({
  chartTitle,
  data,
  isGettingData,
  showCoursesFailedCount = false,
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

            <Table variant="vertical">
              <Table.Tbody>
                <Table.Tr>
                  <Table.Th>Semestre</Table.Th>

                  <Table.Th>Nombre del estudiante</Table.Th>

                  {showCoursesFailedCount && (
                    <Table.Th>Materias reprobadas</Table.Th>
                  )}
                </Table.Tr>

                {data.map((degree) =>
                  degree.dataset.map((studentEnrollments, index) => {
                    const student = studentEnrollments.at(0)?.student;

                    return (
                      <Table.Tr key={`${degree.name}-${student?.id ?? index}`}>
                        {index === 0 && (
                          <Table.Th rowSpan={degree.dataset.length}>
                            <Group>
                              <ColorSwatch color={degree.color} size={10} />
                              <span>{degree.name}</span>
                            </Group>
                          </Table.Th>
                        )}

                        <Table.Td>
                          {student?.name} {student?.lastName}{" "}
                          {student?.secondLastName}
                        </Table.Td>

                        {showCoursesFailedCount && (
                          <Table.Td>
                            {
                              studentEnrollments.filter(
                                (studentEnrollment) =>
                                  (studentEnrollment.grade?.score ?? 0) < 70
                              ).length
                            }
                          </Table.Td>
                        )}
                      </Table.Tr>
                    );
                  })
                )}
              </Table.Tbody>
            </Table>
          </>
        )}
      </Stack>
    </Card>
  );
};
