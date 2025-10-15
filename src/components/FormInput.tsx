import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  className?: string;
}

const FormInput: React.FC<Props> = ({ errorMessage, className, ...props }) => {
  return (
    <label className="w-full">
      <input
        {...props}
        className={clsx("bg-gray-100 px-4 py-3 rounded-md w-full", className)}
      />

      {!!errorMessage && (
        <span className="text-xs font-medium text-red-500 mt-1 text-right block">
          *{errorMessage}
        </span>
      )}
    </label>
  );
};

export default FormInput;
