import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';

import DashboardPage from './pages/DashboardPage';
import TransportPage from './pages/TransportPage';
import HealthcarePage from './pages/HealthcarePage';
import DisasterPage from './pages/DisasterPage';
import WaterPage from './pages/WaterPage';
import ElectricityPage from './pages/ElectricityPage';
import AgriculturePage from './pages/AgriculturePage';
import MunicipalPage from './pages/MunicipalPage';
import AiInsightsPage from './pages/AiInsightsPage';
import AlertsPage from './pages/AlertsPage';
import SimulationPage from './pages/SimulationPage';
import SettingsPage from './pages/SettingsPage';

import { INITIAL_DATA } from './data/centralStore';

export default function App() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState(INITIAL_DATA.jurisdictions[0]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppShell
            selectedJurisdiction={selectedJurisdiction}
            onSelectJurisdiction={setSelectedJurisdiction}
          />
        }
      >
        {/* Default Redirect to /dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Operational Pages */}
        <Route path="dashboard" element={<DashboardPage selectedJurisdiction={selectedJurisdiction} />} />
        <Route path="transport" element={<TransportPage selectedJurisdiction={selectedJurisdiction} />} />
        <Route path="healthcare" element={<HealthcarePage selectedJurisdiction={selectedJurisdiction} />} />
        <Route path="disaster" element={<DisasterPage selectedJurisdiction={selectedJurisdiction} />} />
        <Route path="water" element={<WaterPage selectedJurisdiction={selectedJurisdiction} />} />
        <Route path="electricity" element={<ElectricityPage selectedJurisdiction={selectedJurisdiction} />} />
        <Route path="agriculture" element={<AgriculturePage selectedJurisdiction={selectedJurisdiction} />} />
        <Route path="municipal" element={<MunicipalPage selectedJurisdiction={selectedJurisdiction} />} />
        <Route path="ai-insights" element={<AiInsightsPage selectedJurisdiction={selectedJurisdiction} />} />
        <Route path="alerts" element={<AlertsPage selectedJurisdiction={selectedJurisdiction} />} />
        <Route path="simulation" element={<SimulationPage selectedJurisdiction={selectedJurisdiction} />} />
        <Route path="settings" element={<SettingsPage selectedJurisdiction={selectedJurisdiction} onSelectJurisdiction={setSelectedJurisdiction} />} />

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

