import { BaseProps } from "@/interface/component";
import React, { forwardRef } from "react";
import { ToastContainer } from "react-toastify";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "@/service/store";
import { setModalState } from "@/service/store/slice/modal.slice";

interface ModalProps extends BaseProps {
  id: string;
}

interface ModalComponent
  extends React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<HTMLInputElement>
  > {
  Button: typeof Button;
}

const Modal = forwardRef<HTMLInputElement, ModalProps>((props, ref) => {
  const dispatch = useDispatch();
  const states = useSelector((state: RootReducer) => state.modal[props.id]);
  return (
    <>
      {states?.active && (
        <>
          <input
            ref={ref as React.RefObject<HTMLInputElement>}
            type="checkbox"
            id={props.id}
            checked={states?.active}
            className="modal-toggle"
            onChange={() => states?.active}
          />
          <div className="modal" role="dialog">
            <div className={`modal-box`}>{props.children}</div>
            <label
              className="modal-backdrop"
              htmlFor={props.id}
              onClick={() => dispatch(setModalState(props.id))}>
              Close
              <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={true}
                closeOnClick
                draggable
                pauseOnHover
              />
            </label>
          </div>
        </>
      )}
    </>
  );
}) as ModalComponent;

Modal.Button = Button;

export default Modal;
