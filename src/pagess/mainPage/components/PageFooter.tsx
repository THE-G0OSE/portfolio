interface IProps {
  name: string;
}

export const PageFooter: React.FC<IProps> = ({ name }) => {
  return (
    <footer className="flex flex-wrap justify-between gap-x-4 gap-y-1 pt-2.5 border-ink border-t-3 font-bold text-[13px] uppercase">
      <span>Written, inked &amp; deployed by {name}</span>
      <span>To be continued…</span>
    </footer>
  );
};
