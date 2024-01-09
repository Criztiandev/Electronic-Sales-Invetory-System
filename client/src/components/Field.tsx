/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from "react";
import { useFormContext, FieldValues } from "react-hook-form";
import Text from "./Text";
import Heading from "./Heading";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title?: string;
  default?: string | number;
}

const Field = (props: Props) => {
  const { register, formState, setValue } = useFormContext<FieldValues>();
  const { errors } = formState;

  const errorMessage: any = errors[props.name as string]?.message;

  if (props.default) {
    setValue(props.name, props.default);
  }

  return (
    <label
      className="relative w-full mb-4 flex flex-col gap-2"
      style={{ gridTemplateRows: `24px auto ${errorMessage && "24px"}` }}>
      {props.title && (
        <Heading level={3} className="font-base">
          {props.title}
        </Heading>
      )}
      <input
        {...props}
        {...register(props?.name)}
        className={`input input-bordered ${
          props.className ? props.className : ""
        } w-full ${errorMessage ? "input-error" : ""}`}
        autoComplete={`current-${props.name}`}
      />
      {errorMessage && (
        <Text className="absolute top-[96px] text-error text-base">
          {errorMessage}
        </Text>
      )}
    </label>
  );
};

export default Field;
