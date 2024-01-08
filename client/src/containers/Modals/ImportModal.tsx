import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useRef } from "react";

interface Props {
  id: string;
}

const ImportModal = (props: Props) => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const toggleFilter = () => {
    fileInput.current?.click();
  };

  return (
    <Modal {...props}>
      <h1 className="text-2xl font-bold">Import File Format</h1>

      <form>
        <label
          role="button"
          onClick={toggleFilter}
          className="w-full h-[240px] border border-dashed border-black rounded-[5px] p-4 mt-4 mb-2 flex flex-col justify-center items-center">
          <input
            ref={fileInput}
            type="file"
            id="input-file-upload"
            multiple={true}
            className="hidden"
          />
          <p className="mb-4">Drag and drop your file here or</p>
          <button type="button" className="upload-button btn text-base">
            Upload a file
          </button>
        </label>

        <div className="flex flex-col">
          <Button type="submit" title="Import" />
          <Button type="button" title="Cancel" />
        </div>
      </form>
    </Modal>
  );
};

export default ImportModal;
