import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FiEdit } from "react-icons/fi";
import Button from "../../Button";
import { TaskInterface } from "../../../interfaces";
import { useAppSelector } from "../../../hooks/UseAppSelector";
import { formatMongoDate } from "../../../util/index";

interface AccordionTransitionProps {
  task: TaskInterface;
  deleteHandler: () => void;
  updateTaskHandler: () => void;
  isDeleteLoading: boolean;
}

export default function AccordionTransition({
  task,
  deleteHandler: deleteTask,
  updateTaskHandler,
  isDeleteLoading,
}: AccordionTransitionProps) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(task.taskStatus);
  const isChangedAllowed = useAppSelector(
    (state) => state.project.isChangedAllowed
  );

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const storedTheme = localStorage.getItem("theme");

  useEffect(() => {
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, [storedTheme]);

  useEffect(() => {
    if (task.taskStatus !== status) {
      setStatus(task.taskStatus);
    }
  }, [task.taskStatus]);

  return (
    <Accordion
      expanded={expanded}
      onChange={handleExpansion}
      sx={{
        "& .MuiAccordionSummary-root": {
          backgroundColor: theme === "dark" ? "#262626" : "#d5d5d5",
          color: theme === "dark" ? "#d5d5d5" : "#262626",
          height: "55px",
        },
        "& .MuiAccordionDetails-root": {
          backgroundColor: theme === "dark" ? "#262626" : "#d5d5d5",
          color: theme === "dark" ? "#d5d5d5" : "#262626",
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon className="dark:text-[#d5d5d5] text-[#262626]" />
        }
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="font-medium w-full flex justify-between items-center px-2">
          {task.taskName}
          <span
            className={`inline-block px-5 py-2 rounded-full text-xs font-semibold select-none ${
              status === "IN_PROGRESS"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : status === "COMPLETED"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                : "bg-red-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
            }`}
          >
            {status?.replace("_", " ")}
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="w-[100%] flex gap-3">
          <img
            className="h-12 w-12 rounded-full"
            src={
              task.assignee.avatar?.url ||
              "https://res.cloudinary.com/dcvb5vgyf/image/upload/c_scale,h_500,w_500/oysy3d5lzxjzjp8am3bi.jpg"
            }
            alt="avatar"
          />
          <div className="w-full">
            <div className="flex gap-1 items-center justify-start">
              <p className="sm:text-base text-sm font-bold">
                {task.assignee.username}
              </p>
              <p className="sm:text-sm text-xs dark:text-[#c4c4c4] text-[#313131] ">
                {formatMongoDate(task.updatedAt)}
              </p>
            </div>
            <div className="w-full flex ">
              <p className="text-[14px] w-full break-words whitespace-pre-line">
                {task.assignee.email}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full my-5">
          <p>
            <span className="dark:text-[#d5d5d5] text-[#262626] font-medium">
              Description{" "}
            </span>
            {task.taskDescription}
          </p>
        </div>
        <div className="flex sm:flex-row flex-col justify-between w-full sm:items-end items-start mt-4 gap-2">
          <div className="flex gap-2 items-center">
            <div
              className="flex items-center justify-center gap-1 cursor-pointer"
              onClick={updateTaskHandler}
            >
              <FiEdit />
              <span className="dark:text-[#d5d5d5] text-[#262626] text-sm cursor-pointer select-none hover:underline">
                Edit
              </span>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-2 sm:items-end">
            <div>
              <Button
                isLoading={isDeleteLoading}
                size="small"
                onClick={deleteTask}
                disabled={!isChangedAllowed}
              >
                Delete Task
              </Button>
            </div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
