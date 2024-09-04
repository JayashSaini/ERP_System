import React, { useState, useEffect } from "react";
import { Button } from "../../../components";
import { FaPlus } from "react-icons/fa";
import Model from "./AddTask";
import UpdateModel from "./UpdateTask";
import { requestHandler } from "../../../util";
import { TaskInterface } from "../../../interfaces";
import { useAppSelector } from "../../../hooks/UseAppSelector";
import { toast } from "sonner";
import { deleteTaskRequest } from "../../../api";
import Accordion from "./Accordion";
import { useAppDispatch } from "../../../hooks/UseAppDispatch";
import {
  updateAllTasks,
  setTaskToUpdate,
  clearTaskToUpdate,
} from "../../../redux/slices/project.slice";

const TaskManager: React.FC = () => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);

  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const { isChangedAllowed, project } = useAppSelector(
    (state) => state.project
  );
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);

  const updateTaskHandler = async (task: TaskInterface) => {
    dispatch(setTaskToUpdate(task));
    setOpenUpdateModel(true);
  };

  // get user tasks from the database
  useEffect(() => {
    if (project) setTasks(project.tasks);
  }, [project]);

  // delete task handler
  const deletedTaskHandler = async (taskId: string) => {
    await requestHandler(
      async () => await deleteTaskRequest(project?._id, taskId),
      setIsDeleteLoading,
      () => {
        const updatedTasks = tasks.filter((task: any) => task._id !== taskId);
        setTasks(updatedTasks);
        dispatch(updateAllTasks(updatedTasks));
        toast.success("Task deleted successfully");
      },
      (message: string) => {
        toast.error(message);
      } // Display error alerts on request failure
    );
  };

  return (
    <div className="w-full  dark:bg-neutral-900 bg-neutral-200 rounded-xl sm:p-6 p-2 ">
      <div className="w-full flex justify-between items-center">
        <h3 className="sm:text-xl text-lg font-bold dark:text-neutral-200 text-neutral-800">
          Task Management
        </h3>
        <div>
          <Button
            size="small"
            severity="secondary"
            onClick={handleOpen}
            disabled={!isChangedAllowed}
          >
            <FaPlus /> &nbsp; Add Task
          </Button>
        </div>
      </div>
      <div className="w-full  space-y-2 h-[350px] overflow-y-auto border-[1px] dark:border-neutral-700 border-neutral-400 rounded-xl sm:px-4 px-2 sm:py-6 py-4 sm:mt-5 mt-3">
        {tasks.length > 0 ? (
          tasks.map((task: TaskInterface) => {
            return (
              <div key={task._id} className="bg-[#1a2639] my-2">
                <Accordion
                  task={task}
                  deleteHandler={async () => {
                    await deletedTaskHandler(task._id);
                  }}
                  updateTaskHandler={() => {
                    if (!isChangedAllowed) {
                      return toast.error(
                        "You don't have permission to do this."
                      );
                    }
                    updateTaskHandler(task);
                  }}
                  isDeleteLoading={isDeleteLoading}
                />
              </div>
            );
          })
        ) : (
          <div className="w-full h-[350px] flex items-center justify-center">
            {" "}
            No task here
          </div>
        )}
      </div>

      <Model data={{ open, handleClose: () => setOpen(false) }} />
      <UpdateModel
        data={{
          open: openUpdateModel,
          handleClose: () => {
            setOpenUpdateModel(false);
            dispatch(clearTaskToUpdate());
          },
        }}
      />
    </div>
  );
};

export default TaskManager;
