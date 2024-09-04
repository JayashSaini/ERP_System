import { useEffect, useState } from "react";
import { ProjectInterface } from "../../../interfaces";
import { useNavigate } from "react-router-dom";
import { calculateDaysBetween } from "../../../util";

interface HorizontalCardProps {
  data: ProjectInterface;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ data }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640); // Tailwind's 'sm' breakpoint is 640px
  const subtitle = data.projectHeading;
  const maxLength = isSmallScreen ? 50 : 100; // Adjust the length based on screen size
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className="w-full flex px-5 py-6 gap-2 cursor-pointer dark:bg-[#2222228f] bg-neutral-200 duration-100 ease-linear select-none rounded-md"
        onClick={() => {
          navigate("/dashboard/project-management/" + data?._id);
        }}
      >
        <div className="w-[30%] sm:h-[180px] h-[120px] overflow-hidden ">
          <img
            src={data.projectImage.url}
            alt="thumbnail"
            className="h-full w-full object-cover rounded-md"
          />
        </div>
        <div className="w-[70%] text-white">
          <h2 className=" dark:text-neutral-200 text-neutral-800 custom-font2 sm:text-2xl text-xl  font-bold">
            {data.projectName}
          </h2>
          <p className="text-sm font-light dark:text-neutral-300 text-neutral-800 ">
            Days &nbsp;
            {calculateDaysBetween(data.dateOfInitiation, data.closureDate)}
          </p>
          <h3 className="poppins sm:text-[17px] dark:text-neutral-300 text-neutral-700  text-sm font-medium sm:mt-1">
            {subtitle.slice(0, maxLength)}
            {subtitle.length > maxLength ? "..." : ""}
          </h3>
        </div>
      </div>
      <hr className=" dark:border-neutral-800 border-neutral-200" />
    </>
  );
};

export default HorizontalCard;
