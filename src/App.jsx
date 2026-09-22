/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { DeveloperControlsBanner } from './components/DeveloperControlsBanner';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SecurityPage, ClimatePage, EnergyPage, MediaPage, GuestbookPage, LightsPage } from './pages/Subpages';
import './index.css';

function AgentStatusToast() {
  const { isAgentActive } = useDashboard() || {};

  return (
    <AnimatePresence>
      {isAgentActive && (
        <motion.div
          className="agent-status-toast"
          initial={{ opacity: 0, y: -16, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -16, x: '-50%' }}
          transition={{ duration: 0.2 }}
        >
          <span className="animate-spin" style={{ fontSize: '16px', lineHeight: 1 }}>⚙️</span>
          <span>Agent is working...</span>
        </motion.div>
      ) }
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <DashboardProvider>
        <DeveloperControlsBanner />
        <AgentStatusToast />
        <div className="app-container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/lights" element={<LightsPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/energy" element={<EnergyPage />} />
            <Route path="/guestbook" element={<GuestbookPage />} />
            <Route path="/climate" element={<ClimatePage />} />
          </Routes>
        </div>
      </DashboardProvider>
    </Router>
  );
}

export default App;
