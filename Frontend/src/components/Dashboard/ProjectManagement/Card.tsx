import React from "react";
import { ProjectInterface } from "../../../interfaces";
import { useNavigate } from "react-router-dom";
import { calculateDaysBetween } from "../../../util";

interface CardProps {
  data: ProjectInterface;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="sm:w-[320px] w-[270px] dark:bg-[#2222228f] bg-neutral-200 sm:h-[330px] h-[290px] inline-block border-[1px] dark:border-neutral-700 border-neutral-300 px-4 py-7 rounded-md cursor-pointer select-none "
      onClick={() => {
        navigate("/dashboard/project-management/" + data?._id);
      }}
    >
      <div className="w-full sm:h-52 h-40 overflow-hidden cursor-pointer rounded-md">
        <img
          src={data.projectImage?.url}
          alt="react"
          className="w-full h-full hover:scale-105 duration-200 ease-in-out rounded-md"
        />
      </div>
      <div className="mt-2">
        <h3 className="custom-font2  text-base  w-[90%] font-semibold">
          {data.projectHeading.slice(0, 55)}
          {data.projectHeading.length > 55 ? "..." : ""}
        </h3>
        <p className="text-sm font-light dark:text-neutral-300 text-neutral-700 ">
          Days &nbsp;
          {calculateDaysBetween(data.dateOfInitiation, data.closureDate)}
        </p>
      </div>
    </div>
  );
};

export default Card;
