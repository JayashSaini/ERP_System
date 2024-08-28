import { cn } from "../../lib/utils";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link, LinkProps, NavLink } from "react-router-dom";
import weblogo from "../../assets/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { toggleSidebar } from "../../redux/slices/slider.slice";
import { useAppDispatch } from "../../hooks/UseAppDispatch";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  onClick?: () => void;
}

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <div>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </div>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden md:flex md:flex-col bg-white  dark:bg-neutral-900 w-[300px] flex-shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const dispatch = useDispatch<AppDispatch>();
  const { open } = useSelector((state: RootState) => state.sidebar);

  return (
    <div
      className={cn(
        "h-10 px-4 py-7 flex flex-row md:hidden items-center justify-between bg-white dark:bg-neutral-900 w-full"
      )}
      {...props}
    >
      <div className="flex justify-between items-center z-20 w-full ">
        <Link to="/">
          <img src={weblogo} alt="" className="w-[90px]" />
        </Link>
        <IconMenu2
          className="dark:text-neutral-200 text-neutral-700"
          onClick={() => dispatch(toggleSidebar())}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
              className
            )}
          >
            <div
              className="absolute right-10 top-10 z-50 dark:text-neutral-200 text-neutral-700"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconX />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const dispatch = useAppDispatch();

  return link?.onClick ? (
    <div
      className="cursor-pointer dark:text-neutral-200 text-neutral-700 flex items-center justify-start gap-2 group/sidebar py-2 px-1 rounded-sm ease-in-out duration-150 uppercase text-sm"
      onClick={link.onClick}
    >
      {link.icon}
      {link.label}
    </div>
  ) : (
    <NavLink
      to={link.href}
      className={({ isActive }) =>
        cn(
          "flex items-center justify-start gap-2 group/sidebar py-2 px-1 ease-in-out duration-150 rounded-sm uppercase text-sm",
          {
            "text-[#17bbab] dark:text-[#17bbab]": isActive, // Apply green color when active in dark mode
            "hover:text-[#17bbab] dark:hover:text-[#17bbab]": !isActive, // Apply dark theme green color on hover in dark mode
            "dark:text-neutral-200 text-neutral-700": !isActive, // Default text color when not active
          },
          className
        )
      }
      onClick={() => {
        dispatch(toggleSidebar());
      }}
      {...props}
    >
      {link.icon}
      {link.label}
    </NavLink>
  );
};
