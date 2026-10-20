import { PORTFOLIO_CACHE_TAG } from "@/shared/config"
import { revalidateTag } from "next/cache"

// called by the NestJS api after admin edits
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET

  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ revalidated: false }, { status: 401 })
  }

  // expire right away, so the next visit already gets fresh data
  revalidateTag(PORTFOLIO_CACHE_TAG, { expire: 0 })

  return Response.json({ revalidated: true })
}
