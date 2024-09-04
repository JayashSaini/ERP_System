import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../../Button";
import { FaPlus } from "react-icons/fa";
import { AddProject } from "../..";
import { useAppSelector } from "../../../hooks/UseAppSelector";
import { useAppDispatch } from "../../../hooks/UseAppDispatch";
import { setIsChangeAllowed } from "../../../redux/slices/project.slice";

const PM_Header: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const user = useAppSelector((state) => state.auth.user);
  const IsChangeAllowed = useAppSelector(
    (state) => state.project.isChangedAllowed
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const searchHandler = () => {
    if (query.trim() === "") {
      toast.error("Please enter a search query");
    } else {
      navigate(
        "/dashboard/project-management/list?show=search-results&query=" + query
      );
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN" || user.role === "PROJECT_MANAGER") {
        dispatch(setIsChangeAllowed(true));
      }
    }
  }, [user]);

  return (
    <div className="w-full py-3  px-2 flex justify-between items-center ">
      <div className="group relative sm:w-[300px] w-full border-[1px] border-neutral-400 dark:border-neutral-900 rounded-sm">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="search-icon fill-neutral-600 dark:fill-neutral-400"
          onClick={searchHandler}
        >
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>

        <input
          id="query"
          className="input pl-10 w-full dark:bg-neutral-900 bg-neutral-100 text-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 placeholder-neutral-500 focus:outline-none"
          type="search"
          placeholder="Search..."
          name="searchbar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            WebkitAppearance: "none",
            colorScheme: "dark", // This ensures the clear button uses the dark theme colors
          }}
        />
      </div>
      <div>
        <Button
          size="small"
          severity="secondary"
          onClick={() => {
            if (!IsChangeAllowed) {
              return toast.error("You don't have permission to add Project.");
            }
            handleOpen();
          }}
        >
          <FaPlus /> &nbsp; Add Project
        </Button>
      </div>
      <AddProject open={open} handleClose={handleClose} />
    </div>
  );
};

export default PM_Header;
