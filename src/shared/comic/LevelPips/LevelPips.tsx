interface IProps {
  level: number;
  // background class of filled pips, e.g. "bg-comic-red"
  activeClassName: string;
  label: string;
  max?: number;
  // small fixed size pips instead of stretching to full width
  compact?: boolean;
}

export const LevelPips: React.FC<IProps> = ({ level, activeClassName, label, max = 5, compact }) => {
  const pipClass = compact ? "w-3 h-2.5" : "h-2.25 grow";

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={level}
      className={`flex ${compact ? "gap-0.5 shrink-0" : "gap-1"}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`border-2 border-ink ${pipClass} ${i < level ? activeClassName : "bg-white"}`}
        />
      ))}
    </div>
  );
};
