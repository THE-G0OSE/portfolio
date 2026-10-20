import { AdminPage } from "@/pagess/adminPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin · THE GOOSE's portfolio",
  robots: { index: false, follow: false },
}

const page = () => {
  return (
    <main className="w-full min-h-screen">
      <AdminPage />
    </main>
  )
}

export default page
