import React from 'react';
import { getJurisdictionData } from '../data/centralStore';
import { Info } from 'lucide-react';

export default function AgriculturePage({ selectedJurisdiction }) {
  const jData = getJurisdictionData(selectedJurisdiction.id);

  const kpis = [
    { label: 'SOIL MOISTURE SATURATION', val: '95%', color: 'text-blue-600 font-mono' },
    { label: 'FLOOD STRESS LEVEL', val: 'HIGH', color: 'text-red-600 font-mono' },
    { label: 'PERI-URBAN FARMLAND EXPOSED', val: '18%', color: 'text-amber-600 font-mono' },
    { label: 'CANAL IRRIGATION STATUS', val: '72%', color: 'text-emerald-600 font-mono' }
  ];

  const crops = [
    { crop: 'Wheat', risk: 'HIGH', exposure: 'Low-lying peri-urban fields', detail: 'Silt accumulation in root zones. Shutoff canal sluice gate #4.' },
    { crop: 'Rice / Paddy', risk: 'MODERATE', exposure: 'Flood basin corridor', detail: 'Standing water tolerable up to 24 hours. Monitor drainage outflow.' },
    { crop: 'Vegetable Crops', risk: 'HIGH', exposure: 'Lowland market gardens', detail: 'Immediate root submergence risk. Deploy portable dewatering pump.' }
  ];

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* Low Current Impact Contextual Banner (Section 23) */}
      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs flex items-center justify-between text-blue-900 shadow-xs">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600" />
          <span><strong>Agricultural Sector Status:</strong> Low current impact compared to urban transit & hospital access corridors.</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-blue-200">Low direct emergency priority</span>
      </div>

      {/* 4 Agriculture KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {kpis.map((k, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-[#E2E8F0] p-3 flex flex-col justify-between shadow-xs">
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider">{k.label}</span>
            <span className={`text-2xl font-extrabold tracking-tight font-heading mt-1 ${k.color}`}>
              {k.val}
            </span>
          </div>
        ))}
      </div>

      {/* Crop Stress & Flood Inundation Table */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            AGRICULTURAL CROP STRESS & PERI-URBAN FLOOD EXPOSURE
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">Peri-Urban Agricultural Inventory — {selectedJurisdiction.name}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans text-slate-800">
            <thead className="bg-slate-50 text-[10px] text-slate-500 font-mono uppercase border-b border-[#E2E8F0]">
              <tr>
                <th className="py-2.5 px-3">Crop Type</th>
                <th className="py-2.5 px-3">Flood Submergence Risk</th>
                <th className="py-2.5 px-3">Farmland Zone Exposure</th>
                <th className="py-2.5 px-3">Recommended Mitigation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {crops.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{c.crop}</td>
                  <td className="py-2.5 px-3">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${c.risk === 'HIGH' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                      {c.risk}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{c.exposure}</td>
                  <td className="py-2.5 px-3 text-blue-700 font-medium">{c.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
