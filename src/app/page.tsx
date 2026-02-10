import { prisma } from '@/lib/prisma'
import { Menu } from '@/components/Menu'


export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  console.log('Fetching foods from DB...')
  const foods = await prisma.foodItem.findMany({
    orderBy: { createdAt: 'desc' }
  })
  console.log(`Found ${foods.length} foods`)

  if (foods.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Database Connected</h1>
          <p>But 0 items found. (This implies Seed worked locally but Vercel DB is empty?)</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Menu initialFoods={foods} />
    </main>
  )
}
