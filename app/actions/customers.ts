'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getCustomers() {
    try {
        return await prisma.customer.findMany({
            orderBy: { name: 'asc' },
        });
    } catch (error) {
        console.error('Failed to fetch customers:', error);
        throw new Error('Failed to fetch customers');
    }
}

export async function createCustomer(formData: FormData) {
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
    const type = formData.get('type') as string;
    const creditLimit = parseFloat(formData.get('creditLimit') as string) || 0;

    if (!code || !name) {
        return { success: false, error: 'Le code et le nom sont obligatoires.' };
    }

    try {
        await prisma.customer.create({
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
                type,
                creditLimit,
            },
        });

        revalidatePath('/customers');
        return { success: true };
    } catch (error: any) {
        console.error('Failed to create customer:', error);
        if (error.code === 'P2002') {
            return { success: false, error: 'Ce code client existe déjà.' };
        }
        return { success: false, error: 'Erreur lors de la création du client.' };
    }
}

export async function updateCustomer(id: string, formData: FormData) {
    const code = formData.get('code') as string;
    const name = formData.get('name') as string;
    // ... same as create but with update
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
    const type = formData.get('type') as string;
    const creditLimit = parseFloat(formData.get('creditLimit') as string) || 0;

    if (!code || !name) {
        return { success: false, error: 'Le code et le nom sont obligatoires.' };
    }

    try {
        await prisma.customer.update({
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
                type,
                creditLimit,
            },
        });

        revalidatePath('/customers');
        return { success: true };
    } catch (error: any) {
        console.error('Failed to update customer:', error);
        if (error.code === 'P2002') {
            return { success: false, error: 'Ce code client existe déjà.' };
        }
        return { success: false, error: 'Erreur lors de la modification.' };
    }
}

export async function deleteCustomer(id: string) {
    try {
        await prisma.customer.delete({ where: { id } });
        revalidatePath('/customers');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete customer:', error);
        return { success: false, error: 'Impossible de supprimer ce client (peut-être lié à des ventes).' };
    }
}
