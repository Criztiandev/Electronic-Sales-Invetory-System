import React, { ReactNode } from "react";

interface IconProps {
  children?: ReactNode;
  type?: "svg" | "image";
  color?: string;
  src?: string; // Image source
  alt?: string; // Image alt text
  size?: string | number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  children,
  type,
  src,
  alt,
  size = "24px",
  className,
  ...props
}) => {
  if (type === "svg") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={props.color || "none"}
        viewBox="0 0 24 24"
        className="w-4 h-4 stroke-current mr-2"
        style={{ width: size, height: size }}>
        {children}
      </svg>
    );
  } else if (type === "image") {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ width: size, height: size }}
      />
    );
  } else {
    return <div>Default Icon</div>;
  }
};

export default Icon;
