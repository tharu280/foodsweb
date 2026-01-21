import { prisma } from '@/lib/prisma'
import { Menu } from '@/components/Menu'


export default async function Home() {
  const foods = await prisma.foodItem.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <Menu initialFoods={foods} />
    </main>
  )
}
