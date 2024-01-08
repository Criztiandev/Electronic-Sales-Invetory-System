import CryptoJS from "crypto-js";
import Field from "@/components/Field";
import Form from "@/components/Form";
import Stack from "@/components/FlexStack";
import { User } from "@/interface/user";
import authApi from "@/service/api/auth.api";
import { registerSchema } from "@/service/validation/auth.validation";
import { Link, useNavigate } from "react-router-dom";
import queryUtils from "@/utils/query.utils";
import Button from "@/components/Button";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const mutation = queryUtils.mutation({
    mutationFn: async (payload: User) => await authApi.register(payload),
    invalidateKey: ["user"],
    onSuccess: () => {
      navigate("/login");
    },
    toast: "Registered successfully",
  });

  const onSubmit = async ({ password, ...payload }: User) => {
    if (!password) return;
    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      import.meta.env.VITE_PASSWORD_SECRET
    ).toString();
    mutation.mutate({ password: hashedPassword, ...payload });
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-5xl font-bold">Register</h2>
        <span className="my-4 mb-8">
          Lorem ipsum dolor sit amet adipiscing elit.
        </span>
        <Form<User>
          validation={registerSchema}
          onSubmit={onSubmit}
          className="flex flex-col w-96 ">
          <Stack dir="col">
            <Field
              type="text"
              title="User Name"
              name="userName"
              placeholder="Enter your username"
            />
            <Field
              type="email"
              title="Email"
              name="email"
              placeholder="Enter your Email"
            />
            <Field
              type="password"
              title="Password"
              name="password"
              placeholder="Enter your Password"
            />
          </Stack>

          <hr className="border border-black my-8" />

          <Stack dir="col" gap={16}>
            <Button title="Register" className="w-full" />
          </Stack>
        </Form>
        <span className="my-4">
          Don have an account?{" "}
          <Link to={"/login"} className="border-b border-black">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterScreen;
