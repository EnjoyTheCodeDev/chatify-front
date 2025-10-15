import React from "react";
import clsx from "clsx";

import SpinerIcon from "../icons/SpinerIcon";

type Props = {
  size?: number;
  className?: string;
  isLoading: boolean;
};

export const LoadingWrap: React.FC<Props> = ({
  size = 40,
  className,
  isLoading,
}) => {
  return (
    <div
      className={clsx(
        !isLoading && "hidden",
        "absolute inset-0 z-50 flex items-center justify-center bg-primary/5 backdrop-blur-sm",
        className,
      )}
    >
      <SpinerIcon
        className="animate-spin text-primary-blue"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default LoadingWrap;
