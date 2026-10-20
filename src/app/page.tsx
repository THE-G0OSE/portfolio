import { getPortfolio } from "@/entities/portfolio"
import { MainPage } from "@/pagess/mainPage"

// safety net: if the api was offline during render, retry within a minute
export const revalidate = 60

const page = async () => {
  const portfolio = await getPortfolio()

  return (
    <main className="w-full min-h-screen">
      <MainPage portfolio={portfolio} />
    </main>
  )
}

export default page
