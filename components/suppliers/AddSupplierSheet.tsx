'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Save, Globe, Building2, UserCircle, CreditCard, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createSupplier, updateSupplier } from '@/app/actions/suppliers';

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

interface AddSupplierSheetProps {
    isOpen: boolean;
    onClose: () => void;
    supplier?: Supplier | null;
}

export function AddSupplierSheet({ isOpen, onClose, supplier }: AddSupplierSheetProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError('');

        const result = supplier
            ? await updateSupplier(supplier.id, formData)
            : await createSupplier(formData);

        if (result.success) {
            onClose();
        } else {
            setError(result.error || 'Une erreur est survenue.');
        }
        setLoading(false);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">
                                        {supplier ? 'Modifier Fournisseur' : 'Nouveau Fournisseur'}
                                    </h2>
                                    <p className="text-xs text-slate-500">Saisissez les informations détaillées</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-200">
                                <X className="w-5 h-5 text-slate-500" />
                            </Button>
                        </div>

                        <form action={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
                            {error && (
                                <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                    {error}
                                </div>
                            )}

                            {/* Section 1: Identité */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                                    <Building2 className="w-4 h-4" />
                                    <span>Identité & Contact</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">Code Fournisseur *</label>
                                        <Input name="code" defaultValue={supplier?.code} placeholder="FTR-001" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">Nom du fournisseur *</label>
                                        <Input name="name" defaultValue={supplier?.name} placeholder="Ex: Medtronic International" required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">Personne à contacter</label>
                                        <div className="relative">
                                            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input name="contactPerson" defaultValue={supplier?.contactPerson || ''} className="pl-10" placeholder="Nom du responsable" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">Statut Juridique</label>
                                        <Input name="legalStatus" defaultValue={supplier?.legalStatus || ''} placeholder="Ex: SARL, EURL" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">Email</label>
                                        <Input name="email" type="email" defaultValue={supplier?.email || ''} placeholder="contact@..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">Téléphone</label>
                                        <Input name="phone" defaultValue={supplier?.phone || ''} placeholder="+213..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">Fax</label>
                                        <Input name="fax" defaultValue={supplier?.fax || ''} placeholder="+213..." />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Fiscalité & Localisation */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-2 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                                    <Hash className="w-4 h-4" />
                                    <span>Fiscalité & Localisation</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">N° RC</label>
                                        <Input name="rcNum" defaultValue={supplier?.rcNum || ''} placeholder="Registre Commerce" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">MF (Matricule Fiscal)</label>
                                        <Input name="mfNum" defaultValue={supplier?.mfNum || ''} placeholder="Matricule Fiscal" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">NIS</label>
                                        <Input name="nisNum" defaultValue={supplier?.nisNum || ''} placeholder="NIS" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">AI (Article Imposition)</label>
                                        <Input name="aiNum" defaultValue={supplier?.aiNum || ''} placeholder="AI" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">Pays d'origine</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input name="country" defaultValue={supplier?.country || 'Algérie'} className="pl-10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">Adresse</label>
                                        <Input name="address" defaultValue={supplier?.address || ''} placeholder="Adresse complète" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Finance */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-2 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                                    <CreditCard className="w-4 h-4" />
                                    <span>Finance & Solde</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">Solde Initial (DZD)</label>
                                        <Input name="initialBalance" type="number" step="0.01" defaultValue={supplier?.initialBalance || 0} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 tracking-tight">Compte Bancaire (RIB)</label>
                                        <Input name="bankAccount" defaultValue={supplier?.bankAccount || ''} placeholder="RIB Bancaire" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 pb-4">
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 shadow-lg shadow-blue-500/20" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Traitement...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-5 w-5" />
                                            {supplier ? 'Enregistrer les modifications' : 'Enregistrer le fournisseur'}
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
