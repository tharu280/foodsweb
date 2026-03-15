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
    const dayOfWeek = formData.get('dayOfWeek') as any
    const mealType = formData.get('mealType') as any

    await prisma.foodItem.create({
        data: {
            name,
            description,
            price,
            imageUrl,
            isAvailable: true,
            dayOfWeek: dayOfWeek || 'MONDAY',
            mealType: mealType || 'LUNCH',
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
    const dayOfWeek = formData.get('dayOfWeek') as any
    const mealType = formData.get('mealType') as any

    const dataToUpdate: any = {
        name,
        description,
        price,
        imageUrl,
    }

    if (dayOfWeek) dataToUpdate.dayOfWeek = dayOfWeek
    if (mealType) dataToUpdate.mealType = mealType

    await prisma.foodItem.update({
        where: { id },
        data: dataToUpdate,
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
            name: 'Monday Lunch - Egg Dish',
            description: 'Egg Dish (Regular: Rs. 400 / Large: Rs. 500) served with Cabbage, Carrot, Cucumber salad, and Baked potato.',
            price: 400,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'MONDAY' as any,
            mealType: 'LUNCH' as any,
        },
        {
            name: 'Monday Lunch - Chicken Dish',
            description: 'Chicken Dish (Regular: Rs. 500 / Large: Rs. 600) served with Cabbage, Carrot, Cucumber salad, and Baked potato.',
            price: 500,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'MONDAY' as any,
            mealType: 'LUNCH' as any,
        },
        {
            name: 'Monday Lunch - Beef Dish',
            description: 'Beef Dish (Regular: Rs. 700 / Large: Rs. 800) served with Cabbage, Carrot, Cucumber salad, and Baked potato.',
            price: 700,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'MONDAY' as any,
            mealType: 'LUNCH' as any,
        },
        {
            name: 'Monday Dinner - Egg Dish',
            description: 'Egg Dish served with Green gram salad and Sweet potato.',
            price: 500,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'MONDAY' as any,
            mealType: 'DINNER' as any,
        },
        {
            name: 'Monday Dinner - Chicken Dish',
            description: 'Chicken Dish served with Green gram salad and Sweet potato.',
            price: 600,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'MONDAY' as any,
            mealType: 'DINNER' as any,
        },
        {
            name: 'Monday Dinner - Beef Dish',
            description: 'Beef Dish served with Green gram salad and Sweet potato.',
            price: 700,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'MONDAY' as any,
            mealType: 'DINNER' as any,
        },
        {
            name: 'Tuesday Lunch - Egg Dish',
            description: 'Egg Dish (Regular: Rs. 400 / Large: Rs. 500) served with Boiled vegetables and Baked corn.',
            price: 400,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'TUESDAY' as any,
            mealType: 'LUNCH' as any,
        },
        {
            name: 'Tuesday Lunch - Chicken Dish',
            description: 'Chicken Dish (Regular: Rs. 500 / Large: Rs. 600) served with Boiled vegetables and Baked corn.',
            price: 500,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'TUESDAY' as any,
            mealType: 'LUNCH' as any,
        },
        {
            name: 'Tuesday Lunch - Beef Dish',
            description: 'Beef Dish (Regular: Rs. 700 / Large: Rs. 800) served with Boiled vegetables and Baked corn.',
            price: 700,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'TUESDAY' as any,
            mealType: 'LUNCH' as any,
        },
        {
            name: 'Tuesday Dinner - Egg Dish',
            description: 'Egg Dish served as a Veggie mini bread pizza with Potato wedges.',
            price: 500,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'TUESDAY' as any,
            mealType: 'DINNER' as any,
        },
        {
            name: 'Tuesday Dinner - Chicken Dish',
            description: 'Chicken Dish served as a Veggie mini bread pizza with Potato wedges.',
            price: 600,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'TUESDAY' as any,
            mealType: 'DINNER' as any,
        },
        {
            name: 'Tuesday Dinner - Beef Dish',
            description: 'Beef Dish served as a Veggie mini bread pizza with Potato wedges.',
            price: 700,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'TUESDAY' as any,
            mealType: 'DINNER' as any,
        },
        {
            name: 'Wednesday Lunch - Egg Dish',
            description: 'Egg Dish (Regular: Rs. 400 / Large: Rs. 500) served with Green peas salad and Smashed potato.',
            price: 400,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'WEDNESDAY' as any,
            mealType: 'LUNCH' as any,
        },
        {
            name: 'Wednesday Lunch - Chicken Dish',
            description: 'Chicken Dish (Regular: Rs. 500 / Large: Rs. 600) served with Green peas salad and Smashed potato.',
            price: 500,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'WEDNESDAY' as any,
            mealType: 'LUNCH' as any,
        },
        {
            name: 'Wednesday Lunch - Beef Dish',
            description: 'Beef Dish (Regular: Rs. 700 / Large: Rs. 800) served with Green peas salad and Smashed potato.',
            price: 700,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'WEDNESDAY' as any,
            mealType: 'LUNCH' as any,
        },
        {
            name: 'Wednesday Dinner - Egg Dish',
            description: 'Egg Dish served with Vegetables salad and Basmathi rice.',
            price: 500,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'WEDNESDAY' as any,
            mealType: 'DINNER' as any,
        },
        {
            name: 'Wednesday Dinner - Chicken Dish',
            description: 'Chicken Dish served with Vegetables salad and Basmathi rice.',
            price: 600,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'WEDNESDAY' as any,
            mealType: 'DINNER' as any,
        },
        {
            name: 'Wednesday Dinner - Beef Dish',
            description: 'Beef Dish served with Vegetables salad and Basmathi rice.',
            price: 700,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'WEDNESDAY' as any,
            mealType: 'DINNER' as any,
        },
        {
            name: 'Thursday Lunch - Egg Dish',
            description: 'Egg Dish (Regular: Rs. 400 / Large: Rs. 500) served with Fried mushrooms, Cauliflower, Garlic, and Beans.',
            price: 400,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'THURSDAY' as any,
            mealType: 'LUNCH' as any,
        },
        {
            name: 'Thursday Lunch - Chicken Dish',
            description: 'Chicken Dish (Regular: Rs. 500 / Large: Rs. 600) served with Fried mushrooms, Cauliflower, Garlic, and Beans.',
            price: 500,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'THURSDAY' as any,
            mealType: 'LUNCH' as any,
        },
        {
            name: 'Thursday Lunch - Beef Dish',
            description: 'Beef Dish (Regular: Rs. 700 / Large: Rs. 800) served with Fried mushrooms, Cauliflower, Garlic, and Beans.',
            price: 700,
            imageUrl: '/images/hero.png',
            isAvailable: true,
            dayOfWeek: 'THURSDAY' as any,
            mealType: 'LUNCH' as any,
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
