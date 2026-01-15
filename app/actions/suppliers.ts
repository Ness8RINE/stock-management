'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getSuppliers() {
    try {
        return await prisma.supplier.findMany({
            orderBy: { name: 'asc' },
        });
    } catch (error) {
        console.error('Failed to fetch suppliers:', error);
        throw new Error('Failed to fetch suppliers');
    }
}

export async function createSupplier(formData: FormData) {
    const code = formData.get('code') as string;
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const fax = formData.get('fax') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const country = formData.get('country') as string;
    const initialBalance = parseFloat(formData.get('initialBalance') as string) || 0;
    const contactPerson = formData.get('contactPerson') as string;
    const legalStatus = formData.get('legalStatus') as string;
    const rcNum = formData.get('rcNum') as string;
    const mfNum = formData.get('mfNum') as string;
    const nisNum = formData.get('nisNum') as string;
    const aiNum = formData.get('aiNum') as string;
    const bankAccount = formData.get('bankAccount') as string;

    if (!code || !name) {
        return { success: false, error: 'Le code et le nom sont obligatoires.' };
    }

    try {
        await prisma.supplier.create({
            data: {
                code,
                name,
                phone,
                fax,
                email,
                address,
                country: country || 'Algérie',
                initialBalance,
                contactPerson,
                legalStatus,
                rcNum,
                mfNum,
                nisNum,
                aiNum,
                bankAccount,
            },
        });

        revalidatePath('/suppliers');
        return { success: true };
    } catch (error: any) {
        console.error('Failed to create supplier:', error);
        if (error.code === 'P2002') {
            return { success: false, error: 'Ce code fournisseur existe déjà.' };
        }
        return { success: false, error: 'Erreur lors de la création du fournisseur.' };
    }
}

export async function updateSupplier(id: string, formData: FormData) {
    const code = formData.get('code') as string;
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const fax = formData.get('fax') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const country = formData.get('country') as string;
    const initialBalance = parseFloat(formData.get('initialBalance') as string) || 0;
    const contactPerson = formData.get('contactPerson') as string;
    const legalStatus = formData.get('legalStatus') as string;
    const rcNum = formData.get('rcNum') as string;
    const mfNum = formData.get('mfNum') as string;
    const nisNum = formData.get('nisNum') as string;
    const aiNum = formData.get('aiNum') as string;
    const bankAccount = formData.get('bankAccount') as string;

    if (!code || !name) {
        return { success: false, error: 'Le code et le nom sont obligatoires.' };
    }

    try {
        await prisma.supplier.update({
            where: { id },
            data: {
                code,
                name,
                phone,
                fax,
                email,
                address,
                country,
                initialBalance,
                contactPerson,
                legalStatus,
                rcNum,
                mfNum,
                nisNum,
                aiNum,
                bankAccount,
            },
        });

        revalidatePath('/suppliers');
        return { success: true };
    } catch (error: any) {
        console.error('Failed to update supplier:', error);
        if (error.code === 'P2002') {
            return { success: false, error: 'Ce code fournisseur existe déjà.' };
        }
        return { success: false, error: 'Erreur lors de la modification.' };
    }
}

export async function deleteSupplier(id: string) {
    try {
        await prisma.supplier.delete({ where: { id } });
        revalidatePath('/suppliers');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete supplier:', error);
        return { success: false, error: 'Impossible de supprimer ce fournisseur (peut-être lié à des achats).' };
    }
}
