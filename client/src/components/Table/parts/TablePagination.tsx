import Button from "@/components/Button";
import Container from "@/components/Container";
import GridStack from "@/components/GridStack";
import { Table } from "@tanstack/react-table";

interface Props<T> {
  table: Table<T>;
}

const TablePagination = <T,>({ table }: Props<T>) => {
  return (
    <GridStack dir="col" columns={3} className="mt-4">
      <Container>
        <Button
          title="Prev"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        />
      </Container>

      <Container className="join flex justify-center items-center ">
        {Array(table.getState().pagination.pageSize)
          .fill({ length: table.getState().pagination.pageSize })
          .map((_, index) => (
            <Button
              key={index}
              className={`join-item btn-md ${
                table.getState().pagination.pageIndex === index ? "border" : ""
              }`}
              onClick={() => {}}
              title={`${index + 1}`}
            />
          ))}
      </Container>

      <Container className="flex justify-end">
        <Button
          title="Next"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        />
      </Container>
    </GridStack>
  );
};

export default TablePagination;
