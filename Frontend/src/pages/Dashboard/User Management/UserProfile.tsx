import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatMongoDate, requestHandler } from "../../../util";
import { getProfileById, setProfileStatus, assignUserRole } from "../../../api";
import { Loader } from "../../../components";
import { Menu, Transition } from "@headlessui/react";
import {
  MdKeyboardDoubleArrowDown,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { StatusEnum, UserRolesDropdownEnum } from "../../../constants";
import { ProfileInterface } from "../../../interfaces";
import { toast } from "sonner";
import { AccessDenied } from "../../../components";
import { useAppSelector } from "../../../hooks/UseAppSelector";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileInterface | null>(null);
  const userRole = useAppSelector((state) => state.auth.user?.role);

  const { profileId } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleStatusChange = async (status: string) => {
    if (profile) {
      requestHandler(
        async () => await setProfileStatus(profile._id, status),
        setIsLoading,
        () => {
          setStatus(status);
          toast.success("Status updated successfully");
        },
        (e) => toast.error(e)
      );
    }
  };

  const handleRoleAssign = async (role: string) => {
    if (profile) {
      requestHandler(
        async () => await assignUserRole(profile?.owner || "", role),
        setIsLoading,
        () => {
          setRole(role);
          toast.success("Role updated successfully");
        },
        (e) => toast.error(e)
      );
    }
  };

  if (!(userRole == "ADMIN" || userRole == "HR")) {
    return <AccessDenied />;
  }

  useEffect(() => {
    requestHandler(
      async () => await getProfileById(profileId || ""),
      setIsLoading,
      ({ data }) => {
        setProfile(data);
        setStatus(data.status);
        setRole(data.role);
      },
      () => navigate("/dashboard/user-management")
    );
  }, [profileId, navigate]);

  return isLoading ? (
    <div className="flex justify-center items-center h-full">
      <Loader />
    </div>
  ) : (
    <div className="container mx-auto p-6 text-neutral-900 dark:text-neutral-100">
      <Link
        to="/dashboard/user-management"
        className="hover:underline text-sm uppercase mb-3 flex font-medium dark:text-neutral-300 text-neutral-900"
      >
        <MdOutlineKeyboardArrowLeft className="text-xl" />
        Back To User Management
      </Link>{" "}
      <div className="bg-neutral-100 dark:bg-[#2626269f] rounded-lg shadow-lg p-6">
        <h1 className="sm:text-2xl text-lg font-semibold flex items-center justify-start gap-2 mb-4">
          {profile?.avatar?.url && (
            <img
              src={profile?.avatar?.url}
              alt=""
              className="sm:w-[50px] w-[40px] rounded-full"
            />
          )}
          <span>
            {profile?.firstName} {profile?.lastName}'s
          </span>{" "}
          Profile
        </h1>
        <div className="sm:text-base text-sm grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="space-y-3">
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
            <p>
              <strong>Role:</strong> {role}
            </p>
            <p>
              <strong>Status:</strong> {status}
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
              {formatMongoDate(String(profile?.dateOfBirth))}
            </p>
            <p>
              <strong>Joining Date:</strong>{" "}
              {formatMongoDate(String(profile?.joiningDate))}
            </p>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col justify-end sm:gap-4 gap-2 mt-6">
          {/* Assign Role */}
          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex justify-center items-center w-full rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-600 focus:outline-none">
              {role || "Assign Role"}
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
              <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right bg-neutral-200 dark:bg-neutral-700 divide-y divide-neutral-100 dark:divide-neutral-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {UserRolesDropdownEnum.map((r) => (
                  <Menu.Item key={r}>
                    {({ active }) => (
                      <button
                        onClick={() => handleRoleAssign(r)}
                        className={`${
                          active || r === role ? "bg-[#118a7e67]" : ""
                        } group flex  items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200`}
                      >
                        {r}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Change Status */}
          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex justify-center items-center w-full rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-600 focus:outline-none">
              {status || "Change Status"}
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
              <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right bg-neutral-200 dark:bg-neutral-700 divide-y divide-neutral-100 dark:divide-neutral-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {StatusEnum.map((s) => (
                  <Menu.Item key={s}>
                    {({ active }) => (
                      <button
                        onClick={() => handleStatusChange(s)}
                        className={`${
                          active || s === status ? "bg-[#118a7e67]" : ""
                        } group flex  items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200`}
                      >
                        {s}
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
