/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, createContext, useContext } from 'react';
import { useWebMCP } from 'use-webmcp-tool';

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [dashboardComponents, setDashboardComponents] = useState([
    'weather_widget',
    'lock_front_door',
  ]);

  const [isAgentActive, setIsAgentActive] = useState(false);
  const [isFrontDoorLocked, setIsFrontDoorLocked] = useState(true);
  const [lastLockStatusText, setLastLockStatusText] = useState('Locked • 5 mins ago');

  const ensureLockWidgetVisible = () => {
    setDashboardComponents((prev) =>
      prev.includes('lock_front_door') ? prev : ['lock_front_door', ...prev]
    );
  };

  useWebMCP({
    name: "rearrangeDOMComponents",
    description: "Rearranges the user's home dashboard by adding, removing, or reordering smart home control components based on the user's intent.",
    inputSchema: {
      type: "object",
      properties: {
        componentIds: {
          type: "array",
          items: { type: "string" },
          description: "Array of component IDs to display on the dashboard. Examples: 'thermostat_control', 'camera_front_door', 'lock_front_door', 'smart_lights_living_room', 'energy_summary', 'weather_widget', 'media_player_living_room', 'alarm_panel', 'air_quality_sensor', 'robot_vacuum', 'solar_grid'"
        }
      },
      required: ["componentIds"]
    },
    annotations: {
      readOnlyHint: false,
      consequentialHint: false,
    },
    execute: async (input) => {
      setIsAgentActive(true);
      setDashboardComponents(input.componentIds);

      setTimeout(() => setIsAgentActive(false), 2000);
      return "Dashboard successfully updated with requested components.";
    }
  });

  useWebMCP({
    name: "lockFrontDoor",
    description: "Locks the smart home front door lock to secure the house.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    annotations: {
      readOnlyHint: false,
      consequentialHint: false,
    },
    execute: async () => {
      setIsAgentActive(true);
      setIsFrontDoorLocked(true);
      setLastLockStatusText('Locked • Just now');
      ensureLockWidgetVisible();

      setTimeout(() => setIsAgentActive(false), 2000);
      return "Front door locked successfully.";
    },
  });

  useWebMCP({
    name: "unlockFrontDoor",
    description: "Unlocks the smart home front door lock. Grants physical access to the home.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    annotations: {
      readOnlyHint: false,
      consequentialHint: true,
    },
    execute: async () => {
      setIsAgentActive(true);
      setIsFrontDoorLocked(false);
      setLastLockStatusText('Unlocked • Just now');
      ensureLockWidgetVisible();

      setTimeout(() => setIsAgentActive(false), 2000);
      return "Front door unlocked successfully.";
    },
  });

  return (
    <DashboardContext.Provider
      value={{
        dashboardComponents,
        isAgentActive,
        isFrontDoorLocked,
        setIsFrontDoorLocked,
        lastLockStatusText,
        setLastLockStatusText,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
