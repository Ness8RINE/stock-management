import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  AlertTriangle
} from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-500">Dernière mise à jour: Aujourd'hui, 10:23</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Revenu Total", value: "45,231.89 DZD", icon: DollarSign, trend: "+20.1%", trendUp: true, color: "text-green-600", bg: "bg-green-100" },
          { title: "Dépenses", value: "12,234.00 DZD", icon: TrendingDown, trend: "-4.5%", trendUp: false, color: "text-red-600", bg: "bg-red-100" },
          { title: "Stock Faible", value: "12 Articles", icon: AlertTriangle, trend: "Urgent", trendUp: false, color: "text-orange-600", bg: "bg-orange-100" },
          { title: "Valeur du Stock", value: "1,203,400 DZD", icon: Package, trend: "+12%", trendUp: true, color: "text-blue-600", bg: "bg-blue-100" },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">{stat.title}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <span className={stat.trendUp ? "text-green-600" : "text-red-600"}>
                {stat.trend}
              </span>
              <span className="text-slate-400 ml-1">par rapport au mois dernier</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area - Placeholder for Chart/Table */}
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Vue d'ensemble des ventes</h3>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <span className="text-slate-400">Graphique des ventes à venir...</span>
          </div>
        </div>

        <div className="md:col-span-3 rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Mouvements Récents</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                    IP
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Iphone 13 Pro</p>
                    <p className="text-xs text-slate-500">Vente #123{item}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">+120.000</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
