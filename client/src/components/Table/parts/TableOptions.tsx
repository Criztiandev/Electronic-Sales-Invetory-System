import Dropdown from "@/components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/Modal";
import { setModalState } from "@/service/store/slice/modal.slice";
import { RootReducer } from "@/service/store";
import { toast } from "react-toastify";

interface Props {
  name: string;
}

const MoreOption = (props: Props) => {
  const selector = useSelector((state: RootReducer) => state.table[props.name]);
  const dispatch = useDispatch();

  const handleAction = () => {
    if (selector?.rowSelection && selector?.rowSelection?.length <= 0) {
      toast.error("Invalid Action. Please select a row.");
      return;
    }

    dispatch(setModalState("batch-delete-modal"));
  };

  return (
    <Dropdown className="dropdown-end">
      <Dropdown.Button className="btn-circle">T</Dropdown.Button>
      <Dropdown.Content className=" mt-2">
        <Modal.Button
          title="Move to Trash"
          className="btn-ghost"
          onClick={handleAction}
        />
      </Dropdown.Content>
    </Dropdown>
  );
};

export default MoreOption;
