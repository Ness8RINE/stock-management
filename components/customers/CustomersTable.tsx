'use client';

import { useState } from 'react';
import { Search, Mail, Phone, MapPin, Building2, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteCustomer } from '@/app/actions/customers';

interface Customer {
    id: string;
    code: string;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    country: string | null;
    initialBalance: number;
    contactPerson: string | null;
    legalStatus: string | null;
}

interface CustomersTableProps {
    initialData: Customer[];
    onEdit: (customer: Customer) => void;
}

export function CustomersTable({ initialData, onEdit }: CustomersTableProps) {
    const [search, setSearch] = useState('');

    const filteredData = initialData.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        (c.email?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );

    async function handleDelete(id: string) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
            const result = await deleteCustomer(id);
            if (!result.success) {
                alert(result.error);
            }
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Rechercher (Nom, Code, Email)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Code</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Client</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Contact</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Localisation</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Solde</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        Aucun client trouvé.
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((c) => (
                                    <tr key={c.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-slate-600">
                                            {c.code}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                                                    <Building2 className="w-4 h-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900">{c.name}</span>
                                                    {c.legalStatus && <span className="text-[10px] text-slate-400 uppercase font-bold">{c.legalStatus}</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 text-xs">
                                                {c.email && (
                                                    <div className="flex items-center gap-1.5 text-slate-500">
                                                        <Mail className="w-3.5 h-3.5" /> {c.email}
                                                    </div>
                                                )}
                                                {(c.phone || c.contactPerson) && (
                                                    <div className="flex items-center gap-1.5 text-slate-900 font-medium">
                                                        <span className="text-slate-400 font-normal">{c.contactPerson || 'Tél:'}</span> {c.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-xs text-slate-600">
                                                <span className="font-medium text-slate-900">{c.country}</span>
                                                {c.address && (
                                                    <div className="flex items-center gap-1 mt-0.5 truncate max-w-[150px]">
                                                        <MapPin className="w-3 h-3 text-slate-400" /> {c.address}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium">
                                            <span className={c.initialBalance < 0 ? 'text-red-600' : 'text-slate-900'}>
                                                {c.initialBalance.toLocaleString()} DZD
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                                    onClick={() => onEdit(c)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => handleDelete(c.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
