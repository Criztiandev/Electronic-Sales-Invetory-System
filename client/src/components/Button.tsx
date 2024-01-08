import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  dir?: "left" | "right" | undefined;
  title?: string;
  icon?: string;
}

const Button = (props: Props) => {
  return (
    <button
      {...props}
      className={`${props.className ? props.className : null} btn text-base`}>
      {props.dir && props.icon && props.dir === "left" && (
        <i className="w-6 h-6">{props.icon}</i>
      )}
      <span className="text-base">{props.title}</span>
      {props.dir && props.icon && props.dir === "right" && (
        <i className="w-6 h-6">{props.icon}</i>
      )}
    </button>
  );
};

export default Button;
