import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Clear existing data
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
            imageUrl: '/images/hero.png', // Fallback to hero image which contains various sweets including Aluwa
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
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
