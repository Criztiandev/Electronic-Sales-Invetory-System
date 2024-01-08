/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "@/service/store/slice/modal.slice";
import { User } from "@/interface/user";
import { MutationPayload } from "../../interface/settings";
import { RootReducer } from "@/service/store";
import { accountValidation } from "@/service/validation/account.validation";

import Button from "@/components/Button";
import Field from "@/components/Field";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import DeleteModal from "@/containers/Modals/DeleteModal";
import PasswordModal from "../Modals/PasswordModal";

import accountApi from "@/service/api/account.api";
import queryUtils from "@/utils/query.utils";
import { useState } from "react";
import LoadingScreen from "@/views/general/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from "@/service/store/slice/auth.slice";
import Avatar from "@/components/Avatar";
import fileApi from "@/service/api/file.api";
import Container from "@/components/Container";
import FileInput from "@/components/FileInput";
import GridStack from "@/components/GridStack";
import FlexStack from "@/components/FlexStack";

const AccountTab = () => {
  const [active, setActive] = useState(true);
  const { token } = useSelector((state: RootReducer) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const key: any = `user-${token}`;

  if (!token) throw new Error("No Token");

  const query = useQuery({
    queryFn: async () => await accountApi.getUserDetails(token),
    queryKey: [key],
  });
  const { payload } = (query?.data as { payload: User }) || {};

  const imageQuery = useQuery({
    queryFn: async () =>
      await fileApi.fetchImage(`/profile/${payload?.profileImg}`),
    queryKey: [`user-${payload?._id}-img`],
    enabled: !!payload?.profileImg,
  });

  const credentialMutation = queryUtils.mutation({
    mutationFn: async ({ UID, payload }: MutationPayload<any>) =>
      await accountApi.updateDetailsById(UID, payload),
    invalidateKey: key,
    toast: "Credentials Updated Successfully",
    onSuccess: () => {
      setActive((prev) => !prev);
    },
  });

  const deleteMutation = queryUtils.mutation({
    mutationFn: async ({ id }: { id: string }) =>
      await accountApi.deleteDetailsById(id),
    invalidateKey: key,
    toast: "Deleted Successfully",
    onSuccess: () => {
      dispatch(clearCredentials());
      navigate("/");
    },
  });

  // Normal Submit
  const handleUpdateCredentials = (payload: User) => {
    if (payload.profileImg) {
      const profileFile = payload.profileImg[0];

      const formData = new FormData();
      formData.append("profileImg", profileFile);

      for (const [key, value] of Object.entries(payload)) {
        if (key !== "profileImg") {
          formData.append(key, value);
        }
      }

      credentialMutation.mutate({ UID: token, payload: formData });
      return;
    }
    credentialMutation.mutate({ UID: token, payload: payload });
  };

  const handleDeleteMutation = () => deleteMutation.mutate({ id: token });

  if (query.isLoading) {
    return <LoadingScreen />;
  }

  if (query.isError) {
    toast.error("An error occurred while fetching user details");
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="mt-8">
        <Form<User>
          onSubmit={handleUpdateCredentials}
          validation={accountValidation}>
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

          <GridStack columns={2} className="border-b border-gray-300 my-8 pb-8">
            <Container>
              <h2 className="text-xl font-semibold">Details</h2>
              <p className="my-4 text-base">dfsdfsdfsdfsdfsdfsdfsf</p>
            </Container>

            <FlexStack className="py-4">
              <Field
                title="User name"
                name="userName"
                placeholder="Enter your credentials"
                disabled={active}
                default={payload?.userName}
              />
              <Field
                type="email"
                title="Email"
                name="email"
                placeholder="Enter your email"
                disabled={active}
                default={payload?.email}
              />
            </FlexStack>
          </GridStack>

          <GridStack>
            <Container>
              <h2 className="text-xl font-semibold">Actions</h2>
              <p className="my-4 text-base">dfsdfsdfsdfsdfsdfsdfsf</p>
            </Container>
            <Container>
              {!active ? (
                <Button
                  title="Update Profile"
                  disabled={credentialMutation.isPending}
                  className="w-full"
                />
              ) : (
                <div className="flex flex-col gap-4">
                  <Modal.Button
                    type="button"
                    id="change-pwd"
                    title="Change Password"
                    onClick={() => dispatch(setModalState("change-pwd"))}
                    className="w-full"
                  />
                  <Modal.Button
                    type="button"
                    id="delete-acc"
                    title="Delete Account"
                    className="btn-error w-full"
                    onClick={() => dispatch(setModalState("delete-account"))}
                  />
                </div>
              )}
            </Container>
          </GridStack>
        </Form>
      </div>

      <PasswordModal key={key} token={token} />
      <DeleteModal id="delete-account" onSubmit={handleDeleteMutation} />
    </>
  );
};

export default AccountTab;
