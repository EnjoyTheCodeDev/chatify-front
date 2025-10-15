import { useRef, useEffect } from "react";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClickOutside: () => void;
  className?: string;
};

const OutsideClickWrap: FC<Props> = ({
  children,
  onClickOutside,
  className = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [onClickOutside]);

  return (
    <div className={className} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default OutsideClickWrap;
