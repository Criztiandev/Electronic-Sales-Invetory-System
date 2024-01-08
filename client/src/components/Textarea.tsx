/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextareaHTMLAttributes } from "react";
import { useFormContext, FieldValues } from "react-hook-form";
import Heading from "./Heading";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  title?: string;
  default?: string | number;
}

const Textarea = (props: Props) => {
  const { register, formState, setValue } = useFormContext<FieldValues>();
  const { errors } = formState;

  const errorMessage: any = errors[props.name as string]?.message;

  if (props.default) {
    setValue(props.name, props.default);
  }

  return (
    <label className="flex flex-col gap-2 w-full">
      {props.title && (
        <Heading level={3} className="font-semibold">
          {props.title}
        </Heading>
      )}

      <textarea
        {...props}
        {...register(props?.name)}
        className={`textarea textarea-bordered h-[300px] ${
          props.className ? props.className : ""
        } w-full ${errorMessage ? "input-error" : ""}`}
        autoComplete={`current-${props.name}`}
      />

      {errorMessage && (
        <span className="text-base text-error">{errorMessage}</span>
      )}
    </label>
  );
};

export default Textarea;
