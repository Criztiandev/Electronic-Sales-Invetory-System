import { useFormContext, FieldValues } from "react-hook-form";
import Heading from "./Heading";
import Text from "./Text";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Options {
  title: string;
  value: string | number;
}

interface Props {
  title: string;
  name: string;
  placeholder: string;
  option: Array<Options>;
  className?: string;
  default?: string | number;
}

const Select = (props: Props) => {
  const { register, formState, setValue } = useFormContext<FieldValues>();
  const { errors } = formState;

  const errorMessage: any = errors[props.name as string]?.message;

  if (props.default) {
    setValue(props.name, props.default);
  }

  return (
    <label className="relative flex flex-col gap-2 w-full">
      <Heading level={3} className="font-semibold">
        {props.title}
      </Heading>

      <select
        {...props}
        {...register(props?.name)}
        className={`${
          props.className ? props.className : ""
        } select select-bordered`}>
        <option value={""} className="text-[18px]">
          {props.placeholder}
        </option>
        {props.option?.map((field) => (
          <option key={field.title} value={field.value} className="text-[18px]">
            {field.title}
          </option>
        ))}
      </select>

      {errorMessage && (
        <Text className="text-base text-error">{errorMessage}</Text>
      )}
    </label>
  );
};

export default Select;
