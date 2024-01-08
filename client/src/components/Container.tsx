import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Container = ({ ...props }: Props) => {
  return (
    <div {...props} className={`${props.className ? props.className : null}`}>
      {props.children}
    </div>
  );
};

export default Container;
