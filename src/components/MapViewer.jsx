import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Layers, MapPin } from 'lucide-react';

// Re-centering & Camera Focus Helper
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

// Marker Icon Factory
const createMarkerIcon = (emoji, borderColor) => {
  return L.divIcon({
    className: 'eoc-map-marker',
    html: `
      <div style="
        background: #131b2e;
        border: 2px solid ${borderColor};
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      ">
        ${emoji}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

const hospitalIcon = createMarkerIcon('🏥', '#ef4444');
const roadIcon = createMarkerIcon('🚧', '#f59e0b');
const substationIcon = createMarkerIcon('⚡', '#eab308');
const waterIcon = createMarkerIcon('💧', '#3b82f6');
const rescueIcon = createMarkerIcon('🚜', '#a855f7');

export default function MapViewer({ incidentData, selectedJurisdiction, focusTarget }) {
  const [layers, setLayers] = useState({
    hospitals: true,
    roads: true,
    waterlogging: true,
    substations: true,
    rescueTeams: true
  });

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const mapData = incidentData.mapLayers || {};

  return (
    <div className="relative w-full h-[540px] rounded-lg overflow-hidden eoc-card border border-[#1f2d47] shadow-lg">
      {/* Small Layer Controls Header */}
      <div className="absolute top-3 left-3 z-[1000] bg-[#131b2e]/95 backdrop-blur-md px-3 py-2 rounded border border-[#1f2d47] text-xs shadow-md flex items-center gap-3">
        <div className="flex items-center gap-1 text-slate-300 font-medium pr-2 border-r border-slate-700">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Layers:</span>
        </div>

        <label className="flex items-center gap-1 text-slate-300 cursor-pointer select-none hover:text-white">
          <input
            type="checkbox"
            checked={layers.hospitals}
            onChange={() => toggleLayer('hospitals')}
            className="rounded accent-blue-600 cursor-pointer"
          />
          <span>Hospitals</span>
        </label>

        <label className="flex items-center gap-1 text-slate-300 cursor-pointer select-none hover:text-white">
          <input
            type="checkbox"
            checked={layers.roads}
            onChange={() => toggleLayer('roads')}
            className="rounded accent-amber-500 cursor-pointer"
          />
          <span>Affected roads</span>
        </label>

        <label className="flex items-center gap-1 text-slate-300 cursor-pointer select-none hover:text-white">
          <input
            type="checkbox"
            checked={layers.waterlogging}
            onChange={() => toggleLayer('waterlogging')}
            className="rounded accent-blue-500 cursor-pointer"
          />
          <span>Waterlogging</span>
        </label>

        <label className="flex items-center gap-1 text-slate-300 cursor-pointer select-none hover:text-white">
          <input
            type="checkbox"
            checked={layers.substations}
            onChange={() => toggleLayer('substations')}
            className="rounded accent-yellow-500 cursor-pointer"
          />
          <span>Power substations</span>
        </label>

        <label className="flex items-center gap-1 text-slate-300 cursor-pointer select-none hover:text-white">
          <input
            type="checkbox"
            checked={layers.rescueTeams}
            onChange={() => toggleLayer('rescueTeams')}
            className="rounded accent-purple-500 cursor-pointer"
          />
          <span>Rescue teams</span>
        </label>
      </div>

      {/* Map Legend (Bottom Right) */}
      <div className="absolute bottom-3 right-3 z-[1000] bg-[#131b2e]/95 backdrop-blur-md p-2.5 rounded border border-[#1f2d47] text-[11px] shadow-md space-y-1 font-sans">
        <span className="font-bold text-slate-300 block mb-1">GIS Map Legend</span>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span>Critical access hospital</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Inundated arterial road</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span>High waterlogging zone</span>
        </div>
      </div>

      {/* Reliable OpenStreetMap Layer Container */}
      <MapContainer
        center={selectedJurisdiction.center}
        zoom={selectedJurisdiction.zoom}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <MapCameraController
          focusTarget={focusTarget}
          center={selectedJurisdiction.center}
          zoom={selectedJurisdiction.zoom}
        />

        {/* Standard OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Translucent Flood Risk Zone Polygons */}
        {layers.waterlogging && (mapData.polygonZones || []).map(poly => (
          <Polygon
            key={poly.id}
            positions={poly.coordinates}
            pathOptions={{
              color: poly.risk === 'CRITICAL' ? '#ef4444' : '#f59e0b',
              fillColor: poly.risk === 'CRITICAL' ? '#ef4444' : '#f59e0b',
              fillOpacity: 0.25,
              weight: 2
            }}
          >
            <Popup>
              <div className="p-1 text-xs">
                <p className="font-bold text-white">{poly.name}</p>
                <p className="text-slate-300">Waterlogging Risk: <strong className="text-red-400">{poly.risk}</strong></p>
              </div>
            </Popup>
          </Polygon>
        ))}

        {/* Hospital Markers */}
        {layers.hospitals && (mapData.hospitals || []).map(h => (
          <Marker key={h.id} position={[h.lat, h.lng]} icon={hospitalIcon}>
            <Popup>
              <div className="p-1 text-xs">
                <p className="font-bold text-white mb-0.5">🏥 {h.name}</p>
                <p className="text-slate-300"><strong>Status:</strong> <span className={h.critical ? 'text-red-400 font-semibold' : 'text-slate-200'}>{h.status}</span></p>
                <p className="text-slate-300"><strong>ICU Beds Available:</strong> {h.bedsAvailable} / {h.totalBeds}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Road Markers */}
        {layers.roads && (mapData.roads || []).map(r => (
          <Marker key={r.id} position={[r.lat, r.lng]} icon={roadIcon}>
            <Popup>
              <div className="p-1 text-xs">
                <p className="font-bold text-amber-300 mb-0.5">🚧 {r.name}</p>
                <p className="text-slate-300"><strong>Condition:</strong> {r.status}</p>
                <p className="text-slate-300"><strong>Impact:</strong> {r.impact}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Power Substation Markers */}
        {layers.substations && (mapData.substations || []).map(e => (
          <Marker key={e.id} position={[e.lat, e.lng]} icon={substationIcon}>
            <Popup>
              <div className="p-1 text-xs">
                <p className="font-bold text-yellow-300 mb-0.5">⚡ {e.name}</p>
                <p className="text-slate-300"><strong>Status:</strong> {e.status}</p>
                <p className="text-slate-300"><strong>Transformer Load:</strong> {e.loadPct}%</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Water Dewatering Nodes */}
        {layers.waterlogging && (mapData.waterNodes || []).map(w => (
          <Marker key={w.id} position={[w.lat, w.lng]} icon={waterIcon}>
            <Popup>
              <div className="p-1 text-xs">
                <p className="font-bold text-blue-300 mb-0.5">💧 {w.name}</p>
                <p className="text-slate-300"><strong>Status:</strong> {w.status}</p>
                <p className="text-slate-300"><strong>Capacity Saturation:</strong> {w.capacityPct}%</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Rescue Team Markers */}
        {layers.rescueTeams && (mapData.rescueTeams || []).map(m => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={rescueIcon}>
            <Popup>
              <div className="p-1 text-xs">
                <p className="font-bold text-purple-300 mb-0.5">🚜 {m.name}</p>
                <p className="text-slate-300"><strong>Personnel:</strong> {m.personnel} Rescuers</p>
                <p className="text-slate-300"><strong>Status:</strong> {m.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
