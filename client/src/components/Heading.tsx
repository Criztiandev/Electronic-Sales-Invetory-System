import { ReactNode, CSSProperties } from "react";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const Heading = ({ level, children, style, className }: HeadingProps) => {
  const headingStyles: Record<number, CSSProperties> = {
    1: { fontSize: "2em", fontWeight: "500" },
    2: { fontSize: "1.7em", fontWeight: "bold" },
    3: { fontSize: "1.2em" },
  };

  const HeadingTag = `h${level}` as const;
  const customStyle = headingStyles[level] || {};

  return (
    <HeadingTag style={{ ...customStyle, ...style }} className={className}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
