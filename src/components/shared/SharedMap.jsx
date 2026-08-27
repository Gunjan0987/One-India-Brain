import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Layers } from 'lucide-react';
import { getJurisdictionData } from '../../data/centralStore';

function MapCameraController({ focusTarget, center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (focusTarget && focusTarget.lat && focusTarget.lng) {
      map.flyTo([focusTarget.lat, focusTarget.lng], 14, { duration: 1.2 });
    } else if (center) {
      map.setView(center, zoom);
    }
  }, [focusTarget, center, zoom, map]);

  return null;
}

const createCustomIcon = (emoji, borderColor, bg = '#FFFFFF') => {
  return L.divIcon({
    className: 'shared-map-marker',
    html: `
      <div style="
        background: ${bg};
        border: 2.5px solid ${borderColor};
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      ">
        ${emoji}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const hospitalIcon = createCustomIcon('🏥', '#dc2626');
const roadIcon = createCustomIcon('🚧', '#d97706');
const substationIcon = createCustomIcon('⚡', '#ca8a04');
const waterIcon = createCustomIcon('💧', '#2563eb');
const rescueIcon = createCustomIcon('🚒', '#059669');

export default function SharedMap({ selectedJurisdiction, focusTarget, height = '430px', activeLayersFilter = null }) {
  const [layers, setLayers] = useState({
    hospitals: true,
    roads: true,
    waterlogging: true,
    substations: true,
    rescue: true
  });
  const [isLayersOpen, setIsLayersOpen] = useState(false);

  const toggleLayer = (key) => setLayers(prev => ({ ...prev, [key]: !prev[key] }));

  const jData = getJurisdictionData(selectedJurisdiction.id);
  const [lat, lng] = selectedJurisdiction.center;

  const hospitalMarkers = jData.hospitals.map(h => ({
    type: 'hospital',
    name: h.name,
    lat: h.coords[0],
    lng: h.coords[1],
    accessRisk: h.risk,
    nearestRoad: h.nearestRoad || 'Minto Bridge Underpass',
    predictedDelay: h.delay || '+17 min',
    recommendedAction: h.action || 'Pre-route emergency vehicles'
  }));

  const roadMarkers = jData.transportHotspots.map(r => ({
    type: 'road',
    name: r.road,
    lat: r.coords[0],
    lng: r.coords[1],
    blockageProb: r.blockageProb || jData.incident.roadBlockageProbability,
    predictedDelay: r.delay,
    hospitalImpact: r.hospitalImpact || '2 facilities',
    recommendedAction: 'Reroute emergency vehicles via Elevated Bypass'
  }));

  const waterMarkers = jData.waterZones.map(w => ({
    type: 'waterlogging',
    name: `Waterlogging — ${w.area}`,
    lat: w.coords[0],
    lng: w.coords[1],
    riskPct: jData.incident.waterloggingProbability,
    affectedArea: w.area,
    drainageResponse: `${jData.incident.drainagePumpsActivatedCount} pumps activated`
  }));

  const substationMarkers = jData.substations.map(s => ({
    type: 'substation',
    name: s.name,
    lat: s.coords[0],
    lng: s.coords[1],
    substationRisk: `${s.failureProbPct}%`,
    criticalFacilities: s.facilities || 'City Trauma Center ICU',
    recommendedAction: s.action || 'Protect critical supply & deploy sandbags'
  }));

  const rescueMarkers = [
    {
      type: 'rescue',
      name: 'NDRF Emergency Squad Alpha',
      lat: lat + 0.0080,
      lng: lng - 0.0250,
      status: '12 crew members on field',
      action: 'Dewatering & barrier deployment'
    }
  ];

  const polygonZone = [
    [lat + 0.0261, lng + 0.0010],
    [lat + 0.0241, lng + 0.0260],
    [lat + 0.0111, lng + 0.0210],
    [lat + 0.0141, lng - 0.0040]
  ];

  return (
    <div className="relative w-full rounded-lg border border-[#E2E8F0] bg-white overflow-hidden shadow-xs font-sans" style={{ height }}>
      {/* Compact Layer Control (Layers ▾ Light UI) */}
      <div className="absolute top-3 left-3 z-[1000]">
        <button
          onClick={() => setIsLayersOpen(!isLayersOpen)}
          className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-md border border-[#CBD5E1] text-xs text-slate-800 shadow-sm flex items-center gap-2 hover:bg-slate-50 font-semibold cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Layers ▾</span>
        </button>

        {isLayersOpen && (
          <div className="mt-1 bg-white/98 backdrop-blur-md p-2.5 rounded-md border border-[#CBD5E1] text-xs shadow-lg space-y-1.5 w-48 font-sans">
            {(!activeLayersFilter || activeLayersFilter.includes('hospitals')) && (
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer text-[11px] hover:text-slate-900 font-medium">
                <input type="checkbox" checked={layers.hospitals} onChange={() => toggleLayer('hospitals')} className="rounded accent-red-600 cursor-pointer" />
                <span>Hospitals (Red)</span>
              </label>
            )}

            {(!activeLayersFilter || activeLayersFilter.includes('roads')) && (
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer text-[11px] hover:text-slate-900 font-medium">
                <input type="checkbox" checked={layers.roads} onChange={() => toggleLayer('roads')} className="rounded accent-amber-500 cursor-pointer" />
                <span>Road Risk (Amber)</span>
              </label>
            )}

            {(!activeLayersFilter || activeLayersFilter.includes('waterlogging')) && (
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer text-[11px] hover:text-slate-900 font-medium">
                <input type="checkbox" checked={layers.waterlogging} onChange={() => toggleLayer('waterlogging')} className="rounded accent-blue-600 cursor-pointer" />
                <span>Waterlogging (Blue)</span>
              </label>
            )}

            {(!activeLayersFilter || activeLayersFilter.includes('substations')) && (
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer text-[11px] hover:text-slate-900 font-medium">
                <input type="checkbox" checked={layers.substations} onChange={() => toggleLayer('substations')} className="rounded accent-yellow-600 cursor-pointer" />
                <span>Substations (Yellow)</span>
              </label>
            )}

            {(!activeLayersFilter || activeLayersFilter.includes('rescue')) && (
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer text-[11px] hover:text-slate-900 font-medium">
                <input type="checkbox" checked={layers.rescue} onChange={() => toggleLayer('rescue')} className="rounded accent-emerald-600 cursor-pointer" />
                <span>Response Teams (Green)</span>
              </label>
            )}
          </div>
        )}
      </div>

      {/* Map Legend Bar (Section 10) */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-md px-3 py-1 rounded-md border border-[#CBD5E1] text-[10px] text-slate-700 shadow-sm flex items-center gap-3 font-medium">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600"></span> Hospital</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Road Risk</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Waterlogging</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Substation</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600"></span> Response Team</span>
      </div>

      {/* Map Container */}
      <MapContainer
        center={selectedJurisdiction.center}
        zoom={selectedJurisdiction.zoom}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <MapCameraController focusTarget={focusTarget} center={selectedJurisdiction.center} zoom={selectedJurisdiction.zoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {layers.waterlogging && (
          <Polygon positions={polygonZone} pathOptions={{ color: '#dc2626', fillColor: '#dc2626', fillOpacity: 0.18, weight: 1.5 }}>
            <Popup>
              <div className="p-1 text-xs space-y-1 font-sans">
                <p className="font-bold text-slate-900 text-sm">{selectedJurisdiction.name} — Drainage Basin Zone</p>
                <p className="text-red-600 font-semibold">Waterlogging risk: 88%</p>
                <p className="text-slate-600 text-[11px]">Drainage response: 4 pumps activated</p>
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Hospital Markers */}
        {layers.hospitals && hospitalMarkers.map((item, idx) => (
          <Marker key={`h-${idx}`} position={[item.lat, item.lng]} icon={hospitalIcon}>
            <Popup>
              <div className="p-1 text-xs space-y-1 font-sans text-slate-900">
                <p className="font-bold text-slate-900 text-sm pb-1 border-b border-slate-200">{item.name}</p>
                <div className="space-y-0.5 pt-1 text-slate-700">
                  <p><span className="text-slate-500">Access risk:</span> <strong className="text-red-600 font-bold">{item.accessRisk}</strong></p>
                  <p><span className="text-slate-500">Nearest road:</span> <strong>{item.nearestRoad}</strong></p>
                  <p><span className="text-slate-500">Predicted delay:</span> <strong className="text-amber-600">{item.predictedDelay}</strong></p>
                  <p className="pt-1 text-[11px] text-blue-700 font-medium"><strong>Action:</strong> {item.recommendedAction}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Road Markers */}
        {layers.roads && roadMarkers.map((item, idx) => (
          <Marker key={`r-${idx}`} position={[item.lat, item.lng]} icon={roadIcon}>
            <Popup>
              <div className="p-1 text-xs space-y-1 font-sans text-slate-900">
                <p className="font-bold text-slate-900 text-sm pb-1 border-b border-slate-200">{item.name}</p>
                <div className="space-y-0.5 pt-1 text-slate-700">
                  <p><span className="text-slate-500">Blockage prob:</span> <strong className="text-amber-600">{item.blockageProb}%</strong></p>
                  <p><span className="text-slate-500">Predicted delay:</span> <strong className="text-red-600">{item.predictedDelay}</strong></p>
                  <p><span className="text-slate-500">Hospital impact:</span> <strong>{item.hospitalImpact}</strong></p>
                  <p className="pt-1 text-[11px] text-blue-700 font-medium"><strong>Action:</strong> {item.recommendedAction}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Waterlogging Markers */}
        {layers.waterlogging && waterMarkers.map((item, idx) => (
          <Marker key={`w-${idx}`} position={[item.lat, item.lng]} icon={waterIcon}>
            <Popup>
              <div className="p-1 text-xs space-y-1 font-sans text-slate-900">
                <p className="font-bold text-slate-900 text-sm pb-1 border-b border-slate-200">{item.name}</p>
                <div className="space-y-0.5 pt-1 text-slate-700">
                  <p><span className="text-slate-500">Waterlogging risk:</span> <strong className="text-blue-600">{item.riskPct}%</strong></p>
                  <p><span className="text-slate-500">Affected area:</span> <strong>{item.affectedArea}</strong></p>
                  <p><span className="text-slate-500">Drainage response:</span> <strong className="text-emerald-600">{item.drainageResponse}</strong></p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Substation Markers */}
        {layers.substations && substationMarkers.map((item, idx) => (
          <Marker key={`s-${idx}`} position={[item.lat, item.lng]} icon={substationIcon}>
            <Popup>
              <div className="p-1 text-xs space-y-1 font-sans text-slate-900">
                <p className="font-bold text-slate-900 text-sm pb-1 border-b border-slate-200">{item.name}</p>
                <div className="space-y-0.5 pt-1 text-slate-700">
                  <p><span className="text-slate-500">Substation risk:</span> <strong className="text-yellow-600">{item.substationRisk}</strong></p>
                  <p><span className="text-slate-500">Nearby ICU feeders:</span> <strong>{item.criticalFacilities}</strong></p>
                  <p className="pt-1 text-[11px] text-blue-700 font-medium"><strong>Action:</strong> {item.recommendedAction}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Rescue Team Markers */}
        {layers.rescue && rescueMarkers.map((item, idx) => (
          <Marker key={`res-${idx}`} position={[item.lat, item.lng]} icon={rescueIcon}>
            <Popup>
              <div className="p-1 text-xs space-y-1 font-sans text-slate-900">
                <p className="font-bold text-slate-900 text-sm pb-1 border-b border-slate-200">{item.name}</p>
                <div className="space-y-0.5 pt-1 text-slate-700">
                  <p><span className="text-slate-500">Status:</span> <strong className="text-emerald-600">{item.status}</strong></p>
                  <p><span className="text-slate-500">Action:</span> <strong>{item.action}</strong></p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
