import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatMongoDate, requestHandler } from "../../../util";
import { getProfileById } from "../../../api";
import { Loader } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import {
  MdKeyboardDoubleArrowDown,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { StatusEnum, UserRolesEnum } from "../../../constants";

interface Profile {
  city: string;
  contactNumber: string;
  createdAt: string;
  dateOfBirth: string;
  department: string;
  email: string;
  employeeStatus: "FULL_TIME" | "PART_TIME" | "INTERN";
  firstName: string;
  gender: "Male" | "Female" | "Other";
  jobTitle: string;
  joiningDate: string;
  lastName: string;
  owner: string;
  permanentAddress: string;
  stateProvince: string;
  status: "ACTIVE" | "INACTIVE" | "RESIGNED";
  updatedAt: string;
  workLocation: "WFO" | "WFH" | "HYBRID";
}

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { profileId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    requestHandler(
      async () => await getProfileById(profileId || ""),
      setIsLoading,
      ({ data }) => setProfile(data),
      () => navigate("/dashboard/user-management")
    );
  }, [profileId]);

  const handleStatusChange = (status: string) => {
    // Logic to update user status
    console.log(`Status changed to: ${status}`);
  };

  const handleRoleAssign = (role: string) => {
    // Logic to assign a new role to the user
    console.log(`Role assigned: ${role}`);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container mx-auto p-6 text-neutral-900 dark:text-neutral-100">
      <Link
        to="/dashboard/user-management"
        className=" hover:underline text-sm uppercase mb-3 flex font-medium dark:text-neutral-300 text-neutral-900"
      >
        <MdOutlineKeyboardArrowLeft className="text-xl" />
        Back To User Management
      </Link>{" "}
      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold  mb-4">
          <span>
            {profile?.firstName} {profile?.lastName}'s
          </span>{" "}
          Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {profile?.firstName} {profile?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {profile?.email}
            </p>
            <p>
              <strong>Contact Number:</strong> {profile?.contactNumber}
            </p>
            <p>
              <strong>Department:</strong> {profile?.department}
            </p>
            <p>
              <strong>Job Title:</strong> {profile?.jobTitle}
            </p>
            <p>
              <strong>Employee Status:</strong> {profile?.employeeStatus}
            </p>
          </div>
          <div className="space-y-3">
            <p>
              <strong>City:</strong> {profile?.city}
            </p>
            <p>
              <strong>State/Province:</strong> {profile?.stateProvince}
            </p>
            <p>
              <strong>Permanent Address:</strong> {profile?.permanentAddress}
            </p>
            <p>
              <strong>Work Location:</strong> {profile?.workLocation}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {formatMongoDate(profile?.dateOfBirth)}
            </p>
            <p>
              <strong>Joining Date:</strong>{" "}
              {formatMongoDate(profile?.joiningDate)}
            </p>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col justify-end sm:gap-4 gap-2 mt-6">
          {/* Assign Role */}
          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-600 focus:outline-none">
              Assign Role
              <MdKeyboardDoubleArrowDown
                className="ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right bg-white dark:bg-neutral-700 divide-y divide-neutral-100 dark:divide-neutral-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {UserRolesEnum.map((role) => (
                  <Menu.Item key={role}>
                    {({ active }) => (
                      <button
                        onClick={() => handleRoleAssign(role)}
                        className={`${
                          active ? "bg-neutral-100 dark:bg-neutral-600" : ""
                        } group flex rounded-md items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200`}
                      >
                        {role}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Change Status */}
          <Menu as="div" className="relative ">
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-600 focus:outline-none">
              Change Status
              <MdKeyboardDoubleArrowDown
                className="ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right bg-white dark:bg-neutral-700 divide-y divide-neutral-100 dark:divide-neutral-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {StatusEnum.map((status) => (
                  <Menu.Item key={status}>
                    {({ active }) => (
                      <button
                        onClick={() => handleStatusChange(status)}
                        className={`${
                          active ? "bg-neutral-100 dark:bg-neutral-600" : ""
                        } group flex rounded-md items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200`}
                      >
                        {status}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
