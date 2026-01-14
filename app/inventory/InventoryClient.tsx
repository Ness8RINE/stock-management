'use client';

import { useState } from 'react';
import { InventoryTable } from '@/components/inventory/InventoryTable';
import { AddProductSheet } from '@/components/inventory/AddProductSheet';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { InventoryItem } from '@/app/actions/inventory';

interface InventoryClientProps {
    initialData: InventoryItem[];
    categories: { id: string; name: string }[];
    units: { id: string; name: string; symbol: string }[];
}

export default function InventoryClient({ initialData, categories, units }: InventoryClientProps) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Stock</h2>
                    <p className="text-slate-500">
                        Gérez votre inventaire, suivez les niveaux de stock et les dates d'expiration.
                    </p>
                </div>
                <Button onClick={() => setIsSheetOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Plus className="w-4 h-4" />
                    Nouveau Produit
                </Button>
            </div>

            <InventoryTable initialData={initialData} />

            <AddProductSheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                categories={categories}
                units={units}
            />
        </div>
    );
}
