// @ts-nocheck
// useChromeStorage - sync-aware storage hook
import { useState, useEffect, useCallback } from 'react'
import type { StorageData, Preset, ExtensionSettings } from '../types'

const DEFAULT_SETTINGS: ExtensionSettings = {
  tailwindVersion: 'v4',
  enableShortcuts: true,
  theme: 'dark',
  autoApply: false,
  showTooltips: true,
  highlightColor: '#3b82f6',
}

const DEFAULT_STORAGE: StorageData = {
  presets: [],
  recentClasses: [],
  settings: DEFAULT_SETTINGS,
}

export function useChromeStorage() {
  const [storage, setStorage] = useState<StorageData>(DEFAULT_STORAGE)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    chrome.storage.sync.get(DEFAULT_STORAGE, (items) => {
      setStorage(items as StorageData)
      setLoading(false)
    })

    const listener = (changes: Record<string, chrome.storage.StorageChange>) => {
      setStorage((prev) => ({ ...prev, ...changes }))
    }
    chrome.storage.onChanged.addListener(listener)
    return () => chrome.storage.onChanged.removeListener(listener)
  }, [])

  const saveSettings = useCallback(async (settings: ExtensionSettings) => {
    await chrome.storage.sync.set({ settings })
    setStorage((prev) => ({ ...prev, settings }))
  }, [])

  const savePreset = useCallback(async (preset: Preset) => {
    const existing = storage.presets.findIndex((p) => p.id === preset.id)
    const presets =
      existing >= 0
        ? storage.presets.map((p, i) => (i === existing ? { ...preset, updatedAt: Date.now() } : p))
        : [...storage.presets, preset]
    await chrome.storage.sync.set({ presets })
    setStorage((prev) => ({ ...prev, presets }))
  }, [storage.presets])

  const deletePreset = useCallback(async (id: string) => {
    const presets = storage.presets.filter((p) => p.id !== id)
    await chrome.storage.sync.set({ presets })
    setStorage((prev) => ({ ...prev, presets }))
  }, [storage.presets])

  const addRecentClass = useCallback(async (cls: string) => {
    const recent = [cls, ...storage.recentClasses.filter((c) => c !== cls)].slice(0, 50)
    await chrome.storage.sync.set({ recentClasses: recent })
    setStorage((prev) => ({ ...prev, recentClasses: recent }))
  }, [storage.recentClasses])

  return {
    storage,
    loading,
    saveSettings,
    savePreset,
    deletePreset,
    addRecentClass,
  }
}
