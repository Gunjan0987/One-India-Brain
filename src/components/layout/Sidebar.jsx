import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Car, HeartPulse, ShieldAlert, Waves, 
  Zap, Sprout, Building2, Cpu, Bell, Sliders, Settings
} from 'lucide-react';

export default function Sidebar() {
  const sections = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Command Center', path: '/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'PUBLIC SERVICES',
      items: [
        { label: 'Transport', path: '/transport', icon: Car },
        { label: 'Healthcare', path: '/healthcare', icon: HeartPulse },
        { label: 'Disaster Management', path: '/disaster', icon: ShieldAlert },
        { label: 'Water Management', path: '/water', icon: Waves },
        { label: 'Electricity', path: '/electricity', icon: Zap },
        { label: 'Agriculture', path: '/agriculture', icon: Sprout },
        { label: 'Municipal Services', path: '/municipal', icon: Building2 }
      ]
    },
    {
      title: 'DECISION SUPPORT',
      items: [
        { label: 'AI Insights', path: '/ai-insights', icon: Cpu },
        { label: 'Alerts', path: '/alerts', icon: Bell },
        { label: 'Scenario Simulation', path: '/simulation', icon: Sliders }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Settings', path: '/settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-[240px] bg-white border-r border-[#E5E7EB] flex flex-col justify-between shrink-0 select-none h-screen sticky top-0 font-sans z-40 shadow-sm">
      <div>
        {/* Top Brand Logo Header Area (New Wide One India Brain Command Centre Logo) */}
        <div className="px-3 py-3.5 border-b border-[#E5E7EB] flex items-center justify-center">
          <img
            src="/one-india-brain-command-centre-logo.svg"
            alt="One India Brain — Command Centre Logo"
            className="w-[210px] max-w-full h-auto object-contain max-h-[58px]"
          />
        </div>

        {/* Navigation Section Groups */}
        <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-140px)]">
          {sections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <h2 className="text-[10px] font-bold text-slate-400 px-2 tracking-wider uppercase font-mono">
                {sec.title}
              </h2>
              <nav className="space-y-0.5">
                {sec.items.map(item => {
                  const IconComp = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-2.5 py-2 rounded text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-900 font-semibold border-l-2 border-blue-600'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                          <span className="truncate">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Operations Control Footer */}
      <div className="p-3 border-t border-[#E5E7EB] space-y-1.5 font-sans bg-slate-50">
        <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider text-[10px]">
          OPERATIONS CONTROL
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            System operational
          </span>
          <span className="text-slate-400">Demo env</span>
        </div>
      </div>
    </aside>
  );
}
