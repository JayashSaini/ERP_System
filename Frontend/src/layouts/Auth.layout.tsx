import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../app/store";
import { Loader } from "../components";

const AuthLayout = () => {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full h-screen flex items-center justify-center px-2">
      <div className="m-auto sm:max-w-screen-sm w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
