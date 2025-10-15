import React from "react";
import { useNavigate } from "react-router";

import { AuthService } from "../utils/services/authService";
import { useMe } from "../utils/hooks/useUserApi";

import UserIcon from "../icons/UserIcon";
import OutsideClickWrap from "../components/OutsideClickWrap";

const UserLabel = () => {
  const { data: user } = useMe();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickLogout = () => {
    AuthService.logout();
    navigate("/login");
  };
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClickOutside = () => setIsOpen(false);

  if (!user) return null;

  return (
    <OutsideClickWrap onClickOutside={handleClickOutside} className="relative">
      <button
        type="button"
        className="flex items-center gap-3 py-1 pr-3 pl-1 rounded-sm shadow"
        onClick={toggleDropdown}
      >
        <div className="p-3 rounded-sm bg-gray-100 text-primary-blue">
          <UserIcon />
        </div>

        <div className="flex flex-col justify-between items-start">
          <span className="text-primary-blue font-medium text-sm">
            {user.nickname}
          </span>
          <span className="text-gray-400 font-light text-sm">
            {user.email}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute bg-white inset-x-0 z-10 rounded-sm mt-1 shadow overflow-hidden">
          <button
            className="w-full text-left p-2 hover:bg-gray-100 text-sm text-primary-blue/70 hover:text-primary-blue font-medium"
            onClick={handleClickLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      )}
    </OutsideClickWrap>
  );
};

export default UserLabel;
