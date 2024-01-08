/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import FlexStack from "@/components/FlexStack";
import DeleteModal from "@/containers/Modals/DeleteModal";
import { ActionProps } from "@/interface/component";
import usersApi from "@/service/api/users.api";
import {
  deleteModalInstnace,
  setModalState,
} from "@/service/store/slice/modal.slice";
import queryUtils from "@/utils/query.utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface DeleteProps {
  id: string;
}

const Action = <T,>({ id, payload, ...props }: ActionProps<T>) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UID: string | undefined = (payload.row.original as { _id: string })._id;

  const deleteMutation = queryUtils.mutation<DeleteProps>({
    mutationFn: ({ id }) => usersApi.deleteUserById(id),
    toast: "Deleted Successfully",
    invalidateKey: props.invalidateKey,

    onSuccess: () => {
      dispatch(setModalState(`${id}-delete-modal`));
      dispatch(deleteModalInstnace(`${id}-delete-modal`));
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ id: UID });
  };

  return (
    <>
      <FlexStack dir="row" gap={"1rem"} className="pr-4">
        <Button
          title="Edit"
          className="btn-md"
          onClick={() => navigate(`edit/${UID}`)}
        />
        <Button
          title="Delete"
          className="btn-md"
          onClick={() => dispatch(setModalState(`${id}-delete-modal`))}
        />
      </FlexStack>

      <DeleteModal
        id={`${id}-delete-modal`}
        isPending={deleteMutation.isPending}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default Action;
