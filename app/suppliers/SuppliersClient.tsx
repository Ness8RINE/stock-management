'use client';

import { useState } from 'react';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { AddSupplierSheet } from '@/components/suppliers/AddSupplierSheet';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Supplier {
    id: string;
    code: string;
    name: string;
    phone: string | null;
    fax: string | null;
    email: string | null;
    address: string | null;
    country: string | null;
    initialBalance: number;
    contactPerson: string | null;
    legalStatus: string | null;
    rcNum: string | null;
    mfNum: string | null;
    nisNum: string | null;
    aiNum: string | null;
    bankAccount: string | null;
}

interface SuppliersClientProps {
    initialData: Supplier[];
}

export default function SuppliersClient({ initialData }: SuppliersClientProps) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

    function handleAdd() {
        setEditingSupplier(null);
        setIsSheetOpen(true);
    }

    function handleEdit(supplier: any) {
        setEditingSupplier(supplier);
        setIsSheetOpen(true);
    }

    function handleClose() {
        setIsSheetOpen(false);
        setEditingSupplier(null);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-800">Fournisseurs</h2>
                    <p className="text-slate-500">
                        Gérez vos partenaires commerciaux et vos sources d'approvisionnement.
                    </p>
                </div>
                <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-11 px-6 shadow-lg shadow-blue-500/20">
                    <Plus className="w-4 h-4" />
                    Nouveau Fournisseur
                </Button>
            </div>

            <SuppliersTable initialData={initialData as any} onEdit={handleEdit} />

            <AddSupplierSheet
                isOpen={isSheetOpen}
                onClose={handleClose}
                supplier={editingSupplier}
            />
        </div>
    );
}
