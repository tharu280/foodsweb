import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        console.log('Connecting to database...')
        const count = await prisma.foodItem.count()
        console.log(`Found ${count} food items in the database.`)

        if (count > 0) {
            const items = await prisma.foodItem.findMany({ take: 3 })
            console.log('Sample items:', items)
        } else {
            console.log('Database is empty.')
        }
    } catch (e) {
        console.error('Error connecting to database:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
