import { useEffect } from "react";
import type { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

const ModalWrap: FC<Props> = ({ children, className }) => {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-[9999] flex justify-center items-center",
        className,
      )}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">{children}</div>
    </div>,
    modalRoot || document.body,
  );
};

export default ModalWrap;
