'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Truck,
    Users,
    ShoppingCart,
    Banknote,
    FileText,
    Settings,
    LogOut,
    Receipt,
    CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', href: '/' },
    { icon: Package, label: 'Stock', href: '/inventory' },
    { icon: Truck, label: 'Fournisseurs', href: '/suppliers' },
    { icon: Users, label: 'Clients', href: '/customers' },
    { icon: ShoppingCart, label: 'Achats', href: '/purchases' },
    { icon: Banknote, label: 'Ventes', href: '/sales' },
    { icon: Receipt, label: 'Bons/Reçus', href: '/receipts' },
    { icon: CreditCard, label: 'Paiements', href: '/payments' },
    { icon: FileText, label: 'Rapports', href: '/reports' },
    { icon: Users, label: 'Utilisateurs', href: '/users' },
    { icon: Settings, label: 'Paramètres', href: '/settings' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col fixed left-0 top-0 z-50 shadow-sm">
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Package className="text-white w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                    GestionStock
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4 scrollbar-hide">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium",
                                isActive
                                    ? "text-primary-foreground"
                                    : "text-slate-600 hover:text-slate-900"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-primary rounded-xl shadow-md shadow-blue-500/20"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <item.icon className={cn("w-5 h-5 relative z-10", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-700")} />
                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-sidebar-border">
                <button className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 group text-sm font-medium">
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>
    );
}
