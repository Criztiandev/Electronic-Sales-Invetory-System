import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

const Input = ({ title, ...props }: Props) => {
  return (
    <label className="flex flex-col gap-2">
      {title && <span className="text-base">{title}</span>}
      <input
        {...props}
        className={`${
          props.className ? props.className : null
        } input input-bordered`}
      />
    </label>
  );
};

export default Input;
