// @ts-nocheck
// Background Service Worker - Gimli Tailwind Studio

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

// ─── Storage helpers ───────────────────────────────────────────────────────────

export async function getStorage(): Promise<StorageData> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(DEFAULT_STORAGE as unknown as string[], (items) => {
      resolve(items as unknown as StorageData)
    })
  })
}

export async function setStorage(data: Partial<StorageData>): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.set(data as unknown as Record<string, unknown>, () => resolve())
  })
}

export async function savePreset(preset: Preset): Promise<void> {
  const storage = await getStorage()
  const existing = storage.presets.findIndex((p) => p.id === preset.id)
  if (existing >= 0) {
    storage.presets[existing] = { ...preset, updatedAt: Date.now() }
  } else {
    storage.presets.push(preset)
  }
  await setStorage({ presets: storage.presets })
}

export async function deletePreset(id: string): Promise<void> {
  const storage = await getStorage()
  storage.presets = storage.presets.filter((p) => p.id !== id)
  await setStorage({ presets: storage.presets })
}

// ─── Message handler ────────────────────────────────────────────────────────────

function handleMessage(message: { type: string; payload?: unknown }, sender: unknown, sendResponse: (r?: unknown) => void): boolean {
  void sender
  switch (message.type) {
    case 'GIMLI_GET_STORAGE':
      getStorage().then(sendResponse)
      return true
    case 'GIMLI_SET_STORAGE':
      setStorage(message.payload as Partial<StorageData>).then(() => sendResponse({ ok: true }))
      return true
    case 'GIMLI_GET_PRESETS':
      getStorage().then((s) => sendResponse(s.presets))
      return true
    case 'GIMLI_SAVE_PRESET':
      savePreset(message.payload as Preset).then(() => sendResponse({ ok: true }))
      return true
    case 'GIMLI_DELETE_PRESET':
      deletePreset(message.payload as string).then(() => sendResponse({ ok: true }))
      return true
    case 'GIMLI_GET_SETTINGS':
      getStorage().then((s) => sendResponse(s.settings))
      return true
    case 'GIMLI_SET_SETTINGS':
      setStorage({ settings: message.payload as ExtensionSettings }).then(() => sendResponse({ ok: true }))
      return true
    case 'GIMLI_INJECT_SCRIPTS': {
      // Content script is auto-loaded by Chrome from manifest; nothing to inject
      sendResponse({ ok: true })
      return true
    }
    default:
      sendResponse({ error: `Unknown message type: ${message.type}` })
      return false
  }
}

chrome.runtime.onMessage.addListener(handleMessage)

// ─── Tab activation ────────────────────────────────────────────────────────────

chrome.tabs.onActivated.addListener((activeInfo: { tabId: number; windowId: number }) => {
  chrome.tabs.sendMessage(activeInfo.tabId, { type: 'GIMLI_TAB_ACTIVATED' }).catch(() => {
    // no content script on this tab
  })
})

// ─── Keyboard shortcut ────────────────────────────────────────────────────────

chrome.commands.onCommand.addListener((command: string) => {
  if (command === 'toggle-inspector') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, { type: 'GIMLI_TOGGLE_INSPECTOR' }).catch(() => {})
      }
    })
  }
})
