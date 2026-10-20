import { useElementWidth } from "@/shared/lib";
import { GAP, GRID_H, GRID_W } from "@/widgets/profileCard";
import { useRef } from "react";

interface IProps {
  children: React.ReactNode;
}

// fixed size board, scaled down to fit laptops and tablets in landscape
export const DesktopBoard: React.FC<IProps> = ({ children }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(boxRef);
  const scale = width ? Math.min(1, width / GRID_W) : 1;

  return (
    <div ref={boxRef} className="w-full">
      {/* takes the scaled size in the layout */}
      <div style={{ width: GRID_W * scale, height: GRID_H * scale }} className="mx-auto">
        <div style={{ transform: scale < 1 ? `scale(${scale})` : undefined }} className="origin-top-left">
          <div
            style={{ width: GRID_W, height: GRID_H, gap: GAP }}
            className="grid grid-cols-6 grid-rows-4 transform-3d perspective-near"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
