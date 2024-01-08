/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Dropdown from "@/components/Dropdown";

import { setColumnFilter } from "@/service/store/slice/table.slice";
import { useDispatch } from "react-redux";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";

interface Options {
  title: string;
}

interface Props {
  title: string;
  name: string;
  columnTitle: string;
  options: Array<Options>;
  children?: ReactNode;
}

const ColumnFilter = (props: Props) => {
  const [title, setTitle] = useState<string>();
  const dispatch = useDispatch();
  const itemRef = useRef<HTMLLIElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target;

    if (itemRef && !itemRef.current?.contains(target as Node)) {
      // reset column filter
      dispatch(
        setColumnFilter({
          id: props.name,
          data: [{ id: props.columnTitle, value: "" }],
        })
      );

      // reset title
      setTitle("");
    }
  };

  const handleColumnFilter = (e: MouseEvent<HTMLLIElement>) => {
    const content = e.currentTarget.textContent;
    setTitle(content || "");
    dispatch(
      setColumnFilter({
        id: props.name,
        data: [{ id: props.columnTitle, value: content?.toLowerCase() }],
      })
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside as any);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, []);

  return (
    <>
      <Dropdown className="dropdown-end">
        <Dropdown.Button>{title ? title : props.title}</Dropdown.Button>
        <Dropdown.Content className="mt-3">
          {props.options?.map((items) => (
            <li
              ref={itemRef}
              key={items.title}
              onClick={handleColumnFilter}
              className="cursor-pointer btn btn-ghost items-start text-base">
              {items.title}
            </li>
          ))}
        </Dropdown.Content>
      </Dropdown>
      ;
    </>
  );
};

export default ColumnFilter;
