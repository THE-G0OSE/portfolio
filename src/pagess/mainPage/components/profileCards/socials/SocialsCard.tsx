import { ISocial } from "@/entities/portfolio";
import { socialsVariants } from "@/pagess/mainPage/components/profileCards/socials/animations";
import { comicFillClass } from "@/shared/comic";
import { ProfileCard } from "@/widgets/profileCard";

interface IProps {
  socials: ISocial[];
  totalFlock: string;
}

// 2x3 grid: 5 stickers + total
const MAX_SOCIALS = 5;

export const SocialsCard: React.FC<IProps> = ({ socials, totalFlock }) => {
  return (
    <ProfileCard
      variants={socialsVariants}
      order={5}
      className="flex flex-col gap-3 px-4 pt-3.5 pb-4 ht-red"
      noFullScreen
    >
      <p className="font-bangers text-[36px] text-white leading-none [-webkit-text-stroke:1.2px_var(--color-ink)] [text-shadow:3px_3px_0_var(--color-ink)]">
        FOLLOW THE GOOSE!
      </p>
      {/* phones: one sticker per row, rows only as many as stickers */}
      <nav aria-label="Social links" className="gap-3.5 grid grid-cols-2 max-sm:grid-cols-1 grid-rows-3 max-lg:grid-rows-none grow">
        {socials.slice(0, MAX_SOCIALS).map(({ id, name, handle, count, unit, href, color, tilt }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
            className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 px-3 py-2 border-3 border-ink shadow-[4px_4px_0_var(--color-ink)] no-underline rotate-(--tilt) hover:rotate-0 hover:scale-107 hover:z-4 transition-[rotate,scale] ${comicFillClass[color]}`}
          >
            <span className="flex flex-col gap-0.5 min-w-0">
              <span className="font-bangers text-[22px] leading-none">{name}</span>
              <span className="font-mono font-bold text-[11px] truncate">{handle}</span>
            </span>
            <span className="flex flex-col items-end">
              <span className="font-bangers text-[28px] leading-none">{count}</span>
              <span className="text-[10px] uppercase">{unit}</span>
            </span>
          </a>
        ))}
        <div className="flex flex-col justify-center items-center shadow-[4px_4px_0_var(--color-comic-yellow)] border-3 border-ink rotate-2 ht-ink">
          <span className="text-[11px] text-white uppercase">Total flock</span>
          <span className="font-bangers text-[34px] text-comic-yellow leading-none">{totalFlock}</span>
        </div>
      </nav>
    </ProfileCard>
  );
};
