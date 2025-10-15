import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const FormBtn: React.FC<Props> = ({ text, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        "bg-primary-blue w-full px-2 py-2 md:py-3 rounded-md mt-6 md:mt-10",
        "text-lg md:text-xl uppercase text-white font-semibold",
        "disabled:opacity-50 disabled:!cursor-not-allowed",
      )}
    >
      {text}
    </button>
  );
};

export default FormBtn;
