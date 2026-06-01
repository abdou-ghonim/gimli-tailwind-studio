// Shared TypeScript types for Gimli Tailwind Studio

export interface TailwindClass {
  name: string
  category: string // layout, spacing, typography, colors, effects, flexbox, grid, border, etc.
  raw: string
}

export interface ElementInfo {
  selector: string
  tagName: string
  classes: string[]
  id?: string
  inlineStyles: Record<string, string>
  computedStyles: Record<string, string>
  rect: DOMRect
  children: number
  depth: number
}

export interface Preset {
  id: string
  name: string
  description?: string
  classes: string[]
  createdAt: number
  updatedAt: number
  tags?: string[]
}

export interface ExtensionState {
  inspectorActive: boolean
  selectedElement: ElementInfo | null
  editingClasses: string[]
  presets: Preset[]
  activePreset: string | null
  clipboard: string[]
  history: string[][]
  historyIndex: number
}

export interface StorageData {
  presets: Preset[]
  recentClasses: string[]
  settings: ExtensionSettings
}

export interface ExtensionSettings {
  tailwindVersion: 'v3' | 'v4'
  enableShortcuts: boolean
  theme: 'dark' | 'light' | 'auto'
  autoApply: boolean // apply classes as you type
  showTooltips: boolean
  highlightColor: string
}

// Chrome message types
export type MessageType =
  | { type: 'GIMLI_INSPECT_START' }
  | { type: 'GIMLI_INSPECT_STOP' }
  | { type: 'GIMLI_TOGGLE_INSPECTOR' }
  | { type: 'GIMLI_TAB_ACTIVATED' }
  | { type: 'GIMLI_ELEMENT_CLICKED'; payload: ElementInfo }
  | { type: 'GIMLI_GET_STATE' }
  | { type: 'GIMLI_APPLY_CLASSES'; payload: string[] }
  | { type: 'GIMLI_REMOVE_CLASS'; payload: string }
  | { type: 'GIMLI_UPDATE_CLASSES'; payload: string[] }
  | { type: 'GIMLI_COPY_CODE'; payload: string }
  | { type: 'GIMLI_GET_PRESETS' }
  | { type: 'GIMLI_SAVE_PRESET'; payload: Preset }
  | { type: 'GIMLI_DELETE_PRESET'; payload: string }
  | { type: 'GIMLI_LOAD_PRESET'; payload: string }
  | { type: 'GIMLI_GET_STORAGE' }
  | { type: 'GIMLI_SET_STORAGE'; payload: Record<string, unknown> }
  | { type: 'GIMLI_GET_SETTINGS' }
  | { type: 'GIMLI_SET_SETTINGS'; payload: ExtensionSettings }
  | { type: 'GIMLI_INJECT_SCRIPTS'; payload: { tabId: number } }
  | { type: 'GIMLI_STATE_UPDATE'; payload: Partial<ExtensionState> }

export interface ClassCategory {
  label: string
  key: string
  color: string
  utilities: string[]
}
