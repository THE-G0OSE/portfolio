import { TargetAndTransition, Transition, Variant, Variants } from "motion";
import { MouseEvent as ReactMouseEvent } from "react";

export type CardOrder = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface ICardPlacement {
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
  zIndex?: number;
}

// GRID

export const CELL_W = 200;
export const CELL_H = 214;
export const GAP = 18;
export const GRID_COLS = 6;
export const GRID_ROWS = 4;
export const GRID_W = GRID_COLS * CELL_W + (GRID_COLS - 1) * GAP;
export const GRID_H = GRID_ROWS * CELL_H + (GRID_ROWS - 1) * GAP;

// intro of the cards goes one by one in grid order
const CARD_STAGGER = 0.3;

const FULLSCREEN_W = 1000;
const FULLSCREEN_H = 780;
const FULLSCREEN_SCALE = 0.7;

export const cardLayout: Record<CardOrder, ICardPlacement> = {
  0: { col: 1, row: 1, colSpan: 2, rowSpan: 2 },
  1: { col: 3, row: 1, colSpan: 2, rowSpan: 1 },
  2: { col: 5, row: 1, colSpan: 1, rowSpan: 1 },
  3: { col: 6, row: 1, colSpan: 1, rowSpan: 4 },
  4: { col: 3, row: 2, colSpan: 3, rowSpan: 2, zIndex: 10 },
  5: { col: 1, row: 3, colSpan: 2, rowSpan: 2, zIndex: 10 },
  6: { col: 3, row: 4, colSpan: 3, rowSpan: 1, zIndex: 0 },
};

export const getCardGridStyle = (order: CardOrder) => {
  const { col, row, colSpan, rowSpan, zIndex } = cardLayout[order];

  return {
    gridColumn: `${col} / span ${colSpan}`,
    gridRow: `${row} / span ${rowSpan}`,
    zIndex,
  };
};

export const getCardSize = (order: CardOrder) => {
  const { colSpan, rowSpan } = cardLayout[order];

  return {
    width: colSpan * CELL_W + (colSpan - 1) * GAP,
    height: rowSpan * CELL_H + (rowSpan - 1) * GAP,
  };
};

// offset that moves card from its grid cell to the center of the grid
const getFullscreenOffset = (order: CardOrder) => {
  const { col, row } = cardLayout[order];
  const left = (col - 1) * (CELL_W + GAP);
  const top = (row - 1) * (CELL_H + GAP);

  return {
    x: GRID_W / 2 - FULLSCREEN_W / 2 - left,
    y: GRID_H / 2 - FULLSCREEN_H / 2 - top,
  };
};

export interface ICardVariants {
  // fixed size board with fullscreen zoom
  desktop: Variants;
  // phones: card is in the page flow, its size comes from css
  mobile: Variants;
}

export const createCardVariants = (
  order: CardOrder,
  start: Variant,
  endTransition: Transition,
  reset: Variant = {},
): ICardVariants => {
  const rest = { x: 0, y: 0, opacity: 1, scale: 1, ...reset };
  const desktopRest = { ...rest, ...getCardSize(order) };
  const introDelay = order * CARD_STAGGER;

  return {
    desktop: {
      start,
      // children intro waits for the card too
      end: { ...desktopRest, transition: { ...endTransition, delay: introDelay, delayChildren: introDelay } },
      endFast: { ...desktopRest, transition: { duration: 1, ease: "easeOut" } },
      fullscreen: {
        ...getFullscreenOffset(order),
        ...reset,
        opacity: 1,
        scale: FULLSCREEN_SCALE,
        width: FULLSCREEN_W,
        height: FULLSCREEN_H,
        transition: { duration: 1, ease: "easeOut" },
      },
    },
    // cards appear when scrolled into view, so no stagger
    mobile: {
      start,
      end: { ...rest, transition: endTransition },
    },
  };
};

interface IContentVariants extends Variants {
  start: TargetAndTransition;
  end: TargetAndTransition;
}

// variants of elements inside a card. Motion resets an element to "start" when the card
// switches to a state the element doesn't define, so missing endFast / fullscreen keep "end"
export const createContentVariants = ({ start, end, ...rest }: IContentVariants): Variants => {
  const settled = { ...end, transition: { duration: 0 } };

  return { start, end, endFast: settled, fullscreen: settled, ...rest };
};

export const getDistanceToRectangle = (e: MouseEvent, rect: HTMLDivElement) => {
  const mouse = { x: e.clientX, y: e.clientY };

  const shape = rect.getBoundingClientRect();

  // INSIDE

  if (
    mouse.x > shape.left &&
    mouse.x < shape.right &&
    mouse.y > shape.top &&
    mouse.y < shape.bottom
  ) {
    return 0;
  }

  // LEFT

  if (mouse.x <= shape.left) {
    // TOP
    if (mouse.y <= shape.top)
      return Math.sqrt(
        (shape.left - mouse.x) ** 2 + (shape.top - mouse.y) ** 2,
      );
    // CENTER
    if (mouse.y > shape.top && mouse.y < shape.bottom)
      return shape.left - mouse.x;
    // BOTTOM
    if (mouse.y >= shape.bottom)
      return Math.sqrt(
        (shape.left - mouse.x) ** 2 + (mouse.y - shape.bottom) ** 2,
      );
  }

  // CENTER

  if (mouse.x > shape.left && mouse.x < shape.right) {
    // TOP
    if (mouse.y <= shape.top) return shape.top - mouse.y;
    // BOTTOM
    if (mouse.y >= shape.bottom) return mouse.y - shape.bottom;
  }

  // RIGHT

  if (mouse.x >= shape.right) {
    // TOP
    if (mouse.y <= shape.top)
      return Math.sqrt(
        (mouse.x - shape.right) ** 2 + (shape.top - mouse.y) ** 2,
      );
    // CENTER
    if (mouse.y > shape.top && mouse.y < shape.bottom)
      return mouse.x - shape.right;
    // BOTTOM
    if (mouse.y >= shape.bottom)
      return Math.sqrt(
        (mouse.x - shape.right) ** 2 + (mouse.y - shape.bottom) ** 2,
      );
  }

  console.warn(
    "something went wrong with calculating distance to rectangle and function returned 0",
  );
  return 0;
};

export const getRotationPercent = (e: ReactMouseEvent, rect: HTMLDivElement) => {
  const mouse = { x: e.clientX, y: e.clientY };
  const shape = rect.getBoundingClientRect();

  const x = (mouse.y - shape.top) / (shape.bottom - shape.top) - 0.5
  const y = (mouse.x - shape.left) / (shape.right - shape.left) - 0.5

  return {x: -x, y}
};
