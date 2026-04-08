export default function KpiCard({ title, icon, value, subtitle, colorClass, iconBgClass, iconColorClass }) {
  return (
    <div className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden group`}>
      {/* Acento de color sutil en el lateral */}
      <div className={`absolute top-0 left-0 w-1 h-full ${colorClass}`} />

      {/* Contenedor principal con flex para alinear a los extremos */}
      <div className="flex justify-between items-start gap-3">
        {/* Contenedor de Texto con gap muy reducido para compactar */}
        <div className="flex flex-col gap-0.5">
          <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-widest block leading-none">
            {title}
          </span>
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight block leading-none mt-1">
            {value}
          </span>
          <span className={`text-[11px] font-medium block leading-snug ${iconColorClass}`}>
            {subtitle}
          </span>
        </div>

        {/* Contenedor del Icono - Agrandado */}
        <div className={`flex items-center justify-center w-16 h-16 rounded-2xl transition-colors duration-300 ${iconBgClass} bg-opacity-10 group-hover:bg-opacity-20`}>
          {/* Tamaño de icono más grande [36px o 40px] */}
          <span className={`material-symbols-outlined text-[38px] ${iconColorClass}`}>
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
}