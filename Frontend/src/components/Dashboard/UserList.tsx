import { FC } from "react";
import { ProfileInterface } from "../../interfaces";
import { useNavigate } from "react-router-dom";

interface UserListProps {
  profile: ProfileInterface;
}

const UserList: FC<UserListProps> = ({ profile }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full py-3 px-4 my-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 shadow-md select-none border-[1px] border-neutral-100 dark:border-neutral-800">
      <div className="grid grid-cols-6 items-center gap-4 text-neutral-800 dark:text-neutral-200 text-sm sm:text-base">
        {/* Name */}
        <div className="sm:text-base text-sm sm:col-span-2 col-span-2 font-medium">
          {profile?.firstName} {profile?.lastName}
        </div>

        {/* Role */}
        <div className=" sm:text-base text-sm hidden sm:block text-center font-semibold">
          {profile?.role}
        </div>

        {/* Status */}
        <div className="text-center sm:col-span-1 col-span-1 w-full flex justify-center">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
              profile?.status === "ACTIVE"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}
          >
            {profile?.status}
          </span>
        </div>

        {/* Department */}
        <div className="hidden sm:block text-center sm:text-base text-sm">
          {profile?.department}
        </div>

        {/* Action */}
        <div className="w-full text-center sm:col-span-1 col-span-3 m-auto flex justify-end ">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-500 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-600 text-xs sm:text-sm"
            onClick={() =>
              navigate("/dashboard/user-management/" + profile._id)
            }
          >
            Check More
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
