import { Outlet } from "react-router";
import clsx from "clsx";

const AuthLayout = () => {
  return (
    <div
      className={clsx(
        "min-h-screen flex items-center justify-center",
        "bg-gradient",
      )}
    >
      <div
        className={clsx(
          "bg-white w-full mx-4 rounded-lg py-6 px-3 max-w-md",
          "md:max-w-2xl md:px-6 md:py-12 md:mx-0",
        )}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
