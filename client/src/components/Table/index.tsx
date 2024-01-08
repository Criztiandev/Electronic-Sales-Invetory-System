import { BaseProps } from "@/interface/component";
import Content from "./parts/TableContent";
import Panel from "./parts/TablePanel";
import FirstCell from "./parts/TableFirstCell";
import CheckBox from "../Checkbox";
import Action from "./parts/TableAction";
import ColumnFilter from "./parts/ColumnFilter";
import MoreOption from "./parts/TableOptions";
import TableHeader from "./parts/TableHeader";
import TablePagination from "./parts/TablePagination";

const Table = ({ ...props }: BaseProps) => {
  return (
    <div {...props} className={`${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
};

Table.MoreOption = MoreOption;
Table.Filter = ColumnFilter;

Table.Header = TableHeader;
Table.Content = Content;
Table.Panel = Panel;
Table.Pagination = TablePagination;

Table.FirstCell = FirstCell;
Table.CheckBox = CheckBox;
Table.Action = Action;

export default Table;
