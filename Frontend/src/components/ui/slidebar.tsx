import { cn } from "../../lib/utils";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link, LinkProps, NavLink } from "react-router-dom";
import weblogo from "../../assets/logo.png";
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
        "h-full px-4 py-4 hidden md:flex md:flex-col custom-secondary-bg w-[300px] flex-shrink-0",
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
        "h-10 px-4 py-7 flex flex-row md:hidden items-center justify-between custom-secondary-bg w-full"
      )}
      {...props}
    >
      <div className="flex justify-between items-center z-20 w-full">
        <Link to="/">
          <img src={weblogo} alt="" className="w-[50px]" />
        </Link>
        <IconMenu2
          className="text-neutral-800 dark:text-neutral-200"
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
              "fixed h-full w-full inset-0 custom-main-bg p-10 z-[100] flex flex-col justify-between",
              className
            )}
          >
            <div
              className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
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
  return (
    <NavLink
      to={link.href}
      className={cn(
        "text-black dark:text-white flex items-center hover justify-start gap-2 group/sidebar py-2 px-1 rounded-sm hover:text-[#118a7e] ease-in-out duration-150",
        className
      )}
      onClick={() => {
        if (link?.onClick) {
          link.onClick();
          return;
        }
        dispatch(toggleSidebar());
      }}
      {...props}
    >
      {link.icon}
      {link.label}
    </NavLink>
  );
};
