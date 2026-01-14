'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export type InventoryItem = {
    id: string;
    sku: string;
    name: string;
    category: string;
    unit: string;
    minStock: number;
    totalStock: number;
    status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
    hasExpiry: boolean;
    batches: {
        batchNumber: string;
        expiryDate: Date | null;
        quantity: number;
        warehouse: string;
    }[];
};

export async function getInventory(): Promise<InventoryItem[]> {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                unit: true,
                stocks: {
                    include: {
                        warehouse: true,
                        batch: true,
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });

        return products.map((product: any) => {
            const totalStock = product.stocks.reduce((acc: number, stock: any) => acc + stock.quantity, 0);

            let status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' = 'IN_STOCK';
            if (totalStock === 0) status = 'OUT_OF_STOCK';
            else if (totalStock <= product.minStock) status = 'LOW_STOCK';

            const batches = product.stocks.map((stock: any) => ({
                batchNumber: stock.batch?.batchNumber || 'N/A',
                expiryDate: stock.batch?.expiryDate || null,
                quantity: stock.quantity,
                warehouse: stock.warehouse.name,
            }));

            return {
                id: product.id,
                sku: product.sku,
                name: product.name,
                category: product.category?.name || 'N/A',
                unit: product.unit?.symbol || 'N/A',
                minStock: product.minStock,
                totalStock,
                status,
                hasExpiry: product.hasExpiry,
                batches,
            };
        });
    } catch (error) {
        console.error('Failed to fetch inventory:', error);
        throw new Error('Failed to fetch inventory data');
    }
}

export async function getCategories() {
    return await prisma.category.findMany({ orderBy: { name: 'asc' } });
}

export async function getUnits() {
    return await prisma.unit.findMany({ orderBy: { name: 'asc' } });
}

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string;
    const sku = formData.get('sku') as string;
    const categoryId = formData.get('categoryId') as string;
    const unitId = formData.get('unitId') as string;
    const minStock = parseInt(formData.get('minStock') as string) || 10;
    const tva = parseFloat(formData.get('tva') as string) || 0;
    const description = formData.get('description') as string;

    if (!name || !sku || !categoryId || !unitId) {
        return { success: false, error: 'Veuillez remplir tous les champs obligatoires.' };
    }

    try {
        await prisma.product.create({
            data: {
                name,
                sku,
                categoryId,
                unitId,
                minStock,
                tva,
                description,
                originCountry: 'Algérie', // Default
            },
        });

        revalidatePath('/inventory');
        return { success: true };
    } catch (error) {
        console.error('Failed to create product:', error);
        return { success: false, error: 'Erreur lors de la création (SKU dupliqué ?).' };
    }
}
