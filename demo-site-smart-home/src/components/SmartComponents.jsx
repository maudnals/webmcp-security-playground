/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Battery, CloudRain,
  Cpu,
  Lightbulb,
  Lock,
  MessageSquare,
  Music,
  Play,
  Plus,
  RotateCcw,
  ShieldAlert,
  SkipForward,
  Thermometer,
  Trash2,
  Unlock,
  Video,
  Wind,
  Zap
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

// --- EXISTING COMPONENTS ---

export const WeatherWidget = () => (
  <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <CloudRain size={40} color="var(--accent)" />
    <div>
      <h3 style={{ fontSize: '24px', marginBottom: '4px' }}>72°F</h3>
      <p>Cloudy • 20% Precipitation</p>
    </div>
  </div>
);

export const ThermostatControl = () => (
  <div className="card">
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <h3>HVAC • Downstairs</h3>
      <Thermometer size={20} color="var(--accent)" />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <button className="glass-btn">-</button>
      <span style={{ fontSize: '36px', fontWeight: '600' }}>74°</span>
      <button className="glass-btn">+</button>
    </div>
    <p style={{ textAlign: 'center', marginTop: '12px', color: 'var(--accent)' }}>Cooling to 72°</p>
  </div>
);

export const CameraFrontDoor = () => (
  <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
    <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
      <h3 style={{ margin: 0 }}>Front Door Cam</h3>
      <span style={{ color: 'red', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ width: '8px', height: '8px', background: 'red', borderRadius: '50%' }}></span>
        LIVE
      </span>
    </div>
    <div style={{ height: '160px', background: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Video size={32} color="rgba(255,255,255,0.3)" />
      <span style={{ position: 'absolute', bottom: '8px', left: '8px', fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>17:15:00 04/29/2026</span>
    </div>
  </div>
);

export const LockFrontDoor = () => {
  const {
    isFrontDoorLocked = true,
    setIsFrontDoorLocked,
    lastLockStatusText = 'Locked • 5 mins ago',
    setLastLockStatusText,
  } = useDashboard() || {};

  const handleLock = () => {
    setIsFrontDoorLocked?.(true);
    setLastLockStatusText?.('Locked • Just now');
  };

  const handleUnlock = () => {
    setIsFrontDoorLocked?.(false);
    setLastLockStatusText?.('Unlocked • Just now');
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3>Front Door Lock</h3>
        {isFrontDoorLocked ? (
          <Lock size={20} color="#4ade80" />
        ) : (
          <Unlock size={20} color="#fbbf24" />
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button
          className={`glass-btn ${isFrontDoorLocked ? 'active' : ''}`}
          style={{ justifyContent: 'center' }}
          onClick={handleLock}
        >
          Lock
        </button>
        <button
          className={`glass-btn ${!isFrontDoorLocked ? 'active' : ''}`}
          style={{ justifyContent: 'center' }}
          onClick={handleUnlock}
        >
          Unlock
        </button>
      </div>
      <p style={{ marginTop: '16px', fontSize: '12px' }}>{lastLockStatusText}</p>
    </div>
  );
};

export const SmartLightsLivingRoom = () => (
  <div className="card">
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <h3>Living Room Lights</h3>
      <Lightbulb size={20} color="var(--accent)" />
    </div>
    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
      <button className="glass-btn active">ON</button>
      <button className="glass-btn">OFF</button>
    </div>
    <p style={{ fontSize: '12px' }}>Brightness: 80%</p>
  </div>
);

// --- NEW COMPONENTS ---

export const MediaPlayerWidget = () => (
  <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(45deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))', zIndex: 0 }}></div>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3>Sonos • Living Room</h3>
        <Music size={20} color="var(--accent)" />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ width: '60px', height: '60px', background: 'var(--accent-glow)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Music size={24} color="var(--accent)" />
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: '16px' }}>Neon Nights</h4>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Synthwave Essentials</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button className="glass-btn"><Play size={16} /></button>
        <button className="glass-btn"><SkipForward size={16} /></button>
      </div>
    </div>
  </div>
);

export const AlarmPanelWidget = () => (
  <div className="card" style={{ borderColor: 'rgba(255, 0, 0, 0.2)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <h3 style={{ color: '#ff4b4b' }}>Security System</h3>
      <ShieldAlert size={20} color="#ff4b4b" />
    </div>
    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
      <span style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-secondary)' }}>DISARMED</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      <button className="glass-btn active" style={{ justifyContent: 'center', background: 'rgba(255, 75, 75, 0.1)', color: '#ff4b4b', borderColor: '#ff4b4b' }}>Arm Home</button>
      <button className="glass-btn" style={{ justifyContent: 'center' }}>Arm Away</button>
    </div>
  </div>
);

export const AirQualityWidget = () => (
  <div className="card">
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <h3>Air Quality • Indoors</h3>
      <Wind size={20} color="var(--accent)" />
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
      <span style={{ fontSize: '42px', fontWeight: '700', color: '#4ade80' }}>12</span>
      <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>AQI (Good)</span>
    </div>
    <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
      <span>PM2.5: 3.1 µg/m³</span>
      <span>VOC: 0.02 ppm</span>
    </div>
  </div>
);

export const RobotVacuumWidget = () => (
  <div className="card">
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <h3>Roborock S7</h3>
      <Cpu size={20} color="var(--accent)" />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div>
        <span style={{ fontSize: '18px', fontWeight: '500' }}>Docked</span>
        <p style={{ fontSize: '12px', color: '#4ade80', marginTop: '4px' }}>100% Charged</p>
      </div>
      <Battery size={32} color="#4ade80" />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      <button className="glass-btn active" style={{ justifyContent: 'center' }}>Clean</button>
      <button className="glass-btn" style={{ justifyContent: 'center' }}>Dock</button>
    </div>
  </div>
);

export const SolarGridWidget = () => (
  <div className="card">
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <h3>Energy Distribution</h3>
      <Zap size={20} color="#fbbf24" />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '14px' }}>Solar Gen</span>
        <span style={{ color: '#fbbf24', fontWeight: '600' }}>4.2 kW</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: '80%', height: '100%', background: '#fbbf24' }}></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <span style={{ fontSize: '14px' }}>Home Load</span>
        <span style={{ color: 'var(--accent)', fontWeight: '600' }}>2.4 kW</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: '45%', height: '100%', background: 'var(--accent)' }}></div>
      </div>
      <p style={{ marginTop: '8px', fontSize: '12px', color: '#4ade80' }}>+1.8 kW to Grid</p>
    </div>
  </div>
);


export const GuestMessageBoardWidget = ({ expanded = false }) => {
  const {
    guestMessages = [],
    addGuestMessage,
    deleteGuestMessage,
    resetGuestMessages,
  } = useDashboard() || {};

  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addGuestMessage?.(author || 'Guest Visitor', text);
    setAuthor('');
    setText('');
    setIsAdding(false);
  };

  return (
    <div
      className="card"
      style={{
        gridColumn: expanded ? '1 / -1' : 'span 2',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MessageSquare size={20} color="var(--accent)" />
          <h3 style={{ margin: 0 }}>Digital Guest Message Board</h3>
          <span
            style={{
              fontSize: '11px',
              background: 'rgba(251, 191, 36, 0.15)',
              color: '#fbbf24',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              padding: '2px 8px',
              borderRadius: '999px',
            }}
          >
            ⚠️ Untrusted Guest Content
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="glass-btn"
            style={{ padding: '6px 12px', fontSize: '12px' }}
            onClick={() => setIsAdding(!isAdding)}
          >
            <Plus size={14} /> {isAdding ? 'Cancel' : 'Leave a Note'}
          </button>
          <button
            type="button"
            className="glass-btn"
            style={{ padding: '6px 12px', fontSize: '12px' }}
            onClick={() => resetGuestMessages?.()}
            title="Reset demo notes"
          >
            <RotateCcw size={14} /> Reset Notes
          </button>
        </div>
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Your name (e.g., Dog Walker, Airbnb Guest)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={{
                flex: '1 1 200px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#fff',
                fontSize: '14px',
              }}
            />
          </div>
          <textarea
            placeholder="Write a note on the board... (e.g. 'Hi! Fed the cat' or test an indirect prompt injection)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#fff',
              fontFamily: "'Caveat', cursive",
              fontSize: '20px',
              resize: 'vertical',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="glass-btn active" style={{ padding: '8px 16px' }}>
              Pin Sticky Note
            </button>
          </div>
        </form>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: expanded
            ? 'repeat(auto-fill, minmax(260px, 1fr))'
            : 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '18px',
          padding: '8px 4px',
        }}
      >
        {guestMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              background: msg.color || '#fef08a',
              color: '#1e293b',
              borderRadius: '4px 4px 14px 4px',
              padding: '18px 16px 14px 16px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
              transform: `rotate(${msg.rotate || '-1deg'})`,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '155px',
            }}
          >

            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '23px',
                lineHeight: '1.25',
                marginTop: '8px',
                marginBottom: '14px',
                wordBreak: 'break-word',
                fontWeight: 600,
              }}
            >
              "{msg.text}"
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                borderTop: '1px dashed rgba(0,0,0,0.15)',
                paddingTop: '8px',
                fontSize: '12px',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>— {msg.author}</div>
                <div style={{ fontSize: '11px', color: '#475569' }}>{msg.timestamp}</div>
              </div>
              <button
                type="button"
                onClick={() => deleteGuestMessage?.(msg.id)}
                title="Remove note"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b',
                  padding: '2px',
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// Component Map for dynamic rendering by ID
export const COMPONENT_MAP = {
  'weather_widget': WeatherWidget,
  'thermostat_control': ThermostatControl,
  'camera_front_door': CameraFrontDoor,
  'lock_front_door': LockFrontDoor,
  'guest_message_board': GuestMessageBoardWidget,
  'smart_lights_living_room': SmartLightsLivingRoom,
  'media_player_living_room': MediaPlayerWidget,
  'alarm_panel': AlarmPanelWidget,
  'air_quality_sensor': AirQualityWidget,
  'robot_vacuum': RobotVacuumWidget,
  'solar_grid': SolarGridWidget,
  'energy_summary': SolarGridWidget,
};
