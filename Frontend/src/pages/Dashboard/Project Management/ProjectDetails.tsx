import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { requestHandler } from "../../../util";
import { getProjectByIdRequest, updateLogoRequest } from "../../../api";
import { toast } from "sonner";
import { DonutChart, Loader, TaskManager } from "../../../components";
import { IconCamera } from "@tabler/icons-react";
import AvatarEditor from "react-avatar-editor";
import { Button, ProjectInfo } from "../../../components";
import { TailSpin } from "react-loader-spinner";
import { useAppSelector } from "../../../hooks/UseAppSelector";
import { useAppDispatch } from "../../../hooks/UseAppDispatch";
import { setProject } from "../../../redux/slices/project.slice";
import { setIsChangeAllowed } from "../../../redux/slices/project.slice";

const ProjectDetails = () => {
  const [loader, setLoader] = useState(true);
  const [logoLoading, setLogoLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const project = useAppSelector((state) => state.project.project);
  const dispatch = useAppDispatch();

  const { projectId } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const IsChangeAllowed = useAppSelector(
    (state) => state.project.isChangedAllowed
  );

  useEffect(() => {
    requestHandler(
      async () => await getProjectByIdRequest(projectId || ""),
      setLoader,
      ({ data }) => {
        dispatch(setProject(data));
      },
      () => {
        toast.error("Project Not Found");
        navigate("/dashboard/project-management");
      }
    );
  }, []);

  const logoHandler = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      canvas.toBlob(async (blob: Blob | null) => {
        if (blob) {
          const formData = new FormData();
          formData.append("projectLogo", blob, "projectLogo.png");

          requestHandler(
            async () => updateLogoRequest(project?._id || "", formData),
            setLogoLoading,
            ({ data }) => {
              dispatch(setProject(data));
              toast.success("projectLogo updated successfully!");
              setShowEditor(false);
            },
            (err: any) => {
              toast.error(err);
            }
          );
        }
      });
    }
  };

  const onLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setShowEditor(true);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN" || user.role === "PROJECT_MANAGER") {
        dispatch(setIsChangeAllowed(true));
      }
    }
  }, [user]);

  return loader ? (
    <Loader />
  ) : (
    <div className="sm:p-5 p-2 w-full min-h-screen h-auto dark:text-neutral-200 text-neutral-700">
      <div>
        {/* Project Header */}
        <div className="w-full text-white  custom-hero-bg rounded-lg sm:px-5 sm:py-12 px-2 py-5 flex gap-3 sm:flex-row flex-col">
          <div>
            <div className="sm:w-[90px] sm:h-[90px] w-[50px] h-[50px] rounded-full relative cursor-pointer overflow-hidden mb-3 group">
              {project?.projectLogo ? (
                <img
                  src={project.projectLogo.url}
                  alt="Project Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center dark:bg-neutral-400 bg-neutral-200">
                  <IconCamera size={30} className="text-white" />
                </div>
              )}
              <div className="w-full h-full absolute top-0 left-0 bg-[#00000073] flex items-center justify-center opacity-0 group-hover:opacity-100 duration-150 ease-in-out">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={onLogoChange}
                  accept="image/*"
                  disabled={!IsChangeAllowed}
                />
                <IconCamera size={30} className="text-white" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="sm:text-3xl text-2xl poppins font-semibold ">
              {project?.projectName}
            </h1>
            <p className="sm:text-lg text-base poppins font-light mt-1">
              {project?.projectHeading}
            </p>
            <p className="sm:text-base text-sm poppins font-medium">
              Project Manager :{" "}
              <span className="font-bold text-neutral-200 ">
                {project?.projectManager}
              </span>
            </p>
          </div>
        </div>

        {/* Second Section  */}
        <div className="w-full   rounded-lg flex gap-3 sm:flex-row flex-col my-5 justify-end">
          <ProjectInfo />
          <div className="sm:w-2/6 w-full  dark:bg-neutral-900 bg-neutral-200 sm:p-5 p-1 rounded-xl">
            <DonutChart />
          </div>
        </div>

        {/* TasK Manager  */}
        <TaskManager />
      </div>

      {showEditor && image && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-neutral-900 border-neutral-500 border-2 px-4 py-6 rounded-md">
            <AvatarEditor
              ref={(ref) => setEditor(ref)}
              image={image}
              width={200}
              height={200}
              border={50}
              color={[0, 0, 0, 0.6]} // RGBA
              scale={scale} // Updated to use state value for scale
            />
            {/* Scale Slider */}
            <div className="w-full">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full mt-2 fill-[#118a7e]"
              />
            </div>
            <div className="w-full flex justify-between gap-2 md:flex-row flex-col">
              <div className="w-full flex justify-between gap-2 mt-4">
                <Button
                  onClick={() => setShowEditor(false)}
                  severity="secondary"
                >
                  Cancel
                </Button>
                <Button onClick={logoHandler} disabled={logoLoading}>
                  {logoLoading ? (
                    <TailSpin
                      visible={true}
                      height="27"
                      width="27"
                      color="#fff"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Save Logo"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 66d03970d71910f2d3a85a13
export default ProjectDetails;
