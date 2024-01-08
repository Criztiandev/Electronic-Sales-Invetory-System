import { BaseProps } from "@/interface/component";

interface Props extends BaseProps {}

const Badge = (props: Props) => {
  return (
    <div
      {...props}
      className={`${props.className ? props.className : null} badge`}>
      {props.children}
    </div>
  );
};

export default Badge;
