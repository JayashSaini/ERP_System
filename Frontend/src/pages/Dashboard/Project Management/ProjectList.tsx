import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HorizontalCard, Loader, PM_Header } from "../../../components";
import {
  getAllProjectRequest,
  getProjectsBySearchQueryRequest,
} from "../../../api";
import { ProjectInterface } from "../../../interfaces";
import { toast } from "sonner";
import { requestHandler } from "../../../util";

const ProjectList: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showParam = queryParams.get("show");
  const query = queryParams.get("query");
  const [project, setProject] = useState<ProjectInterface[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      if (showParam === "ongoing-projects") {
        return await getAllProjectRequest(1, 100, "ongoing-projects");
      } else if (showParam == "search-results") {
        return await getProjectsBySearchQueryRequest(query || "");
      } else {
        return await getAllProjectRequest(1, 100);
      }
    };

    requestHandler(
      fetchProject,
      setLoader,
      ({ data }) => {
        setProject(data.projects);
      },
      (errorMessage) => {
        toast.error(errorMessage || "Something went wrong");
        setProject([]);
      }
    );
  }, [query, showParam]);

  const label = convertToHumanReadable(showParam);
  return loader ? (
    <Loader />
  ) : (
    <div className="w-full min-h-screen h-auto">
      <PM_Header />
      <div className="text-white custom-hero-bg w-full sm:px-14 px-3 sm:py-16 py-12 custom-hero-secondary-bg ">
        <h1 className="custom-font2 sm:text-4xl text-3xl font-bold">{label}</h1>
      </div>
      <div className="p-3 max-w-screen-2xl m-auto">
        <p className=" md:px-8 px-2 text-base font-sans custom-font dark:text-neutral-300 text-neutral-700">
          <Link
            to="/dashboard/project-management"
            className="custom-color hover:underline"
          >
            Dashboard
          </Link>{" "}
          / {label}
        </p>

        <div className="my-8 mt-8 md:px-8 px-2">
          <h2 className="dark:text-neutral-200 text-neutral-800 sm:text-3xl text-2xl flex items-center justify-start gap-2 mb-1">
            Projects
            <span className="dark:text-white text-neutral-700 text-xs p-2 dark:bg-neutral-800 bg-neutral-300 rounded-full">
              {project.length < 10 ? "0" + project.length : project.length}{" "}
            </span>
          </h2>
          {project.length > 0 ? (
            <div className="w-full min-h-[600px] max-h-[1000px] border-[1px] rounded-xl mt-2 overflow-y-scroll ">
              {" "}
              {project.map((course) => (
                <div key={course._id}>
                  <HorizontalCard data={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="dark:text-neutral-200 text-neutral-800 w-full h-[600px] dark:border-neutral-700 border-neutral-300 border-[1px] rounded-md flex justify-center items-center ">
              {showParam == "search-results"
                ? "No search results found"
                : "No Project found"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Function to convert URL-friendly strings to human-readable format
const convertToHumanReadable = (param: string | null): string => {
  if (!param) return "All project"; // Default label if param is null

  // Convert hyphens to spaces and capitalize each word
  return param
    .replace(/-/g, " ") // Replace hyphens with spaces
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join words with spaces
};

export default ProjectList;
