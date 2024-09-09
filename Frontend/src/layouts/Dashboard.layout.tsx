import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/slidebar";
import {
  IconArrowLeft,
  IconCertificate,
  IconDeviceImac,
  IconNotebook,
  IconReportMoney,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";
import { cn } from "../lib/utils";
import weblogo from "../assets/logo.svg";
import { useAppDispatch } from "../hooks/UseAppDispatch";
import { logout } from "../redux/thunk/auth.thunk";
import { useAppSelector } from "../hooks/UseAppSelector";
import { UserInterface } from "../interfaces";

function DashboardLayout() {
  const dispatch = useAppDispatch();
  const user: UserInterface | null = useAppSelector((state) => state.auth.user);

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard/d",
      icon: <IconCertificate className=" h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "User Management",
      href: "/dashboard/user-management",
      icon: <IconNotebook className=" h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Human Resources",
      href: "/dashboard/human-resources",
      icon: <IconUserBolt className=" h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Project Management",
      href: "/dashboard/project-management",
      icon: <IconDeviceImac className=" h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Finance",
      href: "/dashboard/finance",
      icon: <IconReportMoney className=" h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Inquiries",
      href: "/dashboard/inquiries",
      icon: <IconReportMoney className=" h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "/dashboard/setting",
      icon: <IconSettings className=" h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className=" h-5 w-5 flex-shrink-0" />,
      onClick: async () => {
        await dispatch(logout());
      },
    },
  ];
  return (
    <div
      className={cn(
        "w-full bg-neutral-100 dark:bg-black text-neutral-800 dark:text-neutral-200 min-h-screen rounded-md flex flex-col md:flex-row   flex-1   overflow-hidden"
      )}
    >
      <Sidebar>
        <SidebarBody className="justify-between gap-10 ">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.username || "User",
                href: "/dashboard/profile",
                icon: (
                  <img
                    src={user?.avatar?.url}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="w-full h-screen overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center  py-1 relative z-20"
    >
      <img src={weblogo} alt="" className="w-[150px]" />
    </Link>
  );
};

export default DashboardLayout;
