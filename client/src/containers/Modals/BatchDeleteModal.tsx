/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteModal from "@/containers/Modals/DeleteModal";
import { RootReducer } from "@/service/store";
import { setModalState } from "@/service/store/slice/modal.slice";
import queryUtils from "@/utils/query.utils";
import { QueryKey } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Props {
  tableName: string;
  api: (payload: any) => Promise<AxiosResponse<any, any>>;
  invalidateKey: QueryKey;
}

const BatchDeleteModal = (props: Props) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootReducer) => state.auth);
  const state = useSelector(
    (state: RootReducer) => state.table[props.tableName]
  );

  const mutation = queryUtils.mutation({
    mutationFn: async ({ ids }: { ids: Array<string> }) => props.api(ids),
    invalidateKey: props.invalidateKey,
    toast: "Deleted Successfully",
    onSuccess: () => {
      dispatch(setModalState("batch-delete-modal"));
    },
  });

  const toggleSubmit = () => {
    // check if the current id is existing to the row selection
    const filterRow = state?.rowSelection?.filter(
      (ids: string) => ids !== token
    );

    if (!filterRow || filterRow.length <= 0) {
      toast.error("Invalid Action, Please Try again");
      dispatch(setModalState("batch-delete-modal"));
      return;
    }

    mutation.mutate({ ids: filterRow });
  };

  return <DeleteModal id="batch-delete-modal" onSubmit={toggleSubmit} />;
};

export default BatchDeleteModal;
