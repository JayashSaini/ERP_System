import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../../Button";
import Input from "../../Input";
import { InputList } from "../../../interfaces";
import { requestHandler } from "../../../util";
import { useAppDispatch } from "../../../hooks/UseAppDispatch";
import { updateProject } from "../../../redux/slices/project.slice";
import { updateProjectRequest } from "../../../api";
import { useAppSelector } from "../../../hooks/UseAppSelector";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";

interface ModelProps {
  open: boolean;
  handleClose: () => void;
  inputData: InputList;
}

const Model: React.FC<ModelProps> = ({ open, handleClose, inputData }) => {
  const [value, setValue] = React.useState(inputData.value);
  const dispatch = useAppDispatch();
  const projectId = useAppSelector((state) => state.project.project?._id);
  const [isLoading, setIsLoading] = React.useState(false);

  const SaveHandler = () => {
    if (!projectId) return null;
    const key = inputData.apiName;
    const payload = {
      [key]: value,
    };
    requestHandler(
      async () => updateProjectRequest(projectId || "", payload),
      setIsLoading,
      ({ data }) => {
        dispatch(updateProject(payload));
        toast.success(`${inputData.label} updated successfully!`);
        handleClose();
      },
      (err: any) => {
        toast.error(err);
      }
    );
  };

  React.useEffect(() => {
    setValue(inputData.value);
  }, [inputData]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="w-full h-screen bg-transparent flex items-center justify-center px-2 ">
            <div className="sm:w-[550px] w-full  h-auto dark:bg-neutral-800 bg-neutral-300 p-6 rounded-lg dark:text-neutral-200 text-neutral-800">
              {" "}
              <div className="w-full px-2 flex items-center justify-between">
                <h1 className="sm:text-xl text-lg font-bold mb-4">
                  {inputData.label}
                </h1>
                <IoClose
                  className="text-xl cursor-pointer"
                  onClick={handleClose}
                />
              </div>{" "}
              <div className="space-y-3">
                <Input
                  type={inputData.type}
                  required={true}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={SaveHandler} isLoading={isLoading}>
                  Save Info
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Model;
