/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, ChangeEvent } from "react";
import { useFormContext, FieldValues } from "react-hook-form";
import Text from "./Text";
import Heading from "./Heading";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title?: string;
  default?: string | number | File;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = (props: Props) => {
  const { register, formState, setValue } = useFormContext<FieldValues>();
  const { errors } = formState;

  const errorMessage: any = errors[props.name as string]?.message;

  // Set default value if provided
  if (props.default !== undefined) {
    setValue(props.name, props.default);
  }

  return (
    <label className="flex flex-col gap-4 w-full">
      {props.title && (
        <Heading level={3} className="font-semibold">
          {props.title}
        </Heading>
      )}

      <input
        {...register(props.name)} // Use register to register the input
        type="file"
        className={`file-input file-input-bordered ${
          props.className ? props.className : ""
        } w-full ${errorMessage ? "input-error" : ""}`}
        onChange={props.onChange}
      />
      {errorMessage && (
        <Text className="text-base text-error">{errorMessage}</Text>
      )}
    </label>
  );
};

export default FileInput;
