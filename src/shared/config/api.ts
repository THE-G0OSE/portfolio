// NestJS api address for server side requests
export const API_URL = process.env.API_URL ?? "http://localhost:4000";

// browser side requests go here, next.config rewrites them to API_URL
export const API_PROXY_PATH = "/backend";

// cache tag of all portfolio data, dropped by /api/revalidate after admin edits
export const PORTFOLIO_CACHE_TAG = "portfolio";
