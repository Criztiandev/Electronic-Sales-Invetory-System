import { BaseProps } from "@/interface/component";
import { Table } from "@tanstack/react-table";
import Button from "./Button";

interface ButtonProps<T> extends BaseProps {
  dir?: "left" | "right";
  title: string;
  table: Table<T>;
}

interface Display<T> {
  isMax?: boolean;
  table: Table<T>;
}

const _Button = <T,>({ table, ...props }: ButtonProps<T>) => {
  const { previousPage, nextPage, getCanNextPage, getCanPreviousPage } = table;
  return (
    <>
      {props.dir === "left" ? (
        <Button
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage() as boolean}
          {...props}
        />
      ) : (
        <Button
          onClick={() => nextPage()}
          disabled={!getCanNextPage() as boolean}
          {...props}
        />
      )}
    </>
  );
};

const Display = <T,>({ table, ...props }: Display<T>) => {
  const { getState, getPageCount } = table;
  return (
    <div className="flex btn">
      <span>{getState().pagination.pageIndex + 1}</span>
      {props.isMax && (
        <span className="flex gap-2">
          <span>of</span>
          {getPageCount()}
        </span>
      )}
    </div>
  );
};

const Pagination = ({ className, children }: BaseProps) => {
  return <div className={`${className ? className : null}`}>{children}</div>;
};

Pagination.Button = _Button;
Pagination.Display = Display;

export default Pagination;
