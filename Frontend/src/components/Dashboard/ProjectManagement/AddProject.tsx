import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../../Button";
import Input from "../../Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProjectSchema } from "../../../util/schema";
import { requestHandler } from "../../../util";
import { addProjectRequest } from "../../../api";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Interface for component props
interface ModelProps {
  open: boolean;
  handleClose: () => void;
}

// Interface for form data
interface FormData {
  projectName: string;
  projectHeading: string;
  projectManager: string;
  projectImage?: File | null;
}

const Model: React.FC<ModelProps> = ({ open, handleClose }) => {
  // Setting up React Hook Form
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(addProjectSchema),
    defaultValues: {
      projectName: "",
      projectHeading: "",
      projectManager: "",
      projectImage: null,
    },
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("projectName", data.projectName);
    formData.append("projectHeading", data.projectHeading);
    formData.append("projectManager", data.projectManager);

    if (!data.projectImage) {
      toast.error("Please select a project image");
      return;
    }
    formData.append("projectImage", data.projectImage);

    requestHandler(
      async () => await addProjectRequest(formData),
      setIsLoading,
      ({ data }) => {
        toast.success("Project created successfully!");
        navigate("/dashboard/project-management/" + data._id);
        reset();
      },
      (err) => toast.error(err)
    );
  };

  // Watch the projectImage field
  const projectImage = watch("projectImage");

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className="w-full h-screen bg-transparent flex items-center justify-center px-2 ">
          <div className="sm:w-[550px] w-full  h-auto dark:bg-neutral-800 bg-neutral-300 p-6 rounded-lg dark:text-neutral-200 text-neutral-800">
            <div className="w-full px-2 flex items-center justify-between">
              <h1 className="sm:text-xl text-lg font-bold mb-4">
                Create Project
              </h1>
              <IoClose
                className="text-xl cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col space-y-4"
            >
              <div className="w-full">
                <Input
                  placeholder="Project Name"
                  type="text"
                  {...register("projectName")}
                  required
                />
                {errors.projectName && (
                  <p className="text-red-500">{errors.projectName.message}</p>
                )}
              </div>
              <div className="w-full">
                <Input
                  placeholder="Heading"
                  type="text"
                  {...register("projectHeading")}
                  required
                />
                {errors.projectHeading && (
                  <p className="text-red-500">
                    {errors.projectHeading.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Input
                  placeholder="Project Manager"
                  type="text"
                  {...register("projectManager")}
                  required
                />
                {errors.projectManager && (
                  <p className="text-red-500">
                    {errors.projectManager.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  id="project-image-input"
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setValue("projectImage", file, { shouldValidate: true });
                  }}
                />
                <label
                  htmlFor="project-image-input"
                  className="bg-transparent  border-2 duration-200 ease-in font-semibold flex items-center justify-center disabled:bg-[#353535] disabled:border-[#d6d6d64f] disabled:text-gray-500 px-6 py-3 rounded-md  border-[rgb(17,138,126)]"
                >
                  {projectImage
                    ? `Selected: ${projectImage.name}`
                    : "Choose Project Image"}
                </label>
                {errors.projectImage && (
                  <p className="text-red-500">{errors.projectImage.message}</p>
                )}
              </div>
              <Button type="submit" isLoading={isLoading}>
                Create Project
              </Button>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default Model;
