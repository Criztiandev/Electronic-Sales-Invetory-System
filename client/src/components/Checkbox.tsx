import { useEffect, useRef, InputHTMLAttributes } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate: boolean;
}

const CheckBox = ({
  indeterminate,
  className = "",
  ...rest
}: CheckBoxProps) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={
        className + " cursor-pointer checkbox checkbox-sm rounded-[5px]"
      }
      {...rest}
    />
  );
};

export default CheckBox;
