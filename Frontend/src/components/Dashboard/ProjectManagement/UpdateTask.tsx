import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../../Button";
import Input from "../../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  updateTaskRequest,
  getAllUsernamesRequest,
  setTaskStatusRequest,
  updateAssigneeToTaskRequest,
} from "../../../api/index";
import { Menu, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { TaskStatusEnum } from "../../../constants";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "../../../hooks/UseAppSelector";
import { requestHandler } from "../../../util";
import { toast } from "sonner";
import { useAppDispatch } from "../../../hooks/UseAppDispatch";
import {
  clearTaskToUpdate,
  updateTask,
  updateTaskStatus,
  updateTaskAssignee,
} from "../../../redux/slices/project.slice";

// Interface for form data
interface FormData {
  taskName: string;
  taskDescription: string;
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
  const [isTaskStatusLoading, setIsTaskStatusLoading] = useState(false);
  const [isAssigneeLoading, setIsAssigneeLoading] = useState(false);

  const { project, taskToUpdate } = useAppSelector((state) => state.project);
  const [taskStatus, setTaskStatus] = useState(taskToUpdate?.taskStatus);
  const [assignee, setAssignee] = useState(taskToUpdate?.assignee);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (taskToUpdate) {
      setTaskStatus(taskToUpdate.taskStatus);
      setAssignee(taskToUpdate.assignee);
      reset({
        taskName: taskToUpdate.taskName,
        taskDescription: taskToUpdate.taskDescription,
      });
    }
  }, [taskToUpdate, reset]);

  const onSubmit: SubmitHandler<FormData> = async (payload) => {
    requestHandler(
      async () =>
        await updateTaskRequest(
          project?._id || "",
          taskToUpdate?._id || "",
          payload
        ),
      setIsLoading,
      ({ data: project }) => {
        dispatch(
          updateTask({ taskId: taskToUpdate?._id || "", task: project.task })
        );
        dispatch(clearTaskToUpdate());
        reset();
        data.handleClose();
        toast.success("Task updated successfully!");
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

  const handleStatusChange = (status: any) => {
    requestHandler(
      async () =>
        await setTaskStatusRequest(
          project?._id || "",
          taskToUpdate?._id || "",
          status
        ),
      setIsTaskStatusLoading,
      () => {
        setTaskStatus(status);
        dispatch(
          updateTaskStatus({
            taskId: taskToUpdate?._id || "",
            taskStatus: status,
          })
        );
        toast.success("Task status updated successfully!");
      },
      (e) => toast.error(e)
    );
  };

  const handleAssigneeChange = (assigneeId: any) => {
    requestHandler(
      async () =>
        await updateAssigneeToTaskRequest(
          project?._id || "",
          taskToUpdate?._id || "",
          assigneeId
        ),
      setIsAssigneeLoading,
      ({ data }) => {
        setAssignee(data.assignee);
        dispatch(
          updateTaskAssignee({
            taskId: taskToUpdate?._id || "",
            assignee: data.assignee,
          })
        );
        toast.success("Task status updated successfully!");
      },
      (e) => toast.error(e)
    );
  };

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
              <h1 className="sm:text-xl text-lg font-bold mb-4">Update Task</h1>
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
                    {...register("taskName", {
                      required: "Task name is required",
                    })}
                  />
                  {errors.taskName && (
                    <p className="text-red-500">{errors.taskName.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Task Description here..."
                    type="text"
                    {...register("taskDescription", {
                      required: "Task description is required",
                    })}
                  />
                  {errors.taskDescription && (
                    <p className="text-red-500">
                      {errors.taskDescription.message}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Menu as="div" className="relative w-full">
                    <Menu.Button
                      as={Button}
                      severity="secondary"
                      type="button"
                      isLoading={isAssigneeLoading} // If you have a loading state for the assignee list
                    >
                      {assignee?.username || "Select Assignee"}
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
                                onClick={() => handleAssigneeChange(user._id)}
                                className={`${
                                  active || user._id === assignee?._id
                                    ? "bg-[#118a7e67]"
                                    : ""
                                } group flex items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200`}
                                type="button"
                              >
                                {user.username}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Menu as="div" className="relative w-full">
                    <Menu.Button
                      as={Button}
                      severity="secondary"
                      type="button"
                      isLoading={isTaskStatusLoading}
                    >
                      {taskStatus?.replace("_", " ") || "Change Status"}
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
                      <MenuItems className="absolute z-10 right-0 mt-2 w-56 origin-top-right bg-neutral-200 dark:bg-neutral-700 divide-y divide-neutral-100 dark:divide-neutral-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {TaskStatusEnum.map((s) => (
                          <MenuItem key={s}>
                            {({ active }) => (
                              <button
                                onClick={() => handleStatusChange(s)}
                                className={`${
                                  active || s === taskStatus
                                    ? "bg-[#118a7e67]"
                                    : ""
                                } group flex items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200`}
                                type="button"
                              >
                                {s.replace("_", " ")}
                              </button>
                            )}
                          </MenuItem>
                        ))}
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
                <Button isLoading={isLoading}>Save Task</Button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default Model;
