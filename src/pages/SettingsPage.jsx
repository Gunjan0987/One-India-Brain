import React from 'react';
import { INITIAL_DATA } from '../data/centralStore';
import { Settings, MapPin, Sliders } from 'lucide-react';

export default function SettingsPage({ selectedJurisdiction, onSelectJurisdiction }) {
  return (
    <div className="space-y-4 font-sans text-slate-900 max-w-4xl">
      {/* Header Banner */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex items-center justify-between shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Settings className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
              System & Operational Configuration
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            One India Brain Command Center Preferences & Dataset Controls
          </p>
        </div>
      </div>

      {/* Jurisdiction Preference Card */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-[#E2E8F0] flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          Active Command Jurisdiction
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-500 font-semibold block uppercase text-[10px]">Select Active Jurisdiction</label>
            <select
              value={selectedJurisdiction.id}
              onChange={(e) => {
                const found = INITIAL_DATA.jurisdictions.find(j => j.id === e.target.value);
                if (found) onSelectJurisdiction(found);
              }}
              className="w-full bg-slate-50 text-slate-900 border border-[#CBD5E1] px-3 py-2 rounded-md font-semibold focus:outline-none cursor-pointer"
            >
              {INITIAL_DATA.jurisdictions.map(j => (
                <option key={j.id} value={j.id}>
                  {j.name} ({j.state})
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] space-y-1 text-slate-700 text-[11px]">
            <span className="font-bold text-slate-900 block">Current Region Parameters:</span>
            <p>Center Coordinates: <span className="font-mono text-slate-600">{selectedJurisdiction.center.join(', ')}</span></p>
            <p>Map Zoom Baseline: <span className="font-mono text-slate-600">{selectedJurisdiction.zoom}x</span></p>
          </div>
        </div>
      </div>

      {/* GIS & Simulation Preferences */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-[#E2E8F0] flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-blue-600" />
          GIS Map & Telemetry Defaults
        </h3>

        <div className="space-y-3 text-xs text-slate-700">
          <div className="flex items-center justify-between p-2.5 rounded-md bg-slate-50 border border-[#E2E8F0]">
            <div>
              <span className="font-bold text-slate-900 block">Default Map Layers</span>
              <span className="text-[11px] text-slate-500">Enable all 5 operational layers on page load</span>
            </div>
            <input type="checkbox" defaultChecked className="accent-blue-600 rounded cursor-pointer" />
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-md bg-slate-50 border border-[#E2E8F0]">
            <div>
              <span className="font-bold text-slate-900 block">Demo Environment Disclosure</span>
              <span className="text-[11px] text-slate-500">Display simulated scenario banner on all operational views</span>
            </div>
            <input type="checkbox" defaultChecked disabled className="accent-blue-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
