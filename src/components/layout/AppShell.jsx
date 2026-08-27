import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

export default function AppShell({ selectedJurisdiction, onSelectJurisdiction }) {
  return (
    <div className="flex min-h-screen bg-[#F5F7FA] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Fixed Vertical Sidebar */}
      <Sidebar />

      {/* 2. Main Shell Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader
          selectedJurisdiction={selectedJurisdiction}
          onSelectJurisdiction={onSelectJurisdiction}
        />

        {/* Dynamic Page Content Outlet */}
        <main className="flex-1 p-6 max-w-[1600px] w-full mx-auto space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
