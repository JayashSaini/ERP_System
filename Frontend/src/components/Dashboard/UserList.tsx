import { FC } from "react";

const UserList: FC = () => {
  const user = {
    _id: "12345",
    firstName: "John",
    lastName: "Doe",
    role: "ADMIN",
    userStatus: "Active",
    department: "IT",
  };

  return (
    <div className="w-full py-3 px-4 my-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 shadow-md select-none border-[1px] border-neutral-100 dark:border-neutral-800">
      <div className="grid grid-cols-6 items-center gap-4 text-neutral-800 dark:text-neutral-200 text-sm sm:text-base">
        {/* Name */}
        <div className="sm:col-span-2 col-span-2 font-medium">
          {user?.firstName} {user?.lastName}
        </div>

        {/* Role */}
        <div className="hidden sm:block text-center font-semibold">
          {user?.role}
        </div>

        {/* Status */}
        <div className="text-center sm:col-span-1 col-span-1 w-full flex justify-center">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
              user?.userStatus === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}
          >
            {user?.userStatus}
          </span>
        </div>

        {/* Department */}
        <div className="hidden sm:block text-center">{user?.department}</div>

        {/* Action */}
        <div className="w-full text-center sm:col-span-1 col-span-3 m-auto flex justify-end ">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-500 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-600 text-xs sm:text-sm ">
            Check More
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
