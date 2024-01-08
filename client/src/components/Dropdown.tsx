/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseProps } from "@/interface/component";
import { useEffect, useRef, MouseEvent } from "react";
const Dropdown = ({ children, className }: BaseProps) => {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent<Document>) => {
      const target = e.target;

      if (detailsRef && detailsRef.current) {
        if (!detailsRef.current.contains(target as Node)) {
          if (detailsRef.current.open !== undefined) {
            detailsRef.current.open = false;
          }
        }
      }
    };

    document.addEventListener("click", handleClickOutside as any);
    return () => {
      document.removeEventListener("click", handleClickOutside as any);
    };
  }, [detailsRef]);

  return (
    <details
      ref={detailsRef}
      className={`dropdown ${className ? className : null}`}>
      {children}
    </details>
  );
};

const Button = ({ children, className }: BaseProps) => {
  return (
    <summary className={`${className ? className : null} btn text-base`}>
      {children}
    </summary>
  );
};

const Content = ({ children, className }: BaseProps) => {
  return (
    <ul
      tabIndex={0}
      className={`p-2 shadow menu dropdown-content  bg-base-100 text-base w-52 rounded-[5px] z-[99px] fixed ${
        className ? className : null
      } `}>
      {children}
    </ul>
  );
};

const Item = ({ children, className, ...props }: BaseProps) => {
  return (
    <li
      className={`${
        className ? className : null
      } cursor-pointer btn btn-ghost items-start text-base`}
      {...props}>
      {children}
    </li>
  );
};

Dropdown.Item = Item;

Dropdown.Button = Button;
Dropdown.Content = Content;

export default Dropdown;
