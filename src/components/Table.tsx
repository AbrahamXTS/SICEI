import {
  MantineReactTable,
  MRT_RowData,
  MRT_TableOptions,
} from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";

export function Table<T extends MRT_RowData>({
  columns,
  data,
  ...props
}: MRT_TableOptions<T>) {
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableDensityToggle={false}
      enableFacetedValues
      enableFilterMatchHighlighting={false}
      initialState={{
        density: "xs",
        showColumnFilters: false,
        showGlobalFilter: true,
      }}
      localization={MRT_Localization_ES}
      mantinePaginationProps={{
        withEdges: false,
      }}
      positionActionsColumn="last"
      positionGlobalFilter="left"
      {...props}
    />
  );
}
