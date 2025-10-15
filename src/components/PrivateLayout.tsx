import { Outlet } from "react-router";

const PrivateLayout = () => {
  return (
    <div className="bg-gradient min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl lg:max-w-4xl mx-4 lg:mx-0">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateLayout;
