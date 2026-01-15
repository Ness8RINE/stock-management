'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import { CustomersTable } from '@/components/customers/CustomersTable';
import { AddCustomerSheet } from '@/components/customers/AddCustomerSheet';

interface Customer {
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
    type: string | null;
    creditLimit: number | null;
}

interface CustomersClientProps {
    initialData: Customer[];
}

export default function CustomersClient({ initialData }: CustomersClientProps) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    function handleAdd() {
        setEditingCustomer(null);
        setIsSheetOpen(true);
    }

    function handleEdit(customer: Customer) {
        setEditingCustomer(customer);
        setIsSheetOpen(true);
    }

    function handleClose() {
        setIsSheetOpen(false);
        setEditingCustomer(null);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 text-green-700 rounded-2xl">
                        <Users className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800">Clients</h2>
                        <p className="text-slate-500">Gérez votre base de clients et leurs paramètres financiers.</p>
                    </div>
                </div>
                <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white h-12 px-6 shadow-lg shadow-green-500/20 gap-2">
                    <Plus className="w-5 h-5" />
                    Nouveau Client
                </Button>
            </div>

            <CustomersTable initialData={initialData} onEdit={handleEdit} />

            <AddCustomerSheet
                isOpen={isSheetOpen}
                onClose={handleClose}
                customer={editingCustomer}
            />
        </div>
    );
}
