interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "yellow" | "red" | "ink" | "white";
}

const variantClass = {
  yellow: "bg-comic-yellow text-ink",
  red: "bg-comic-red text-white",
  ink: "bg-ink text-comic-yellow",
  white: "bg-white text-ink",
};

export const ComicButton: React.FC<IProps> = ({
  variant = "yellow",
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`shadow-[3px_3px_0_var(--color-ink)] active:shadow-none disabled:opacity-50 px-4 py-1.5 border-3 border-ink min-h-11 font-bangers text-lg active:translate-0.75 transition-transform hover:-translate-px cursor-pointer disabled:cursor-not-allowed ${variantClass[variant]} ${className}`}
      {...props}
    />
  );
};
