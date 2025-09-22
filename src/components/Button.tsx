import { ReactNode } from "react";

interface ButtonProps {
  text: string | ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // ✅ optional type prop
}

export default function Button({
  text,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`mt-6 inline-block font-semibold px-6 py-3 rounded-full transition duration-300 
        bg-[var(--primary-color)] text-black  hover:shadow-[0_0_25px_var(--primary-color)] hover:bg-opacity-90
        disabled:opacity-70 disabled:cursor-not-allowed
        ${className}`}
    >
      {text}
    </button>
  );
}
