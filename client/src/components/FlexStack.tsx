import { ReactNode, CSSProperties } from "react";

interface Props {
  dir?: "row" | "col";
  gap?: number | string;
  children?: ReactNode;
  className?: string;
  justifyContent?: "center" | "end" | "start" | "between";
  alignItems?: "center" | "end" | "start";
  style?: CSSProperties;
}

const FlexStack = ({ dir = "col", gap = 16, style, ...props }: Props) => {
  const flexAnnotation = {
    center: "center",
    start: "flex-start",
    end: "flex-end",
    between: "space-between",
  };

  return (
    <div
      className={`flex ${dir === "row" ? "flex-row" : "flex-col"} ${
        props.className && props.className
      }`}
      style={{
        gap: gap,
        justifyContent: flexAnnotation[props.justifyContent || "start"],
        alignItems: flexAnnotation[props.alignItems || "start"],
        ...style,
      }}>
      {props.children}
    </div>
  );
};

export default FlexStack;
