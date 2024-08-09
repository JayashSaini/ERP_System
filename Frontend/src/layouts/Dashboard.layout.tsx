import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/slidebar";
import {
  IconArrowLeft,
  IconCertificate,
  IconNotebook,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";
import { cn } from "../lib/utils";
import weblogo from "../assets/logo.png";
import { useAppDispatch } from "../hooks/UseAppDispatch";
import { logout } from "../redux/thunk/auth.thunk";

function DashboardLayout() {
  const dispatch = useAppDispatch();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
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
      icon: <IconUserBolt className=" h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Finance",
      href: "/dashboard/finance",
      icon: <IconUserBolt className=" h-5 w-5 flex-shrink-0" />,
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
        "w-full h-screen rounded-md flex flex-col md:flex-row   flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      )}
    >
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
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
                label: "Hello world",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
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
      <Outlet />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center  py-1 relative z-20"
    >
      <img src={weblogo} alt="" className="w-[70px]" />
    </Link>
  );
};

export default DashboardLayout;
