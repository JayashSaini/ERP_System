import { CardSection, PM_Header } from "../../../components";
import { ProjectInterface } from "../../../interfaces";

import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import HorizontalCard from "../../../components/Dashboard/ProjectManagement/HorizontalCard";
import { useEffect, useState } from "react";
import { Loader } from "../../../components";
import { toast } from "sonner";
import { getAllProjectRequest } from "../../../api";
import { requestHandler } from "../../../util";
const ProjectManagement = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [ongoingProjects, setOngoingProjects] = useState<ProjectInterface[]>(
    []
  );

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    setLoading(true);
    await requestHandler(
      async () => await getAllProjectRequest(1, 100, "ongoing-projects"),
      null,
      ({ data }) => {
        setOngoingProjects(data.projects);
      },
      (errorMessage) => {
        toast.error(errorMessage || "Something went wrong");
        setProjects([]);
      }
    );
    await requestHandler(
      async () => await getAllProjectRequest(1, 100),
      null,
      ({ data }) => {
        setProjects(data.projects);
      },
      (errorMessage) => {
        toast.error(errorMessage || "Something went wrong");
        setProjects([]);
      }
    );
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full h-screen">
      <PM_Header />
      <div className="w-full sm:px-12 px-3 sm:py-14 py-12 custom-hero-bg text-white">
        <h1 className="custom-font text-xl font-light">Project Management</h1>
        <p className="poppins text-2xl font-semibold">
          Empower Your Projects with Precision.{" "}
        </p>
      </div>
      <div className=" m-auto py-8">
        {ongoingProjects.length > 0 && (
          <div className="w-full px-3 mb-3">
            <div className="w-full flex justify-between  items-center mb-2">
              <h2 className="dark:text-neutral-200 text-neutral-700 custom-font md:text-2xl text-xl font-semibold">
                Ongoing Projects
              </h2>
              <Link
                to="/dashboard/project-management/list?show=ongoing-projects"
                className="md:text-base text-sm   flex gap-1 items-center justify-start duration-200 ease-in-out group"
              >
                View All
                <FaLongArrowAltRight className=" transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
              </Link>
            </div>
            <HorizontalCard data={ongoingProjects[0]} />
          </div>
        )}
        {projects.length > 0 && (
          <CardSection label="Projects" Projects={projects} />
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;
