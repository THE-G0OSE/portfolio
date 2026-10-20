interface IProps {
  children: React.ReactNode;
}

// phones: cards one under another, gap leaves room for the "MORE" stickers
export const MobileBoard: React.FC<IProps> = ({ children }) => {
  return <div className="flex flex-col gap-7 perspective-distant">{children}</div>;
};
