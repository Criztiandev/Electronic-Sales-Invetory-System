import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { clearCredentials } from "@/service/store/slice/auth.slice";
import { setModalState } from "@/service/store/slice/modal.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout successfully");
    dispatch(setModalState("logout-modal"));
    dispatch(clearCredentials());
    navigate("/");
  };

  return (
    <>
      <nav className="border flex justify-end items-center p-4 w-full">
        <Button
          title="T"
          className="btn-circle"
          onClick={() => dispatch(setModalState("logout-modal"))}
        />
      </nav>

      <Modal id="logout-modal">
        <h2 className="font-bold text-[28px]">Notice!!</h2>
        <p className="mt-4 my-6">
          A paragraph is a series of sentences that are organized and coherent,
          and are all related to a single topic. Almost every piece of writing
          you do that is longer than a few sentences should be organized into
          paragraphs
        </p>
        <div className="flex flex-col gap-2">
          <Button title="Confirm" className="" onClick={handleLogout} />
          <Modal.Button
            onClick={() => dispatch(setModalState("logout-modal"))}
            title="Cancel"
          />
        </div>
      </Modal>
    </>
  );
};

export default Topbar;
