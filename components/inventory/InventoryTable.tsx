'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    ChevronRight,
    MoreHorizontal,
    Plus,
    Search,
    Filter,
    AlertTriangle,
    Calendar
} from 'lucide-react';
import type { InventoryItem } from '@/app/actions/inventory';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface InventoryTableProps {
    initialData: InventoryItem[];
}

export function InventoryTable({ initialData }: InventoryTableProps) {
    const [search, setSearch] = useState('');
    const [expandedRows, setExpandedRows] = useState<string[]>([]);

    const toggleRow = (id: string) => {
        setExpandedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const filteredData = initialData.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-4">
            {/* Tollbar */}
            <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Rechercher (Nom, SKU...)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filtres
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Plus className="w-4 h-4" />
                        Nouveau Produit
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700 w-10"></th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Produit</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Catégorie</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Stock Total</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Statut</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        Aucun produit trouvé.
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item) => (
                                    <>
                                        <tr
                                            key={item.id}
                                            className={cn(
                                                "hover:bg-slate-50 transition-colors cursor-pointer group",
                                                expandedRows.includes(item.id) && "bg-slate-50"
                                            )}
                                            onClick={() => toggleRow(item.id)}
                                        >
                                            <td className="px-6 py-4">
                                                {item.batches.length > 0 && (
                                                    <div className="p-1 rounded-md hover:bg-slate-200 transition-colors w-min">
                                                        {expandedRows.includes(item.id) ? (
                                                            <ChevronDown className="w-4 h-4 text-slate-500" />
                                                        ) : (
                                                            <ChevronRight className="w-4 h-4 text-slate-500" />
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900">{item.name}</span>
                                                    <span className="text-xs text-slate-500">SKU: {item.sku}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">
                                                    {item.category}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="font-mono font-medium">
                                                    {item.totalStock} <span className="text-slate-400 text-xs">{item.unit}</span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={item.status} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-200">
                                                    <MoreHorizontal className="w-4 h-4 text-slate-500" />
                                                </Button>
                                            </td>
                                        </tr>

                                        {/* Expanded Content (Batches) */}
                                        <AnimatePresence>
                                            {expandedRows.includes(item.id) && (
                                                <tr>
                                                    <td colSpan={6} className="p-0 border-none">
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="overflow-hidden bg-slate-50 border-b border-slate-100"
                                                        >
                                                            <div className="px-6 py-4 pl-16 grid gap-4">
                                                                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                                                                    Détails des lots (Traceability)
                                                                </h4>
                                                                {item.batches.length === 0 ? (
                                                                    <p className="text-sm text-slate-400 italic">Aucun lot actif.</p>
                                                                ) : (
                                                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                                                        {item.batches.map((batch, idx) => (
                                                                            <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-sm">
                                                                                <div className="flex justify-between items-start mb-2">
                                                                                    <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-xs">
                                                                                        Lot: {batch.batchNumber}
                                                                                    </span>
                                                                                    <span className="font-medium text-slate-900">
                                                                                        {batch.quantity} {item.unit}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                                                                                    <PackageIcon className="w-3 h-3" />
                                                                                    {batch.warehouse}
                                                                                </div>
                                                                                {/* Expiry Date */}
                                                                                {batch.expiryDate && (
                                                                                    <div className={cn(
                                                                                        "flex items-center gap-2 text-xs font-medium mt-2 p-1.5 rounded-md",
                                                                                        isApproachingExpiry(new Date(batch.expiryDate))
                                                                                            ? "bg-red-50 text-red-700"
                                                                                            : "bg-green-50 text-green-700"
                                                                                    )}>
                                                                                        <Calendar className="w-3 h-3" />
                                                                                        Exp: {format(new Date(batch.expiryDate), 'dd MMM yyyy', { locale: fr })}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    </td>
                                                </tr>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between text-xs text-slate-500">
                    <span>{filteredData.length} produits affichés</span>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'IN_STOCK') {
        return (
            <Badge variant="success" className="gap-1.5 pl-1.5 pr-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                En stock
            </Badge>
        );
    }
    if (status === 'LOW_STOCK') {
        return (
            <Badge variant="warning" className="gap-1.5 pl-1.5 pr-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Stock faible
            </Badge>
        );
    }
    return (
        <Badge variant="danger" className="gap-1.5 pl-1.5 pr-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Rupture
        </Badge>
    );
}

// Icon helper
function PackageIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22v-10" />
        </svg>
    )
}

function isApproachingExpiry(date: Date) {
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return date < threeMonthsFromNow;
}
