// @ts-nocheck
import { useState, useEffect } from 'react'
import { useChromeStorage } from '../hooks/useChromeStorage'
import type { ExtensionSettings } from '../types'

const DEFAULT_SETTINGS: ExtensionSettings = {
  tailwindVersion: 'v4',
  enableShortcuts: true,
  theme: 'dark',
  autoApply: false,
  showTooltips: true,
  highlightColor: '#3b82f6',
}

export default function OptionsPage() {
  const { storage, saveSettings } = useChromeStorage()
  const [settings, setSettings] = useState<ExtensionSettings>(DEFAULT_SETTINGS)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSettings(storage.settings)
  }, [storage.settings])

  const update = (patch: Partial<ExtensionSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }))
  }

  const handleSave = async () => {
    await saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClearData = async () => {
    if (confirm('Clear all presets and recent classes? This cannot be undone.')) {
      await chrome.storage.sync.clear()
      window.location.reload()
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
        <span style={{ fontSize: 28 }}>⚡</span>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, background: 'linear-gradient(135deg, #818cf8, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Gimli Tailwind Studio
          </h1>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Settings & Preferences</p>
        </div>
      </div>

      {/* Settings sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* General */}
        <SettingsSection title="General">
          <ToggleRow
            label="Enable keyboard shortcuts"
            description="Toggle inspector with Ctrl+Shift+I"
            checked={settings.enableShortcuts}
            onChange={(v) => update({ enableShortcuts: v })}
          />
          <ToggleRow
            label="Auto-apply classes"
            description="Apply classes instantly as you toggle them (vs. on click)"
            checked={settings.autoApply}
            onChange={(v) => update({ autoApply: v })}
          />
          <ToggleRow
            label="Show element tooltips"
            description="Display element info on hover in inspect mode"
            checked={settings.showTooltips}
            onChange={(v) => update({ showTooltips: v })}
          />
        </SettingsSection>

        {/* Tailwind */}
        <SettingsSection title="Tailwind">
          <SelectRow
            label="Tailwind version"
            description="Changes how utilities are categorized and displayed"
            value={settings.tailwindVersion}
            onChange={(v) => update({ tailwindVersion: v as 'v3' | 'v4' })}
            options={[
              { value: 'v4', label: 'v4 (latest, CSS-first)' },
              { value: 'v3', label: 'v3 (classic config)' },
            ]}
          />
        </SettingsSection>

        {/* Theme */}
        <SettingsSection title="Appearance">
          <SelectRow
            label="Theme"
            description="Color theme for the extension popup"
            value={settings.theme}
            onChange={(v) => update({ theme: v as 'dark' | 'light' | 'auto' })}
            options={[
              { value: 'dark', label: '🌙 Dark (default)' },
              { value: 'light', label: '☀️ Light' },
              { value: 'auto', label: '🖥️ System' },
            ]}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#1a1d27', borderRadius: 8, border: '1px solid #2e3352' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Highlight color</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>Inspector overlay border color</div>
            </div>
            <input
              type="color"
              value={settings.highlightColor}
              onChange={(e) => update({ highlightColor: e.target.value })}
              style={{ width: 40, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}
            />
          </div>
        </SettingsSection>

        {/* Data */}
        <SettingsSection title="Data & Storage">
          <div style={{ padding: '12px 16px', background: '#1a1d27', borderRadius: 8, border: '1px solid #2e3352' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>
              Storage
            </div>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 12 }}>
              Using <strong style={{ color: '#818cf8' }}>chrome.storage.sync</strong> — presets sync across your Chrome devices
            </div>
            <div style={{ display: 'flex', gap: 8, fontSize: 12, color: '#64748b' }}>
              <span>Presets: <strong style={{ color: '#e2e8f0' }}>{storage.presets.length}</strong></span>
              <span>·</span>
              <span>Recent classes: <strong style={{ color: '#e2e8f0' }}>{storage.recentClasses.length}</strong></span>
            </div>
            <button
              onClick={handleClearData}
              style={{
                marginTop: 12,
                padding: '6px 14px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 6,
                color: '#ef4444',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Clear All Data
            </button>
          </div>
        </SettingsSection>

        {/* Keyboard shortcuts */}
        <SettingsSection title="Keyboard Shortcuts">
          <div style={{ padding: '12px 16px', background: '#1a1d27', borderRadius: 8, border: '1px solid #2e3352' }}>
            <ShortcutRow keys="Ctrl + Shift + I" description="Toggle element inspector" />
            <ShortcutRow keys="Escape" description="Stop inspector mode" />
            <ShortcutRow keys="Click" description="Select element in inspect mode" />
          </div>
        </SettingsSection>

        {/* Save button */}
        <div style={{ display: 'flex', gap: 10, paddingTop: 8 }}>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 24px',
              background: saved ? '#10b981' : '#6366f1',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: saved ? '0 2px 12px rgba(16,185,129,0.4)' : '0 2px 12px rgba(99,102,241,0.4)',
            }}
          >
            {saved ? '✓ Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {children}
      </div>
    </div>
  )
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#1a1d27', borderRadius: 8, border: '1px solid #2e3352' }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{label}</div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: 40,
          height: 22,
          borderRadius: 11,
          background: checked ? '#6366f1' : '#2e3352',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <span style={{
          display: 'block',
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'white',
          position: 'absolute',
          top: 3,
          left: checked ? 21 : 3,
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }} />
      </button>
    </div>
  )
}

function SelectRow({ label, description, value, onChange, options }: {
  label: string
  description: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#1a1d27', borderRadius: 8, border: '1px solid #2e3352' }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{label}</div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{description}</div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: '#232738',
          border: '1px solid #2e3352',
          borderRadius: 6,
          color: '#e2e8f0',
          fontSize: 12,
          padding: '5px 10px',
          outline: 'none',
          cursor: 'pointer',
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

function ShortcutRow({ keys, description }: { keys: string; description: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0' }}>
      <span style={{ fontSize: 12, color: '#64748b' }}>{description}</span>
      <kbd style={{
        fontFamily: 'ui-monospace, monospace',
        fontSize: 11,
        background: '#232738',
        border: '1px solid #2e3352',
        borderRadius: 4,
        padding: '2px 8px',
        color: '#818cf8',
      }}>
        {keys}
      </kbd>
    </div>
  )
}
