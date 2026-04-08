// src/components/ui/Layout.jsx
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Camera, MessageSquare, Recycle } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  // Definimos las rutas a las que el menú puede navegar
  const navItems = [
    { path: '/', name: 'Dashboard', icon: Home },
    { path: '/mapa', name: 'Mapa Inteligente', icon: MapIcon },
    { path: '/vision', name: 'Detector IA', icon: Camera },
    { path: '/chat', name: 'Asistente Eco', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      
      {/* Sidebar Lateral */}
      <aside className="w-64 flex flex-col bg-white border-r border-slate-200 shadow-sm z-50">
        <div className="px-6 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Recycle className="text-emerald-600 w-8 h-8" />
            <h2 className="font-headline font-bold text-slate-800 text-2xl tracking-tight">EcoIA</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium">Gestión Inteligente</p>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm border border-emerald-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Perfil del Usuario al final del Sidebar */}
        <div className="p-4 mt-auto border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">Mateo</span>
              <span className="text-xs text-slate-500">Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenedor Principal (Aquí se inyecta el Dashboard o el Mapa) */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        <div className="p-8 max-w-7xl mx-auto">
          {/* El componente <Outlet /> es donde React Router pone el contenido de la ruta actual */}
          <Outlet /> 
        </div>
      </main>

    </div>
  );
}