import { BaseProps } from "@/interface/component";

interface Props extends BaseProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Avatar = ({
  size = "sm",
  src = "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  ...props
}: Props) => {
  const prefSize = {
    sm: "w-12",
    md: "w-16",
    lg: "w-32",
    xl: "w-48",
  };

  return (
    <div className="avatar">
      <div className={`${prefSize[size]} rounded-full border`}>
        <img src={src} {...props} />
      </div>
    </div>
  );
};

export default Avatar;
