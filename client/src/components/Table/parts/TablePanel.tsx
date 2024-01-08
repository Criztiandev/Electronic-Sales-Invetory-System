import { RootReducer } from "@/service/store";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalFilter } from "@/service/store/slice/table.slice";
import SearchBar from "@/components/SearchBar";

import { BaseProps } from "@/interface/component";

interface Props extends BaseProps {
  name: string;
}

const Panel = (props: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootReducer) => state.table[props.name]);

  return (
    <div className="flex justify-between mb-4">
      <SearchBar
        value={selector?.globalFilter}
        onChange={(e) =>
          dispatch(setGlobalFilter({ id: props.name, data: e.target.value }))
        }
        placeholder="Search here"
      />
      <div className="flex gap-4">{props.children}</div>
    </div>
  );
};

export default Panel;
