'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    if (
        username === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASS
    ) {
        cookies().set('admin_session', 'true', { httpOnly: true })
        redirect('/admin')
    } else {
        // In a real app, return error to display on form
        // For MVP, maybe just redirect back or do nothing (user sees no change)
        // Or redirect with error query param
        redirect('/admin/login?error=Invalid credentials')
    }
}

export async function logout() {
    cookies().delete('admin_session')
    redirect('/admin/login')
}

export async function addFood(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const imageUrl = formData.get('imageUrl') as string

    await prisma.foodItem.create({
        data: {
            name,
            description,
            price,
            imageUrl,
            isAvailable: true,
        },
    })
    revalidatePath('/')
    revalidatePath('/admin')
}

export async function updateFood(id: number, formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const imageUrl = formData.get('imageUrl') as string

    await prisma.foodItem.update({
        where: { id },
        data: {
            name,
            description,
            price,
            imageUrl,
        },
    })
    revalidatePath('/')
    revalidatePath('/admin')
}

export async function deleteFood(id: number) {
    await prisma.foodItem.delete({
        where: { id },
    })
    revalidatePath('/')
    revalidatePath('/admin')
}

export async function toggleAvailability(id: number, isAvailable: boolean) {
    await prisma.foodItem.update({
        where: { id },
        data: { isAvailable },
    })
    revalidatePath('/')
    revalidatePath('/admin')
}

export async function seedDatabase() {
    const cookieStore = cookies()
    const session = cookieStore.get('admin_session')
    if (!session) {
        throw new Error('Unauthorized')
    }

    await prisma.foodItem.deleteMany({})

    const foods = [
        {
            name: 'Kiribath Piece (කිරි බත් කෑල්ලක්)',
            description: 'Creamy milk rice prepared with premium white raw rice and thick coconut milk. A staple for every Sri Lankan celebration.',
            price: 60,
            imageUrl: '/images/kiribath.png',
            isAvailable: true,
        },
        {
            name: 'Mun Kavum (මුං කැවුම්)',
            description: 'Traditional deep-fried sweet made from mung bean flour and rich Kithul treacle. Moist, sweet, and authentic.',
            price: 50,
            imageUrl: '/images/kavum.png',
            isAvailable: true,
        },
        {
            name: 'Traditional Kokis (කොකිස්)',
            description: 'Intricately designed, crispy rosette cookies made with fresh coconut milk and rice flour. The ultimate festive crunch.',
            price: 20,
            imageUrl: '/images/kokis.png',
            isAvailable: true,
        },
        {
            name: 'Artisan Aluwa (අලුවා)',
            description: 'Diamond-shaped traditional sweet made from roasted rice flour, delicately flavored with cardamom and treacle.',
            price: 40,
            imageUrl: '/images/hero.png',
            isAvailable: true,
        },
        {
            name: 'Pol Toffee (පොල් ටොෆී)',
            description: 'Classic Sri Lankan coconut toffee squares. Sweet, chewy, and made with freshly scraped coconut.',
            price: 20,
            imageUrl: '/images/pol_toffee.png',
            isAvailable: true,
        },
        {
            name: 'Spicy Fish Cutlet (කට්ලට්)',
            description: 'Savory, spicy fish and potato spheres, double-breaded and deep-fried to golden perfection.',
            price: 50,
            imageUrl: '/images/cutlets.png',
            isAvailable: true,
        }
    ]

    for (const food of foods) {
        await prisma.foodItem.create({
            data: food,
        })
    }

    revalidatePath('/')
    revalidatePath('/admin')
}
