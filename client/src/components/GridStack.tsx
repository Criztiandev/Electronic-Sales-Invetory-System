import { ReactNode, CSSProperties } from "react";

interface GridStackProps {
  children?: ReactNode;
  dir?: "col" | "row";
  columns?: number;
  gap?: string | number;
  style?: CSSProperties;
  className?: string;
}

const GridStack = (props: GridStackProps) => {
  const { dir = "col", columns = 2, gap = "1rem", style, children } = props;

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: dir === "col" ? `repeat(${columns}, 1fr)` : "",
    gridTemplateRows: dir === "row" ? `repeat(${columns}, 1fr)` : "",
    gap,
    ...style,
  };

  return (
    <div className={`${props.className} grid ${dir}`} style={gridStyle}>
      {children}
    </div>
  );
};

export default GridStack;
