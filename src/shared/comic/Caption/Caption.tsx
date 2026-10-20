interface IProps {
  children: React.ReactNode;
  white?: boolean;
  className?: string;
}

export const Caption: React.FC<IProps> = ({ children, white, className = "" }) => {
  const bg = white ? "bg-white" : "bg-comic-yellow";

  return (
    <div
      className={`inline-block ${bg} px-2.25 py-1.25 border-3 border-ink font-comic font-bold text-[13px] text-ink leading-[1.2] uppercase ${className}`}
    >
      {children}
    </div>
  );
};
