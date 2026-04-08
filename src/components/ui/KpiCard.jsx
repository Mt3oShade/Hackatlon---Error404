export default function KpiCard({ title, icon, value, subtitle, colorClass, iconBgClass, iconColorClass }) {
  return (
    <div className={`bg-white p-6 rounded-xl border-l-4 ${colorClass} shadow-sm hover:translate-y-[-4px] transition-transform`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-lg ${iconBgClass}`}>
          <span className={`material-symbols-outlined ${iconColorClass}`}>{icon}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl font-extrabold text-slate-900 font-headline">{value}</span>
        <span className={`text-xs font-medium mt-1 ${iconColorClass}`}>{subtitle}</span>
      </div>
    </div>
  );
}