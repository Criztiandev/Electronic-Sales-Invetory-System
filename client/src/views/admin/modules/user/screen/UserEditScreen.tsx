/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Field from "@/components/Field";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";
import FlexStack from "@/components/FlexStack";
import { User } from "@/interface/user";
import TableHeader from "@/components/Table/parts/TableHeader";
import Select from "@/components/Select";
import queryUtils from "@/utils/query.utils";
import usersApi from "@/service/api/users.api";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "@/views/general/LoadingScreen";
import { ToastContent, toast } from "react-toastify";
import { PreferedUserDetailsSchema } from "@/service/validation/user.validation";
import FileInput from "@/components/FileInput";
import Avatar from "@/components/Avatar";
import { useQuery } from "@tanstack/react-query";
import fileApi from "@/service/api/file.api";
import Container from "@/components/Container";

interface Props {
  base: string;
}

interface PreferedUserDetails {
  profileImg?: string;
  userName: string;
  email: string;
  role: "user" | "admin";
}

const UserEditScreen = ({ base }: Props) => {
  const location = useLocation();
  const UID: string = location.pathname.split("/").pop() || "";
  const navigate = useNavigate();

  const { data, isError, isLoading, error, refetch } = queryUtils.query({
    queryFn: async () => await usersApi.fetchUserById(UID),
    key: [`user-${UID}`],
  });
  const { payload: res } = data?.data || {};

  const imageQuery = useQuery({
    queryFn: async () =>
      await fileApi.fetchImage(`/profile/${res?.profileImg}`),
    queryKey: [`user-${UID}-img`],
    enabled: !!res?.profileImg,
  });

  // make it multiple
  const mutation = queryUtils.mutation({
    mutationFn: async ({ UID, payload }: { UID: string; payload: any }) =>
      usersApi.updateUserById(UID, payload),
    invalidateKey: [`user-${UID}`],
    toast: "Updated Successfull",

    onSuccess: () => {
      refetch();

      setTimeout(() => {
        imageQuery.refetch();
      }, 300);
    },
  });

  if (isError) {
    const errorToastContent: ToastContent<Error> = `Error: ${error.message}`;
    toast.error(errorToastContent);
    return <LoadingScreen />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

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

      mutation.mutate({ UID: UID, payload: formData });
      return;
    }
    mutation.mutate({ UID: UID, payload: payload });
  };

  return (
    <section className="px-[32px] py-4 overflow-y-scroll h-screen ">
      <div className="w-full mx-auto p-8 max-w-[1240px]">
        <TableHeader
          title="Edit User"
          current={`/${base}`}
          options={[
            { title: "Details", path: `/${base}/${UID}` },
            { title: "Edit", path: `/${base}/edit/${UID}` },
          ]}></TableHeader>
        <Form<PreferedUserDetails>
          onSubmit={handleSubmit}
          validation={PreferedUserDetailsSchema}>
          <GridStack columns={2} className="border-b pb-8 ">
            <Container>
              <h2 className="text-xl font-semibold">Profile</h2>
              <p className="my-4 text-base">dfsdfsdfsdfsdfsdfsdfsf</p>
            </Container>

            <Container>
              <Container className="w-full">
                {imageQuery.isLoading ? (
                  <div className="skeleton w-32 h-32 rounded-full shrink-0"></div>
                ) : (
                  <Avatar
                    src={imageQuery.data as string}
                    alt="profile"
                    size="lg"
                  />
                )}
              </Container>
              <FileInput title="Profile" name="profileImg" />
            </Container>
          </GridStack>

          <GridStack columns={2} className="border-b border-gray-400 my-8 pb-8">
            <Container>
              <h2 className="text-xl font-semibold">Details</h2>
              <p className="my-4 text-base">dfsdfsdfsdfsdfsdfsdfsf</p>
            </Container>

            <FlexStack className="py-4">
              <Field
                title="User name"
                name="userName"
                placeholder="Enter your Username"
                className="border w-full"
                default={res?.userName}
              />
              <Field
                type="email"
                title="Email"
                name="email"
                placeholder="Enter your email"
                default={res?.email}
              />
              <Select
                title="Role"
                name="role"
                placeholder="Select Role"
                default={res?.role}
                option={[
                  { title: "User", value: "user" },
                  { title: "Admin", value: "admin" },
                ]}
              />
            </FlexStack>
          </GridStack>

          <GridStack columns={2} className="border-b border-gray-200 pb-8">
            <Container>
              <h2 className="text-xl font-semibold">Actions</h2>
              <p className="my-4 text-base">dfsdfsdfsdfsdfsdfsdfsf</p>
            </Container>
            <FlexStack
              gap={8}
              dir="col"
              justifyContent="end"
              className=" w-full">
              <Button title="Update" className="w-full" />
              <Button
                title="Cancel"
                className="w-full"
                type="button"
                onClick={() => navigate(`/${base}`)}
              />
            </FlexStack>
          </GridStack>
        </Form>
      </div>
    </section>
  );
};

export default UserEditScreen;
