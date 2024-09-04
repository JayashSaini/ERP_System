import React from "react";
import { AccessDenied, UserList } from "../../../components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import {
  requestHandler,
  sortProfilesByDepartment,
  sortProfilesByRole,
} from "../../../util";
import { getAllProfiles } from "../../../api";
import { toast } from "sonner";
import { Loader } from "../../../components";
import { ProfileInterface } from "../../../interfaces";
import { useAppSelector } from "../../../hooks/UseAppSelector";
import * as XLSX from "xlsx";

const UserManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);

  // sort & filter
  const [sortType, setSortType] = useState("role");
  const role = useAppSelector((state) => state.auth.user?.role);

  // filter tasks by status
  const sortAndFilterHandler = (sortType: string) => {
    setProfiles((prev) => {
      let sortedProfiles = [...prev]; // Create a copy of the profiles array to avoid mutating state directly

      switch (sortType) {
        case "role":
          sortedProfiles = sortProfilesByRole(sortedProfiles);
          break;
        case "department":
          sortedProfiles = sortProfilesByDepartment(sortedProfiles);
          break;
        case "nameAsc":
          sortedProfiles.sort((a: any, b: any) =>
            a.firstName.localeCompare(b.firstName)
          );
          break;
        case "nameDesc":
          sortedProfiles.sort((a: any, b: any) =>
            b.firstName.localeCompare(a.firstName)
          );
          break;
        case "statusActive":
          sortedProfiles.sort((a: any) => (a.status === "ACTIVE" ? -1 : 1));
          break;
        case "statusInactive":
          sortedProfiles.sort((a: any) => (a.status === "INACTIVE" ? -1 : 1));
          break;
        default:
          // Handle default case or do nothing if needed
          break;
      }

      return sortedProfiles; // Return the sorted profiles array
    });
  };

  useEffect(() => {
    requestHandler(
      async () => getAllProfiles(),
      setIsLoading,
      ({ data }) => {
        setProfiles(data);
      },
      (e) => toast.error(e)
    );
  }, []);

  if (!(role == "ADMIN" || role == "HR")) {
    return <AccessDenied />;
  }
  const spreadsheetHandler = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert JSON data to worksheet
    const ws = XLSX.utils.json_to_sheet(profiles);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Profiles");

    // Generate buffer and download
    XLSX.writeFile(wb, "profiles.xlsx");
  };
  return isLoading ? (
    <Loader />
  ) : (
    <div className="sm:p-5 px-2 select-none">
      <div className="w-full py-2 flex items-end justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger className="uppercase sm:text-base text-sm custom-font rounded-md dark:text-neutral-200 text-neutral-900 focus:outline-none">
            Sort & Filter
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 dark:bg-neutral-900 bg-neutral-200 text-neutral-900 dark:text-neutral-200">
            <DropdownMenuLabel>Sort & Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={sortType}
              onValueChange={(e) => {
                setSortType(e);
                sortAndFilterHandler(e);
              }}
              className="dark:bg-neutral-800 bg-neutral-100 text-neutral-900 dark:text-neutral-200"
            >
              <DropdownMenuRadioItem value="role">Role</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="department">
                Department
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="nameAsc">
                Name: A-Z
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="nameDesc">
                Name: Z-A
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="statusActive">
                Status: Active
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="statusInactive">
                Status: Inactive
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          className="button dark:text-neutral-200 text-neutral-700 hover:text-white"
          onClick={spreadsheetHandler}
        >
          SPREADSHEET
        </button>
      </div>
      {/* User List */}
      <div className="sm:py-12 py-5">
        <div className="grid grid-cols-6 items-center gap-4 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
          {/* Name */}
          <div className="sm:col-span-2 col-span-2 ">Name</div>

          {/* Role */}
          <div className="hidden sm:block text-center">Role</div>

          {/* Status */}
          <div className="text-center sm:col-span-1 col-span-1 w-full flex justify-center">
            Status
          </div>

          {/* Department */}
          <div className="hidden sm:block text-center">Department</div>

          {/* Action */}
          <div className="w-full text-center sm:col-span-1 col-span-3 m-auto flex justify-end "></div>
        </div>
        {profiles.map((profile) => (
          <UserList key={profile._id} profile={profile} />
        ))}
      </div>
    </div>
  );
};
export default UserManagement;
