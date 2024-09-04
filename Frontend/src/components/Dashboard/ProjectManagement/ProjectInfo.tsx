import React, { useState, useEffect } from "react";
import { SecondaryInput } from "../../../components";
import { formatMongoDateToInput, requestHandler } from "../../../util/index";
import { InputList } from "../../../interfaces";
import Model from "./UpdateProjectInfo";
import { useAppSelector } from "../../../hooks/UseAppSelector";
import { Menu, Transition } from "@headlessui/react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { ProjectStatusEnum } from "../../../constants";
import { setProjectStatusRequest } from "../../../api";
import { updateProject } from "../../../redux/slices/project.slice";
import { toast } from "sonner";
import Loader from "../../Loader";
import { useAppDispatch } from "../../../hooks/UseAppDispatch";

const ProjectInfo: React.FC = () => {
  const { project, isChangedAllowed } = useAppSelector(
    (state) => state.project
  );
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [projectInfoList, setProjectInfoList] = useState<InputList[]>([]);
  const [open, setOpen] = useState(false);
  const [projectStatus, setProjectStatus] = useState<string>("");
  const [inputData, setInputData] = useState<InputList>({
    label: "",
    value: "",
    type: "text",
    apiName: "clientName",
  });

  useEffect(() => {
    if (project) {
      setProjectStatus(project?.projectStatus);
      setProjectInfoList([
        {
          value: project.clientName || "",
          apiName: "clientName",
          type: "text",
          label: "Client Name",
        },
        {
          value: project.clientNumber,
          apiName: "clientNumber",
          type: "number",
          label: "Client Number",
        },
        {
          value: project.projectAmount,
          apiName: "projectAmount",
          type: "number",
          label: "Project Amount",
        },
        {
          value: project.paymentReceived,
          apiName: "paymentReceived",
          type: "number",
          label: "Payment Received",
        },
        {
          value: project.paymentDue,
          apiName: "paymentDue",
          type: "number",
          label: "Payment Due",
        },
        {
          value: project.outstandingPayment,
          apiName: "outstandingPayment",
          type: "number",
          label: "Outstanding Payment",
        },
        {
          value: project.dateOfInitiation,
          apiName: "dateOfInitiation",
          type: "date",
          label: "Date of Initiation",
        },
        {
          value: project.closureDate,
          apiName: "closureDate",
          type: "date",
          label: "Closure Date",
        },
      ]);
    }
  }, [project]); // Dependency array: runs when 'project' changes

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStatusChange = (projectId: string, s: string) => {
    requestHandler(
      async () => await setProjectStatusRequest(projectId, s),
      setIsLoading,
      () => {
        setProjectStatus(s);
        dispatch(updateProject({ projectStatus: s }));
      },
      (e) => toast.error(e)
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="sm:w-4/6 w-full dark:bg-neutral-900 bg-neutral-200 rounded-xl p-6">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl font-bold dark:text-neutral-200 text-neutral-800">
          Project Information
        </h3>
        <Menu as="div" className="relative">
          <Menu.Button
            className={`flex gap-1 items-center  px-4 py-2 rounded-full text-xs font-semibold select-none ${
              projectStatus === "IN_PROGRESS"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : projectStatus === "COMPLETED"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                : projectStatus === "ON_HOLD"
                ? "bg-red-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}
            disabled={!isChangedAllowed}
          >
            {projectStatus?.replace("_", " ") || "Change Status"}
            <MdKeyboardDoubleArrowDown
              className=" h-4 w-4"
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
            <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right bg-neutral-200 dark:bg-neutral-700 divide-y divide-neutral-100 dark:divide-neutral-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {ProjectStatusEnum.map((s) => (
                <Menu.Item key={s}>
                  {({ active }) => (
                    <button
                      onClick={() => handleStatusChange(project?._id || "", s)}
                      className={`${
                        active || s === status ? "bg-[#118a7e67]" : ""
                      } group flex items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200`}
                    >
                      {s.replace("_", " ")}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <hr className="dark:border-neutral-600 border-neutral-400 my-2" />
      <div className="sm:text-base text-sm space-y-1">
        {projectInfoList.map((item: InputList, idx) => (
          <div key={idx} className="w-full flex sm:flex-row flex-col items-end">
            <div className="sm:w-1/2 text-base w-full dark:text-neutral-200 text-neutral-800">
              {item.label}:
            </div>
            <SecondaryInput
              type={item.type}
              className="sm:w-1/2 w-full"
              value={
                item.type === "date"
                  ? formatMongoDateToInput(String(item.value))
                  : item.value
              }
              handleEditClick={() => {
                setInputData(item);
                handleOpen();
              }}
              InputProps={{
                readOnly: true,
              }}
              disabled={!isChangedAllowed}
            />
          </div>
        ))}
      </div>
      <Model open={open} handleClose={handleClose} inputData={inputData} />
    </div>
  );
};

export default ProjectInfo;
