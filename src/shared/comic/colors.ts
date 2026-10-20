// colors that can be picked for content in the admin panel, same as ComicColor enum in the api
export const COMIC_COLORS = ["YELLOW", "RED", "BLUE", "WHITE", "INK"] as const;

export type ComicColor = (typeof COMIC_COLORS)[number];

// solid fill with readable text
export const comicFillClass: Record<ComicColor, string> = {
  YELLOW: "bg-comic-yellow text-ink",
  RED: "bg-comic-red text-white",
  BLUE: "bg-comic-blue text-white",
  WHITE: "bg-white text-ink",
  INK: "bg-ink text-comic-yellow",
};

// halftone fill
export const comicHalftoneClass: Record<ComicColor, string> = {
  YELLOW: "ht-yellow",
  RED: "ht-red text-white",
  BLUE: "ht-blue text-white",
  WHITE: "bg-white",
  INK: "ht-ink text-white",
};

// filled skill pips, white would be invisible on white so it falls back to ink
export const comicPipClass: Record<ComicColor, string> = {
  YELLOW: "bg-comic-yellow",
  RED: "bg-comic-red",
  BLUE: "bg-comic-blue",
  WHITE: "bg-ink",
  INK: "bg-ink",
};
