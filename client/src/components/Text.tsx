import { createElement, ReactNode, CSSProperties } from "react";

interface TextProps {
  size?: string | number;
  as?: "p" | "span";
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

const Text = ({
  as = "p",
  size,
  color,
  bold,
  italic,
  underline,
  style,
  className,
  children,
}: TextProps) => {
  const textStyle: CSSProperties = {
    fontSize: size,
    color,
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none",
    ...style,
  };

  // Generate Tailwind CSS classes based on props
  const sizeClasses = size ? `text-${size}` : "";
  const colorClasses = color ? `text-${color}` : "";
  const fontWeightClasses = bold ? "font-bold" : "";
  const fontStyleClasses = italic ? "italic" : "";
  const underlineClasses = underline ? "underline" : "";

  return createElement(
    as,
    {
      className: ` ${sizeClasses} ${colorClasses} ${fontWeightClasses} ${fontStyleClasses} ${underlineClasses} ${className}`,
      style: textStyle,
    },
    children
  );
};

export default Text;
