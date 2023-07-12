import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button onClick={() => onClick()} disabled={disabled} type="button" className={clsx(disabled ? "bg-gray-400" : "bg-gradient-to-r hover:bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700", "text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2")}>
      {children}
    </button>
  );
};

export default Button;
