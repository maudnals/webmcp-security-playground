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
      <h3 style={{ fontSize: '24px', marginBottom: '4px' }}>24°C</h3>
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
      <span style={{ fontSize: '36px', fontWeight: '600' }}>20°</span>
      <button className="glass-btn">+</button>
    </div>
    <p style={{ textAlign: 'center', marginTop: '12px', color: 'var(--accent)' }}>Cooling to 19°</p>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3>Front Door Lock</h3>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '999px',
              fontFamily: 'monospace',
              background: isFrontDoorLocked ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: isFrontDoorLocked ? '#4ade80' : '#f87171',
              border: `1px solid ${
                isFrontDoorLocked ? 'rgba(74, 222, 128, 0.4)' : 'rgba(239, 68, 68, 0.35)'
              }`,
            }}
          >
            {isFrontDoorLocked ? 'LOCKED' : 'UNLOCKED'}
          </span>
        </div>
        {isFrontDoorLocked ? (
          <Lock size={24} color="#4ade80" />
        ) : (
          <Unlock
            size={24}
            color="#f87171"
            style={{ filter: 'drop-shadow(0 0 8px rgba(248, 113, 113, 0.6))' }}
          />
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

export const SmartLightsLivingRoom = () => {
  const { lightsPower = 'off', lightsBrightness = 0, setLivingRoomLightsState } = useDashboard() || {};
  const isOn = lightsPower === 'on' && lightsBrightness > 0;

  return (
    <div
      className="card"
      style={{
        position: 'relative',
        transition: 'all 0.35s ease',
        background: isOn
          ? `radial-gradient(circle at top right, rgba(250, 204, 21, ${0.12 + (lightsBrightness / 100) * 0.18}), rgba(15, 23, 42, 0.85))`
          : '#05070b',
        borderColor: isOn ? 'rgba(250, 204, 21, 0.5)' : 'rgba(255, 255, 255, 0.08)',
        boxShadow: isOn
          ? `0 0 ${Math.round(lightsBrightness * 0.35)}px rgba(250, 204, 21, 0.25)`
          : 'inset 0 0 30px rgba(0, 0, 0, 0.9)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3>Living Room Lights</h3>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '999px',
              fontFamily: 'monospace',
              background: isOn ? 'rgba(250, 204, 21, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: isOn ? '#fde047' : '#f87171',
              border: `1px solid ${isOn ? 'rgba(250, 204, 21, 0.4)' : 'rgba(239, 68, 68, 0.35)'}`,
            }}
          >
            {isOn ? `ON` : 'OFF'}
          </span>
        </div>
        <Lightbulb
          size={24}
          color={isOn ? '#fde047' : '#475569'}
          style={{
            filter: isOn ? 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.9))' : 'none',
            transition: 'all 0.3s ease',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
        <button
          className={`glass-btn ${isOn ? 'active' : ''}`}
          style={{
            flex: 1,
            justifyContent: 'center',
            borderColor: isOn ? '#fde047' : undefined,
            color: isOn ? '#fde047' : undefined,
          }}
          onClick={() => setLivingRoomLightsState?.('on', lightsBrightness > 0 ? lightsBrightness : 80)}
        >
          ON
        </button>
        <button
          className={`glass-btn ${!isOn ? 'active' : ''}`}
          style={{
            flex: 1,
            justifyContent: 'center',
            borderColor: !isOn ? '#f87171' : undefined,
            color: !isOn ? '#f87171' : undefined,
          }}
          onClick={() => setLivingRoomLightsState?.('off', 0)}
        >
          OFF
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', minWidth: '72px' }}>
          Brightness:
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={isOn ? lightsBrightness : 0}
          onChange={(e) => {
            const val = Number(e.target.value);
            setLivingRoomLightsState?.(val === 0 ? 'off' : 'on', val);
          }}
          style={{ flex: 1, accentColor: '#fde047', cursor: 'pointer' }}
        />
        <span style={{ fontSize: '12px', fontFamily: 'monospace', width: '36px', textAlign: 'right' }}>
          {isOn ? `${lightsBrightness}%` : '0%'}
        </span>
      </div>
    </div>
  );
};

// --- NEW COMPONENTS ---

export const MediaPlayerWidget = () => {
  const {
    playlistTracks = [],
    deletePlaylistTrack,
    resetPlaylistTracks,
  } = useDashboard() || {};

  const currentTrack = playlistTracks[0] || {
    title: 'Queue Empty',
    artist: 'Add a track below',
  };

  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden', gridColumn: 'span 2' }}>
      <div className="dev-inline-badge dev-inline-badge--corner">
        💀 Untrusted playlist metadata
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Music size={20} color="var(--accent)" />
            <h3 style={{ margin: 0 }}>Soniq • Collaborative Party Queue</h3>
          </div>
          <button
            className="glass-btn"
            style={{ fontSize: '11px', padding: '4px 8px' }}
            onClick={() => resetPlaylistTracks?.()}
            title="Reset default party queue"
          >
            <RotateCcw size={12} /> Reset Queue
          </button>
        </div>

        {/* Now Playing Header */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            padding: '10px 12px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '8px',
            marginBottom: '14px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'var(--accent-glow)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Music size={22} color="var(--accent)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Now Playing • Living Room
            </div>
            <h4 style={{ margin: '2px 0', fontSize: '15px' }}>{currentTrack.title}</h4>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>{currentTrack.artist}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="glass-btn" style={{ padding: '6px 10px' }}><Play size={14} /></button>
            <button className="glass-btn" style={{ padding: '6px 10px' }}><SkipForward size={14} /></button>
          </div>
        </div>

        {/* Track Queue List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          {playlistTracks.map((track, idx) => (
            <div
              key={track.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                position: "relative"
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1 }}>
                <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  #{idx + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>{track.title}</span>
                    {track.isPoisoned && (
                      <span className="dev-inline-badge dev-inline-badge--track">
                        💀 Prompt injection payload
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', wordBreak: 'break-word' }}>
                    {track.artist}
                  </div>
                </div>
              </div>
              <button
                className="glass-btn"
                style={{ padding: '4px 6px', marginLeft: '8px', opacity: 0.7 }}
                onClick={() => deletePlaylistTrack?.(track.id)}
                title="Remove track"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
        position: 'relative',
        overflow: 'hidden',
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
          <div className="dev-inline-badge dev-inline-badge--corner">
            💀 Untrusted guest content
          </div>
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
              background: '#b6fbff',
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
            {msg.isPoisoned && (
              <div className="dev-inline-badge dev-inline-badge--track">
                💀 Prompt injection payload
              </div>
            )}

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
  'solar_grid': SolarGridWidget,
  'energy_summary': SolarGridWidget,
};
