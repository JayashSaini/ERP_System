import { UserList } from "../../../components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useState } from "react";

const UserManagement = () => {
  // sort & filter
  const [sortType, setSortType] = useState("all");

  // filter tasks by status
  const sortAndFilterHandler = (sortType: string) => {
    console.log("sortType: ", sortType);
  };

  return (
    <div className="sm:p-5 px-2 select-none">
      <div className="w-full py-2 flex items-end justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger className="uppercase sm:text-base text-sm custom-font rounded-md dark:text-neutral-200 text-neutral-900">
            Sort & Filter
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 dark:bg-neutral-800 bg-neutral-200 text-neutral-900 dark:text-neutral-200">
            <DropdownMenuLabel>Sort & Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={sortType}
              onValueChange={(e) => {
                setSortType(e);
                sortAndFilterHandler(e);
              }}
              className="dark:bg-neutral-900 bg-neutral-100  text-neutral-900 dark:text-neutral-200"
            >
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="newest">
                Newest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">
                Oldest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="activeTask">
                Active Task
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="completedTask">
                Completed Task
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <button className="button dark:text-neutral-200 text-neutral-700 hover:text-white">
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
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
      </div>
    </div>
  );
};
export default UserManagement;
