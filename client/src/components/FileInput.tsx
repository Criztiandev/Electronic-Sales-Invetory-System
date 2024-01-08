/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";
import { useFormContext, FieldValues } from "react-hook-form";
import Text from "./Text";
import Heading from "./Heading";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title?: string;
  default?: string | number;
  forwardedRef?: ForwardedRef<HTMLInputElement>;
}

const FileInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { register, formState, setValue } = useFormContext<FieldValues>();
  const { errors } = formState;

  const errorMessage: any = errors[props.name as string]?.message;

  if (props.default !== undefined) {
    setValue(props.name, props.default);
  }

  return (
    <label className="flex flex-col gap-4 border  w-full">
      {props.title && (
        <Heading level={3} className="font-semibold">
          {props.title}
        </Heading>
      )}

      <input
        {...props}
        {...register(props?.name)}
        ref={ref || null}
        type="file"
        className={`file-input file-input-bordered ${
          props.className ? props.className : ""
        } w-full ${errorMessage ? "input-error" : ""}`}
        autoComplete={`current-${props.name}`}
      />
      {errorMessage && (
        <Text className="text-base text-error">{errorMessage}</Text>
      )}
    </label>
  );
});

export default FileInput;
