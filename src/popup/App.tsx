// @ts-nocheck
import { useState, useCallback } from 'react'
import { useChromeStorage } from '../hooks/useChromeStorage'
import { useMessage, getActiveTabId, sendToTab } from '../hooks/useMessage'
import { TAILWIND_CATEGORIES, generateHTML, generateReactComponent, generateHTMLDocument, categorizeClass } from '../utils/tailwindUtils'
import type { ElementInfo, Preset, MessageType } from '../types'

// ─── Icons (inline SVG, no external deps) ─────────────────────────────────────

const Icon = {
  cursor: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
      <path d="M13 13l6 6"/>
    </svg>
  ),
  inspect: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  copy: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  save: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  ),
  trash: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  ),
  play: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  code: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  settings: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  tag: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  close: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  undo: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
    </svg>
  ),
  redo: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
    </svg>
  ),
  layers: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  check: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
}

// ─── Main App ──────────────────────────────────────────────────────────────────

type Tab = 'inspect' | 'presets' | 'export'

export default function App() {
  const { storage, savePreset, deletePreset, addRecentClass } = useChromeStorage()
  const [activeTab, setActiveTab] = useState<Tab>('inspect')
  const [inspectorActive, setInspectorActive] = useState(false)
  const [selectedElement, setSelectedElement] = useState<ElementInfo | null>(null)
  const [classes, setClasses] = useState<string[]>([])
  const [history, setHistory] = useState<string[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [classInput, setClassInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('layout')
  const [activeSubTab, setActiveSubTab] = useState<'search' | 'categories'>('categories')
  const [copied, setCopied] = useState(false)
  const [presetName, setPresetName] = useState('')
  const [presetDesc, setPresetDesc] = useState('')
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const [activeExportFormat, setActiveExportFormat] = useState<'html' | 'jsx' | 'full'>('jsx')
  const [selectedTag, setSelectedTag] = useState('div')

  // ─── Message handling ─────────────────────────────────────────────────────────

  const handleMessage = useCallback((msg: MessageType) => {
    if (msg.type === 'GIMLI_ELEMENT_CLICKED') {
      const info = msg.payload as ElementInfo
      setSelectedElement(info)
      setClasses(info.classes)
      setHistory((h) => [...h.slice(0, historyIndex + 1), info.classes])
      setHistoryIndex((i) => i + 1)
    }
    if (msg.type === 'GIMLI_STATE_UPDATE') {
      const payload = msg.payload as { inspectorActive?: boolean }
      if (payload.inspectorActive !== undefined) {
        setInspectorActive(payload.inspectorActive)
      }
    }
  }, [historyIndex])

  useMessage(handleMessage)

  // ─── Inspector control ───────────────────────────────────────────────────────

  const toggleInspector = useCallback(async () => {
    const tabId = await getActiveTabId()
    if (!tabId) return
    await sendToTab(tabId, { type: 'GIMLI_TOGGLE_INSPECTOR' })
    setInspectorActive(!inspectorActive)
  }, [inspectorActive])

  // ─── Class management ───────────────────────────────────────────────────────

  const applyClasses = useCallback(async (newClasses: string[]) => {
    setClasses(newClasses)
    setHistory((h) => [...h.slice(0, historyIndex + 1), newClasses])
    setHistoryIndex((h) => h + 1)
    const tabId = await getActiveTabId()
    if (tabId) {
      await sendToTab(tabId, { type: 'GIMLI_UPDATE_CLASSES', payload: newClasses })
    }
    newClasses.forEach((c) => addRecentClass(c))
  }, [historyIndex, addRecentClass])

  const toggleClass = useCallback((cls: string) => {
    const next = classes.includes(cls) ? classes.filter((c) => c !== cls) : [...classes, cls]
    applyClasses(next)
  }, [classes, applyClasses])

  const removeClass = useCallback(async (cls: string) => {
    const next = classes.filter((c) => c !== cls)
    applyClasses(next)
  }, [classes, applyClasses])

  const addClassFromInput = useCallback(() => {
    const trimmed = classInput.trim()
    if (!trimmed) return
    const toAdd = trimmed.split(/\s+/).filter((c) => c && !classes.includes(c))
    if (toAdd.length) {
      applyClasses([...classes, ...toAdd])
    }
    setClassInput('')
  }, [classInput, classes, applyClasses])

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1]
      setHistoryIndex(historyIndex - 1)
      setClasses(prev)
      getActiveTabId().then((tabId) => {
        if (tabId) sendToTab(tabId, { type: 'GIMLI_UPDATE_CLASSES', payload: prev })
      })
    }
  }, [historyIndex, history])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1]
      setHistoryIndex(historyIndex + 1)
      setClasses(next)
      getActiveTabId().then((tabId) => {
        if (tabId) sendToTab(tabId, { type: 'GIMLI_UPDATE_CLASSES', payload: next })
      })
    }
  }, [historyIndex, history])

  const clearAll = useCallback(() => {
    applyClasses([])
  }, [applyClasses])

  // ─── Presets ─────────────────────────────────────────────────────────────────

  const saveAsPreset = useCallback(async () => {
    if (!presetName.trim()) return
    const preset: Preset = {
      id: `preset-${Date.now()}`,
      name: presetName.trim(),
      description: presetDesc.trim(),
      classes: [...classes],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await savePreset(preset)
    setPresetName('')
    setPresetDesc('')
    setSaveModalOpen(false)
  }, [presetName, presetDesc, classes, savePreset])

  const loadPreset = useCallback(async (preset: Preset) => {
    applyClasses(preset.classes)
  }, [applyClasses])

  // ─── Code export ─────────────────────────────────────────────────────────────

  const copyCode = useCallback(() => {
    let code = ''
    if (activeExportFormat === 'jsx') {
      code = generateReactComponent(classes)
    } else if (activeExportFormat === 'html') {
      code = generateHTML(selectedTag, classes)
    } else {
      code = generateHTMLDocument(classes)
    }
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [classes, activeExportFormat, selectedTag])

  // ─── Filtered utilities ──────────────────────────────────────────────────────

  const currentCategory = TAILWIND_CATEGORIES.find((c) => c.key === activeCategory) ?? TAILWIND_CATEGORIES[0]

  const filteredUtilities = searchQuery
    ? TAILWIND_CATEGORIES.flatMap((c) =>
        c.utilities.filter((u) => u.includes(searchQuery.toLowerCase()))
      )
    : currentCategory.utilities

  // ─── UI ──────────────────────────────────────────────────────────────────────

  return (
    <div className="gimli-popup">
      {/* Header */}
      <div className="gimli-header">
        <div className="gimli-logo">
          <span className="gimli-logo-icon">⚡</span>
          <span className="gimli-logo-text">Gimli Studio</span>
        </div>
        <button
          className={`gimli-inspector-btn ${inspectorActive ? 'active' : ''}`}
          onClick={toggleInspector}
          title="Toggle element inspector (Esc to exit)"
        >
          {Icon.inspect()}
          <span>{inspectorActive ? 'Stop' : 'Inspect'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="gimli-tabs">
        {(['inspect', 'presets', 'export'] as Tab[]).map((tab) => (
          <button
            key={tab}
            className={`gimli-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'inspect' && Icon.cursor()}
            {tab === 'presets' && Icon.layers()}
            {tab === 'export' && Icon.code()}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ─── Inspect Tab ─────────────────────────────────────────────────── */}
      {activeTab === 'inspect' && (
        <div className="gimli-panel">
          {/* Element info */}
          {selectedElement ? (
            <div className="gimli-element-info">
              <span className="gimli-tag-badge">&lt;{selectedElement.tagName}&gt;</span>
              {selectedElement.id && (
                <span className="gimli-id-badge">#{selectedElement.id}</span>
              )}
              <span className="gimli-selector" title={selectedElement.selector}>
                {selectedElement.selector.slice(0, 40)}{selectedElement.selector.length > 40 ? '…' : ''}
              </span>
              <span className="gimli-meta">
                {selectedElement.children} child{selectedElement.children !== 1 ? 'ren' : ''} · depth {selectedElement.depth}
              </span>
            </div>
          ) : (
            <div className="gimli-empty-state">
              <p>👆 Click <strong>Inspect</strong> then click any element on the page</p>
            </div>
          )}

          {/* Active classes */}
          {classes.length > 0 && (
            <div className="gimli-classes-section">
              <div className="gimli-section-header">
                <span>Applied Classes</span>
                <div className="gimli-class-actions">
                  <button onClick={undo} disabled={historyIndex <= 0} className="gimli-icon-btn" title="Undo">
                    {Icon.undo()}
                  </button>
                  <button onClick={redo} disabled={historyIndex >= history.length - 1} className="gimli-icon-btn" title="Redo">
                    {Icon.redo()}
                  </button>
                  <button onClick={clearAll} className="gimli-icon-btn" title="Clear all">
                    {Icon.trash()}
                  </button>
                  <button onClick={() => setSaveModalOpen(true)} className="gimli-icon-btn" title="Save as preset">
                    {Icon.save()}
                  </button>
                </div>
              </div>
              <div className="gimli-active-classes">
                {classes.map((cls) => (
                  <span
                    key={cls}
                    className={`gimli-class-chip ${categorizeClass(cls)}`}
                    onClick={() => removeClass(cls)}
                    title="Click to remove"
                  >
                    {cls}
                    <span className="gimli-chip-remove">{Icon.close()}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Class input */}
          <div className="gimli-input-row">
            <input
              type="text"
              className="gimli-class-input"
              placeholder="Add class… (e.g. bg-blue-500)"
              value={classInput}
              onChange={(e) => setClassInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addClassFromInput()}
            />
            <button className="gimli-add-btn" onClick={addClassFromInput}>
              + Add
            </button>
          </div>

          {/* Search / Categories toggle */}
          <div className="gimli-sub-tabs">
            <button
              className={`gimli-sub-tab ${activeSubTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('categories')}
            >
              {Icon.tag()} Categories
            </button>
            <button
              className={`gimli-sub-tab ${activeSubTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('search')}
            >
              {Icon.search()} Search
            </button>
          </div>

          {/* Category list or search */}
          {activeSubTab === 'categories' ? (
            <>
              <div className="gimli-category-scroll">
                {TAILWIND_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    className={`gimli-category-pill ${activeCategory === cat.key ? 'active' : ''}`}
                    style={{ '--cat-color': cat.color } as React.CSSProperties}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="gimli-utility-grid">
                {filteredUtilities.map((util) => (
                  <button
                    key={util}
                    className={`gimli-utility-btn ${classes.includes(util) ? 'applied' : ''}`}
                    onClick={() => toggleClass(util)}
                    style={{ '--cat-color': currentCategory.color } as React.CSSProperties}
                  >
                    {classes.includes(util) && <span className="gimli-check">{Icon.check()}</span>}
                    {util}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="gimli-search-section">
              <input
                type="text"
                className="gimli-search-input"
                placeholder="Search utilities… (e.g. flex, bg-blue, text-lg)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <div className="gimli-utility-grid">
                  {filteredUtilities.map((util) => (
                    <button
                      key={util}
                      className={`gimli-utility-btn ${classes.includes(util) ? 'applied' : ''}`}
                      onClick={() => toggleClass(util)}
                    >
                      {classes.includes(util) && <span className="gimli-check">{Icon.check()}</span>}
                      {util}
                    </button>
                  ))}
                  {filteredUtilities.length === 0 && (
                    <p className="gimli-no-results">No utilities found for "{searchQuery}"</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Recent classes */}
          {storage.recentClasses.length > 0 && (
            <div className="gimli-recent-section">
              <div className="gimli-section-header">
                <span>Recent</span>
              </div>
              <div className="gimli-recent-chips">
                {storage.recentClasses.slice(0, 20).map((cls) => (
                  <button
                    key={cls}
                    className={`gimli-recent-chip ${classes.includes(cls) ? 'active' : ''}`}
                    onClick={() => toggleClass(cls)}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── Presets Tab ─────────────────────────────────────────────────── */}
      {activeTab === 'presets' && (
        <div className="gimli-panel">
          <div className="gimli-section-header">
            <span>Saved Presets</span>
            <button className="gimli-primary-btn" onClick={() => setSaveModalOpen(true)}>
              {Icon.save()} Save Current
            </button>
          </div>
          {storage.presets.length === 0 ? (
            <div className="gimli-empty-state">
              <p>No presets yet. Edit some classes and save them!</p>
            </div>
          ) : (
            <div className="gimli-preset-list">
              {storage.presets.map((preset) => (
                <div key={preset.id} className="gimli-preset-card">
                  <div className="gimli-preset-info">
                    <div className="gimli-preset-name">{preset.name}</div>
                    {preset.description && (
                      <div className="gimli-preset-desc">{preset.description}</div>
                    )}
                    <div className="gimli-preset-classes">
                      {preset.classes.slice(0, 6).map((cls) => (
                        <span key={cls} className={`gimli-class-chip small ${categorizeClass(cls)}`}>
                          {cls}
                        </span>
                      ))}
                      {preset.classes.length > 6 && (
                        <span className="gimli-more-badge">+{preset.classes.length - 6}</span>
                      )}
                    </div>
                    <div className="gimli-preset-date">
                      {new Date(preset.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="gimli-preset-actions">
                    <button className="gimli-apply-btn" onClick={() => loadPreset(preset)}>
                      {Icon.play()} Apply
                    </button>
                    <button
                      className="gimli-delete-btn"
                      onClick={() => deletePreset(preset.id)}
                      title="Delete preset"
                    >
                      {Icon.trash()}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── Export Tab ──────────────────────────────────────────────────── */}
      {activeTab === 'export' && (
        <div className="gimli-panel">
          <div className="gimli-section-header">
            <span>Export Code</span>
          </div>

          {/* Format selector */}
          <div className="gimli-export-formats">
            {[
              { key: 'jsx', label: 'React Component', icon: '⚛️' },
              { key: 'html', label: 'HTML Tag', icon: '📄' },
              { key: 'full', label: 'HTML Doc', icon: '🌐' },
            ].map((fmt) => (
              <button
                key={fmt.key}
                className={`gimli-format-btn ${activeExportFormat === fmt.key ? 'active' : ''}`}
                onClick={() => setActiveExportFormat(fmt.key as 'jsx' | 'html' | 'full')}
              >
                <span>{fmt.icon}</span>
                <span>{fmt.label}</span>
              </button>
            ))}
          </div>

          {/* Tag selector for HTML */}
          {activeExportFormat === 'html' && (
            <div className="gimli-tag-selector">
              <label>HTML Tag</label>
              <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                {['div', 'span', 'p', 'a', 'button', 'input', 'img', 'section', 'header', 'footer', 'nav', 'article', 'aside', 'ul', 'ol', 'li'].map((t) => (
                  <option key={t} value={t}>&lt;{t}&gt;</option>
                ))}
              </select>
            </div>
          )}

          {/* Code preview */}
          <div className="gimli-code-preview">
            <pre className="gimli-code-block">
              {activeExportFormat === 'jsx' && generateReactComponent(classes)}
              {activeExportFormat === 'html' && generateHTML(selectedTag, classes)}
              {activeExportFormat === 'full' && generateHTMLDocument(classes)}
            </pre>
          </div>

          <button className="gimli-copy-btn" onClick={copyCode}>
            {copied ? Icon.check() : Icon.copy()}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      )}

      {/* Save preset modal */}
      {saveModalOpen && (
        <div className="gimli-modal-overlay" onClick={() => setSaveModalOpen(false)}>
          <div className="gimli-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gimli-modal-header">
              <span>Save Preset</span>
              <button className="gimli-icon-btn" onClick={() => setSaveModalOpen(false)}>
                {Icon.close()}
              </button>
            </div>
            <div className="gimli-modal-body">
              <label className="gimli-form-label">Preset Name *</label>
              <input
                type="text"
                className="gimli-form-input"
                placeholder="e.g. Hero Button"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                autoFocus
              />
              <label className="gimli-form-label">Description (optional)</label>
              <input
                type="text"
                className="gimli-form-input"
                placeholder="e.g. Blue gradient button with hover"
                value={presetDesc}
                onChange={(e) => setPresetDesc(e.target.value)}
              />
              <div className="gimli-modal-preview">
                <span>Classes ({classes.length}):</span>
                <span className="gimli-preview-classes">
                  {classes.length > 0 ? classes.join(' ') : '(none)'}
                </span>
              </div>
            </div>
            <div className="gimli-modal-footer">
              <button className="gimli-secondary-btn" onClick={() => setSaveModalOpen(false)}>
                Cancel
              </button>
              <button
                className="gimli-primary-btn"
                onClick={saveAsPreset}
                disabled={!presetName.trim()}
              >
                {Icon.save()} Save Preset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
