import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Bell } from 'lucide-react';
import { INITIAL_DATA } from '../../data/centralStore';

const ROUTE_HEADERS = {
  '/dashboard': { title: 'Command Center', desc: 'Cross-domain emergency overview' },
  '/transport': { title: 'Transport Operations', desc: 'Monitor mobility, congestion and emergency routing.' },
  '/healthcare': { title: 'Healthcare Operations', desc: 'Hospital capacity, ICU bed availability, and ambulance staging.' },
  '/disaster': { title: 'Disaster Management', desc: 'Emergency response, hazard zones, and weather monitoring.' },
  '/water': { title: 'Water Management', desc: 'Waterlogging, drainage saturation, pumps, and flood zones.' },
  '/electricity': { title: 'Electricity Infrastructure', desc: 'Substation grid, power outages, and hospital feeder protection.' },
  '/agriculture': { title: 'Agriculture', desc: 'Soil moisture saturation, crop flood risk, and canal gates.' },
  '/municipal': { title: 'Municipal Services', desc: 'Public complaints, drainage maintenance, and response crews.' },
  '/ai-insights': { title: 'AI Insights', desc: 'Cross-domain emergency relationships & predictive analysis.' },
  '/alerts': { title: 'Alerts', desc: 'Operational emergency alert queue and dispatch actions.' },
  '/simulation': { title: 'Scenario Simulation', desc: 'Test how a disruption affects multiple public services.' },
  '/settings': { title: 'System Settings', desc: 'Jurisdiction preferences, map defaults, and data configuration.' }
};

export default function TopHeader({ selectedJurisdiction, onSelectJurisdiction }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const meta = ROUTE_HEADERS[location.pathname] || {
    title: 'Command Center',
    desc: 'Cross-domain emergency overview'
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-[#E5E7EB] px-6 py-3 sticky top-0 z-30 flex items-center justify-between font-sans shadow-xs">
      {/* LEFT: Page Title & Description */}
      <div>
        <h1 className="text-base font-bold text-slate-900 tracking-tight font-heading">
          {meta.title}
        </h1>
        <p className="text-xs text-slate-500">
          {meta.desc}
        </p>
      </div>

      {/* RIGHT: Controls (Jurisdiction selector, Platform Operational status, 3 Active Alerts button) */}
      <div className="flex items-center gap-3 text-xs" ref={dropdownRef}>
        {/* Jurisdiction Selector [Delhi NCR ▼] */}
        <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-[#CBD5E1] text-slate-800 font-medium">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <select
            value={selectedJurisdiction.id}
            onChange={(e) => {
              const found = INITIAL_DATA.jurisdictions.find(j => j.id === e.target.value);
              if (found) onSelectJurisdiction(found);
            }}
            className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer border-none py-0 font-sans text-xs"
          >
            {INITIAL_DATA.jurisdictions.map(j => (
              <option key={j.id} value={j.id} className="bg-white text-slate-900">
                {j.name} ({j.state})
              </option>
            ))}
          </select>
        </div>

        {/* System Operational Indicator [● Platform Operational] */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 border border-[#CBD5E1] text-slate-700 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Platform Operational</span>
        </div>

        {/* Notifications Alert Button [🔔 3 Active Alerts] */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-1.5 rounded bg-slate-50 border border-[#CBD5E1] text-slate-800 hover:bg-slate-100 transition-colors relative flex items-center gap-1.5 px-2.5 cursor-pointer"
            title="Operational Alerts"
          >
            <Bell className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold text-xs text-slate-800">3 Active Alerts</span>
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {/* Notifications Dropdown (Light Theme) */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#CBD5E1] rounded-md shadow-xl p-3 z-50 text-xs space-y-2 font-sans">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Active Emergency Alerts</span>
                <span className="text-[10px] text-blue-600 font-mono font-bold">3 Alerts</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {INITIAL_DATA.alerts.slice(0, 3).map((alt) => (
                  <div key={alt.id} className="p-2 rounded bg-slate-50 border border-[#E2E8F0] space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 truncate text-[11px]">{alt.title}</span>
                      <span className={`text-[9px] font-mono px-1 rounded ${alt.severity === 'CRITICAL' ? 'bg-red-100 text-red-700 border border-red-200 font-bold' : 'bg-amber-100 text-amber-800 border border-amber-200 font-bold'}`}>
                        {alt.severity}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600 truncate">{alt.location} &bull; {alt.time}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setIsNotificationsOpen(false);
                  navigate('/alerts');
                }}
                className="w-full text-center text-blue-600 hover:text-blue-700 py-1 text-[11px] font-semibold border-t border-[#E2E8F0] block cursor-pointer"
              >
                Open alert management center &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
