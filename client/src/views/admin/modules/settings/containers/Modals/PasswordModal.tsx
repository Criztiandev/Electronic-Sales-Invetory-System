import { passwordValidation } from "@/service/validation/account.validation";
import { QueryKey } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Interace
import { User } from "@/interface/user";
import { MutationPayload, Password } from "../../interface/settings";

// Components
import Button from "@/components/Button";
import Field from "@/components/Field";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Stack from "@/components/FlexStack";
import accountApi from "@/service/api/account.api";

// Api
import queryUtils from "@/utils/query.utils";
import { useDispatch } from "react-redux";
import { setModalState } from "@/service/store/slice/modal.slice";

interface Props {
  token: string;
  key: QueryKey;
}

const PasswordModal = (props: Props) => {
  const dispatch = useDispatch();
  const mutation = queryUtils.mutation({
    mutationFn: async ({ token, payload }: MutationPayload<User>) =>
      await accountApi.updateDetails(token, payload),
    invalidateKey: `${props.key}`,
    toast: "Password Changed Successfully",
    onSuccess: () => dispatch(setModalState("change-pwd")),
  });

  const handleSubmit = (payload: Password) => {
    if (payload.password !== payload.confirmPassword) {
      toast.error("Password doesnt match");
      return;
    }

    if (!props.token) {
      toast.error("Something went wrong");
      return;
    }

    mutation.mutate({
      token: props.token,
      payload: { password: payload.password },
    });
  };
  return (
    <Modal id="change-pwd">
      <Form<Password>
        validation={passwordValidation}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 ">
        <h2 className="text-3xl font-bold mb-2">New Password</h2>
        <Stack>
          <Field
            type="password"
            title="Password"
            name="password"
            placeholder="Enter your new Password"
          />

          <Field
            type="password"
            title="Confim Password"
            name="confirmPassword"
            placeholder="Enter your new Password"
          />
        </Stack>
        <Button title="Confrim " className="modal-open" />
        <Button
          title="Cancel "
          type="button"
          onClick={() => dispatch(setModalState("change-pwd"))}
        />
      </Form>
    </Modal>
  );
};

export default PasswordModal;
