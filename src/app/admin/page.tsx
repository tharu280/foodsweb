import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminDashboard } from '@/components/AdminDashboard'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const cookieStore = cookies()
    const session = cookieStore.get('admin_session')

    if (!session) {
        redirect('/admin/login')
    }

    const foods = await prisma.foodItem.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return <AdminDashboard foods={foods} />
}
