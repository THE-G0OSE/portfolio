import { IPortfolio } from "@/entities/portfolio/model/types";
import { API_URL, PORTFOLIO_CACHE_TAG } from "@/shared/config";

// server side, cached until admin edits drop the PORTFOLIO_CACHE_TAG
// returns null when the api is unavailable, so the page can render a fallback
export const getPortfolio = async (): Promise<IPortfolio | null> => {
  try {
    const res = await fetch(`${API_URL}/portfolio`, {
      cache: "force-cache",
      next: { tags: [PORTFOLIO_CACHE_TAG] },
    });
    if (!res.ok) return null;

    return (await res.json()) as IPortfolio;
  } catch {
    return null;
  }
};
