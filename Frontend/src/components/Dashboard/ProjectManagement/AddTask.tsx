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
import { Menu, Transition } from "@headlessui/react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

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
  const [users, setUsers] = useState<{ username: string; _id: string }[]>([]);
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  // Watch the assignee field
  const assignee = watch("assignee");

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormData> = async (payload) => {
    requestHandler(
      async () => await addTaskRequest(project?._id || "", payload),
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
                  <Menu as="div" className="relative w-full">
                    <Menu.Button as={Button} severity="secondary" type="button">
                      {assignee
                        ? users.find((user) => user._id === assignee)
                            ?.username || "Select Assignee"
                        : "Select Assignee"}
                      <MdKeyboardDoubleArrowDown
                        className="ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute z-10 right-0 mt-2 w-full origin-top-right bg-neutral-200 dark:bg-neutral-700 divide-y divide-neutral-100 dark:divide-neutral-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {users.map((user) => (
                          <Menu.Item key={user._id}>
                            {({ active }) => (
                              <button
                                className={`${
                                  active && "bg-[#118a7e67]"
                                } group flex items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200`}
                                type="button"
                                onClick={() => setValue("assignee", user._id)}
                              >
                                {user.username}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
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
