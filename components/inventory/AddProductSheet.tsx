'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { createProduct } from '@/app/actions/inventory';

interface AddProductSheetProps {
    isOpen: boolean;
    onClose: () => void;
    categories: { id: string; name: string }[];
    units: { id: string; name: string; symbol: string }[];
}

export function AddProductSheet({ isOpen, onClose, categories, units }: AddProductSheetProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError('');

        const result = await createProduct(formData);

        if (result.success) {
            onClose();
            // Optional: Reset form or show success toast
        } else {
            setError(result.error || 'Une erreur est survenue.');
        }
        setLoading(false);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={onClose}
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-xl font-semibold text-slate-800">Nouveau Produit</h2>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="w-5 h-5 text-slate-500" />
                            </Button>
                        </div>

                        <form action={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                            {error && (
                                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">SKU / Code *</label>
                                        <Input name="sku" placeholder="REF-001" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Stock Min.</label>
                                        <Input name="minStock" type="number" defaultValue="10" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Nom du produit *</label>
                                    <Input name="name" placeholder="Ex: Paracétamol 500mg" required />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Catégorie *</label>
                                        <Select name="categoryId" required>
                                            <option value="">Sélectionner...</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Unité *</label>
                                        <Select name="unitId" required>
                                            <option value="">Sélectionner...</option>
                                            {units.map(u => (
                                                <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">TVA (%)</label>
                                    <Select name="tva" defaultValue="19">
                                        <option value="0">0%</option>
                                        <option value="9">9%</option>
                                        <option value="19">19%</option>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Description</label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Création...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Enregistrer le produit
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
