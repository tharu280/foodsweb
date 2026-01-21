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
