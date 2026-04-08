import KpiCard from '../components/ui/KpiCard';

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Cabecera de Bienvenida */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-headline tracking-tight">Bienvenido, Mateo</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Sistema Operativo: 98% eficiencia en rutas.
          </p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add_circle</span>
          Programar Ruta
        </button>
      </div>

      {/* Grid de Métricas usando nuestro Componente Reutilizable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Ecotachos Críticos" value="24" subtitle="+5 última hora"
          icon="warning" colorClass="border-red-600" 
          iconBgClass="bg-red-100" iconColorClass="text-red-600" 
        />
        <KpiCard 
          title="Alertas IA Hoy" value="112" subtitle="Rebosamiento"
          icon="psychology" colorClass="border-blue-600" 
          iconBgClass="bg-blue-100" iconColorClass="text-blue-600" 
        />
        <KpiCard 
          title="Chatarra Express" value="08" subtitle="Pendientes"
          icon="local_shipping" colorClass="border-slate-400" 
          iconBgClass="bg-slate-100" iconColorClass="text-slate-600" 
        />
        <KpiCard 
          title="Impacto (Kg)" value="1,420" subtitle="Meta: 85%"
          icon="recycling" colorClass="border-emerald-600" 
          iconBgClass="bg-emerald-100" iconColorClass="text-emerald-600" 
        />
      </div>

      {/* Gráficos y Actividad (Espacios reservados para el resto del equipo) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Gráfico */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg text-slate-900 mb-2 font-headline">Eficiencia de Llenado</h3>
          <p className="text-slate-500 text-sm mb-6">Real vs Predicho por EcoIA</p>
          <div className="h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400">
            [Aquí el Dev 2 integrará los gráficos de Recharts]
          </div>
        </div>

        {/* Lista de Actividad */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg text-slate-900 mb-6 font-headline">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
              <div className="p-2 bg-red-100 rounded-full text-red-600">
                <span className="material-symbols-outlined">sensors</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Av. Daniel L. Borja</h4>
                <p className="text-xs text-slate-500">Llenado 92% • Pendiente</p>
              </div>
            </div>
            {/* Puedes agregar más items aquí */}
          </div>
        </div>

      </div>
    </div>
  );
}