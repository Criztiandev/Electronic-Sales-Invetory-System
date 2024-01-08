import { ReactNode } from "react";

type Direction = "top" | "left" | "bottom" | "right";

interface Props {
  dir?: Direction;
  title: string;
  active?: string | boolean;
  children?: ReactNode;
}

const Tooltip = ({ dir = "right", ...props }: Props) => {
  const position: Record<Direction, string> = {
    top: "tooltip-top",
    left: "tooltip-left",
    bottom: "tooltip-bottom",
    right: "tooltip-right",
  };

  return (
    <div
      className={`tooltip ${position[dir]} z-10`}
      data-tip={props.title}
      {...props}>
      {props.children}
    </div>
  );
};

export default Tooltip;
