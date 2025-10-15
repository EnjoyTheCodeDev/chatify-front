import React from "react";
import clsx from "clsx";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxRows?: number;
}

const TextArea: React.FC<Props> = ({
  value,
  onChange,
  className,
  maxRows = 5,
  ...props
}) => {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = ref.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.overflowY = "hidden";

    const lineHeight = parseInt(getComputedStyle(el).lineHeight || "0", 10);
    const maxHeight = lineHeight * maxRows;

    if (el.scrollHeight > maxHeight) {
      el.style.height = maxHeight + "px";
      el.style.overflowY = "auto";
    } else {
      el.style.height = el.scrollHeight + "px";
    }

    props.onInput?.(e);
  };

  return (
    <textarea
      {...props}
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      onInput={handleInput}
      className={clsx(
        "resize-none outline-none rounded-xs p-2 text-sm w-full",
        className,
      )}
    />
  );
};

export default TextArea;
