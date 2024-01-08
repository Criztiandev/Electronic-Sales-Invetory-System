/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnOption } from "@/interface/component";
import Badge from "@/components/Badge";
import { QueryKey } from "@tanstack/react-query";

interface Props<T> {
  invalidateKey: QueryKey;
  options: ColumnOption<T>[];
}

export default {
  columnGenerator: <T,>({
    options,
    ...props
  }: Props<T>): ColumnDef<T, any>[] => {
    const columnHelper = createColumnHelper<T>();

    return options.map((items) => {
      if (items?.isLast) {
        return {
          id: items.name as string,
          header: items.header,
          cell: (info) => (
            <Table.Action<T>
              id={info.cell.id}
              payload={info}
              invalidateKey={props.invalidateKey}
            />
          ),
        };
      }

      if (items.isFirst) {
        return columnHelper.accessor((row) => row[items.name], {
          id: items.name as string,
          header: () => items.header,
          cell: (info) => (
            <div className="grid grid-cols-[32px_auto] gap-2 items-center place-items-start ">
              <Table.CheckBox
                {...{
                  checked: info.row.getIsSelected(),
                  disabled: !info.row.getCanSelect(),
                  indeterminate: info.row.getIsSomeSelected(),
                  onChange: info.row.getToggleSelectedHandler(),
                }}
              />
              <Table.FirstCell<T> data={info} />
            </div>
          ),
        });
      }

      if (items.isBadge) {
        return columnHelper.accessor((row: any) => row[items.name], {
          id: items.name as string,
          header: () => items.header,
          cell: (info) => (
            <Badge className="p-4 capitalize">{info.getValue()}</Badge>
          ),
        });
      }

      return columnHelper.accessor((row) => row[items.name], {
        id: items.name as string,
        header: () => items.header,
      });
    });
  },
};
