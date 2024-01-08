import Button from "@/components/Button";
import Field from "@/components/Field";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";
import Modal from "@/components/Modal";
import FlexStack from "@/components/FlexStack";
import { User } from "@/interface/user";
import { registerSchema } from "@/service/validation/auth.validation";

import TableHeader from "@/components/Table/parts/TableHeader";
import queryUtils from "@/utils/query.utils";
import usersApi from "@/service/api/users.api";
import tableConfig from "@/config/table.config";
import FileInput from "@/components/FileInput";

interface Props {
  base: string;
}

const UserCreateForm = ({ base }: Props) => {
  const mutation = queryUtils.mutation<User>({
    mutationFn: async (payload) => await usersApi.createUser(payload),
    toast: "Created Successfully",
    invalidateKey: tableConfig.userTable.invalidateKey,
  });

  const handleSubmit = (payload: User) => {
    console.log(payload);

    if (payload.profileImg) {
      const profileFile = payload.profileImg[0];

      const formData = new FormData();
      formData.append("profileImg", profileFile);
      for (const [key, value] of Object.entries(payload)) {
        if (key !== "profileImg") {
          formData.append(key, value);
        }
      }

      mutation.mutate(formData as User);
      return;
    }
    mutation.mutate(payload);
  };

  return (
    <div>
      <TableHeader
        title="Create user"
        current={`/${base}`}
        className="flex justify-between items-center mb-8"
        options={[{ title: "Create", path: `/${base}/create` }]}>
        <Modal.Button title="Import" />
      </TableHeader>

      <Form<User> onSubmit={handleSubmit} validation={registerSchema}>
        <GridStack dir="col" columns={2}>
          <div></div>
          <FlexStack>
            <FileInput title="Profile" name="profileImg" />
            <Field
              title="User name"
              name="userName"
              placeholder="Enter your Username"
              className="border w-full"
            />
            <Field
              type="email"
              title="Email"
              name="email"
              placeholder="Enter your email"
            />
            <Field
              type="password"
              title="Password"
              name="password"
              placeholder="Enter your email"
            />

            <FlexStack
              gap={8}
              dir="row"
              justifyContent="end"
              className=" w-full">
              <Button title="Create" className="w-[150px]" />
              <Button title="Cancel" className="w-[150px]" />
            </FlexStack>
          </FlexStack>
        </GridStack>
      </Form>
    </div>
  );
};

export default UserCreateForm;
