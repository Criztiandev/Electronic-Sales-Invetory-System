/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/Container";
import { TableProps } from "@/interface/component";
import { RootReducer } from "@/service/store";
import { setRowSelect } from "@/service/store/slice/table.slice";
import {
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  PaginationState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SortingIndicator from "./SortingIndicator";
import TablePagination from "./TablePagination";
import GridStack from "@/components/GridStack";
import CheckBox from "@/components/Checkbox";
import tableConfig from "@/config/table.config";

const Content = <T,>({ columns, ...props }: TableProps<T>) => {
  const [payload, setPayload] = useState<Array<T>>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnsFilter] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>(
    tableConfig.general.pagination
  );

  const dispatch = useDispatch();
  const selection = useSelector((state: RootReducer) => state.table[props.id]);

  const memoizedData: Array<T> = useMemo(() => payload, [payload]);
  const _columns: ColumnDef<T, any>[] = useMemo(() => columns, [columns]);

  const repeat: number = _columns.length;

  useEffect(() => {
    if (rowSelection) {
      const rowID = Object.keys(rowSelection).map((id) => {
        const row = table.getRow(id) as any;
        return row ? row.original?._id : null;
      });

      dispatch(setRowSelect({ id: props.id, data: rowID }));
    }
  }, [rowSelection]);

  const table = useReactTable<T>({
    data: memoizedData,
    columns: _columns,
    pageCount: selection?.pagination?.size,

    state: {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },

    enableRowSelection: true,
    manualPagination: true,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnsFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    if (selection?.payload) {
      setPayload(selection?.payload);
    }

    if (selection?.globalFilter) {
      setGlobalFilter(selection?.globalFilter);
    }

    if (selection?.columnFilters) {
      setColumnsFilter(selection?.columnFilters);
    }
    if (selection?.pagination) {
      setPagination({
        pageIndex: selection?.pagination.index,
        pageSize: selection?.pagination.size,
      });
    }

    // clean up when the component unmout
    return () => {
      setGlobalFilter("");
      setColumnsFilter([]);
      setPagination(tableConfig.general.pagination);
    };
  }, [
    selection?.payload,
    selection?.columnFilters,
    selection?.globalFilter,
    selection?.pagination,
  ]);

  return (
    <>
      <Container
        className={`w-full border rounded-[5px] flex justify-start items-start flex-col overflow-x-auto ${
          props.className ? props.className : null
        }`}
        style={{
          height: "calc(100vh - 280px)",
        }}>
        {memoizedData.length > 0 ? (
          <>
            {/* Header */}
            <Container className="w-full">
              {table.getHeaderGroups().map((headerGroup) => (
                <GridStack
                  columns={repeat}
                  key={headerGroup.id}
                  className="p-4 items-center">
                  {headerGroup.headers.map((header) => (
                    // Items
                    <Container
                      key={header.id}
                      style={{
                        width:
                          repeat > 5 ? tableConfig.general.cellWidth : "auto",
                      }}>
                      {header.isPlaceholder ? null : (
                        <div className="flex gap-4 items-center">
                          {header.index === 0 && (
                            <CheckBox
                              {...{
                                checked: table.getIsAllRowsSelected(),
                                indeterminate: table.getIsSomeRowsSelected(),
                                onChange:
                                  table.getToggleAllRowsSelectedHandler(),
                              }}
                            />
                          )}
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none flex"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                            {/* // Sorting Indicator */}
                            <SortingIndicator
                              ascIcon="Asc"
                              descIcon="Desc"
                              isSorted={header.column.getIsSorted() as string}
                            />
                          </div>
                        </div>
                      )}
                    </Container>
                  ))}
                </GridStack>
              ))}
            </Container>
            {/* Content */}
            <Container className="w-full">
              {table.getRowModel().rows.map((row, index) => (
                <GridStack
                  key={row.id}
                  columns={repeat}
                  className={`p-4 items-center ${
                    index === 0 ? "border-t border-b" : "border-b"
                  } border-gray-200`}>
                  {row.getVisibleCells().map((cell) => (
                    <Container
                      key={cell.id}
                      className=""
                      style={{
                        width:
                          repeat > 5 ? tableConfig.general.cellWidth : "auto",
                      }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Container>
                  ))}
                </GridStack>
              ))}
            </Container>
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-full skeleton">
            <h1 className="text-[48px] font-bold text-center">
              No Data Available
            </h1>
          </div>
        )}
      </Container>

      <TablePagination<T> table={table} />
    </>
  );
};

export default Content;
