import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../../Button";
import Input from "../../Input";
import { addProjectTaskSchema } from "../../../util/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTaskRequest, getAllUsernamesRequest } from "../../../api/index";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "../../../hooks/UseAppSelector";
import { requestHandler } from "../../../util";
import { toast } from "sonner";
import { useAppDispatch } from "../../../hooks/UseAppDispatch";
import { setProject } from "../../../redux/slices/project.slice";

// Interface for form data
interface FormData {
  taskName: string;
  taskDescription: string;
  assignee: string;
}

interface ModelProps {
  data: {
    open: boolean;
    handleClose: () => void;
  };
}

const Model: React.FC<ModelProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<
    { username: string; _id: string; firstName: string }[]
  >([]);

  const project = useAppSelector((state) => state.project.project);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(addProjectTaskSchema),
    defaultValues: {
      taskName: "",
      taskDescription: "",
      assignee: "",
    },
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormData> = async (payload) => {
    requestHandler(
      async () => await addTaskRequest(project?._id, payload),
      setIsLoading,
      ({ data: project }) => {
        toast.success("Task added successfully!");
        dispatch(setProject(project));
        reset();
        data.handleClose(); // Call handleClose if it's a function
      },
      (e) => toast.error(e)
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsernamesRequest();
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Modal
      open={data.open}
      onClose={data.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className="w-full h-screen bg-transparent flex items-center justify-center px-2 ">
          <div className="sm:w-[550px] w-full h-auto dark:bg-neutral-800 bg-neutral-300 p-6 rounded-lg dark:text-neutral-200 text-neutral-800">
            <div className="w-full px-2 flex items-center justify-between">
              <h1 className="sm:text-xl text-lg font-bold mb-4">Add Task</h1>
              <IoClose
                className="text-xl cursor-pointer"
                onClick={data.handleClose}
              />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col space-y-4"
            >
              <div className="space-y-3">
                <div>
                  <Input
                    placeholder="Task name here..."
                    type="text"
                    required
                    {...register("taskName")}
                  />
                  {errors.taskName && (
                    <p className="text-red-500">{errors.taskName.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Task Description here..."
                    type="text"
                    required
                    {...register("taskDescription")}
                  />
                  {errors.taskDescription && (
                    <p className="text-red-500">
                      {errors.taskDescription.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <select
                    {...register("assignee")}
                    className="w-full bg-transparent hover:dark:border-[#fff] border-2 border-neutral-700 rounded-md dark:text-white text-gray-700 px-6 py-3 text-base cursor-pointer transition"
                    required
                  >
                    <option
                      value=""
                      className="dark:bg-black bg-white dark:text-white text-black"
                    >
                      Assign User
                    </option>
                    {users.map((user) => (
                      <option
                        key={user._id}
                        value={user._id}
                        className="dark:bg-black bg-white dark:text-white text-black"
                      >
                        {user.firstName} {user.username}
                      </option>
                    ))}
                  </select>
                  <div className="text-red-500">{errors.assignee?.message}</div>
                </div>

                <Button isLoading={isLoading}>Add Task</Button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default Model;
