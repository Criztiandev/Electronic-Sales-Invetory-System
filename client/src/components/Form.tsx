/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ZodType } from "zod";

interface Props<T extends Record<string, any>> {
  onSubmit: SubmitHandler<T>;
  children?: ReactNode;
  validation: ZodType<T>;
  className?: string;
}

const Form = <T extends Record<string, any>>({
  children,
  onSubmit,
  validation,
  ...props
}: Props<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(validation),
  });

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          methods.reset();
        })}
        {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
