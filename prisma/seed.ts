import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    // 1. Settings
    const settings = await prisma.settings.create({
        data: {
            companyName: 'Medical Stock Company',
            currency: 'DZD',
            taxRate: 19.0,
        },
    })
    console.log('Created settings:', settings)

    // 2. Units
    const units = await Promise.all([
        prisma.unit.create({ data: { name: 'Pièce', symbol: 'PCS' } }),
        prisma.unit.create({ data: { name: 'Boîte', symbol: 'BTE' } }),
        prisma.unit.create({ data: { name: 'Carton', symbol: 'CRT' } }),
        prisma.unit.create({ data: { name: 'Palette', symbol: 'PLT' } }),
    ])
    console.log('Created units')

    // 3. Categories
    const categories = await Promise.all([
        prisma.category.create({ data: { name: 'Médicaments', description: 'Produits pharmaceutiques' } }),
        prisma.category.create({ data: { name: 'Consommables', description: 'Gants, seringues, masques...' } }),
        prisma.category.create({ data: { name: 'Équipements', description: 'Matériel médical lourd' } }),
    ])
    console.log('Created categories')

    // 4. Warehouse
    const warehouse = await prisma.warehouse.create({
        data: {
            name: 'Dépôt Central',
            location: 'Alger',
            type: 'STORAGE',
        },
    })
    console.log('Created warehouse:', warehouse.name)

    // 5. User (Admin)
    // Note: In production password should be hashed!
    const user = await prisma.user.upsert({
        where: { email: 'admin@med-stock.com' },
        update: {},
        create: {
            email: 'admin@med-stock.com',
            name: 'Admin User',
            password: 'password123', // TODO: Hash this
            role: 'ADMIN',
        },
    })
    console.log('Created user:', user.email)

    console.log('Seeding finished.')
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
