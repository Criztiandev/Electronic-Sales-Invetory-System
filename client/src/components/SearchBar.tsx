import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = ({ type = "text", ...props }: Props) => {
  return (
    <input
      {...props}
      type={type}
      className={`${
        props.className ? props.className : null
      } input input-bordered w-[300px]`}
    />
  );
};

export default SearchBar;
