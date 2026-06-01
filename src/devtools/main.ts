// @ts-nocheck
// DevTools Panel - Gimli Tailwind Studio
// This script runs inside Chrome DevTools

import { TAILWIND_CATEGORIES, generateReactComponent, generateHTML, categorizeClass } from '../utils/tailwindUtils'
import type { ExtensionSettings, Preset } from '../types'

// ─── State ─────────────────────────────────────────────────────────────────────

let currentElement: {
  selector: string
  tagName: string
  classes: string[]
  id?: string
} | null = null

let presets: Preset[] = []
let settings: ExtensionSettings | null = null
let history: string[][] = [[]]
let historyIndex = 0

// ─── Chrome DevTools API ───────────────────────────────────────────────────────

// Create the sidebar panel
chrome.devtools.panels.elements.createSidebarPane('Tailwind Studio', (pane) => {
  pane.setExpression('({})').then(() => {
    pane.setHeight('300px')
    updateSidebarContent(pane)
  })

  // Listen for selection changes
  chrome.devtools.inspectedWindow.onSelectionChanged.addListener(() => {
    chrome.devtools.inspectedWindow.eval(
      `
      (() => {
        const el = $0;
        if (!el) return null;
        return {
          selector: (() => {
            if (el.id) return '#' + el.id;
            let s = el.tagName.toLowerCase();
            if (el.className && typeof el.className === 'string') {
              const cls = el.className.trim().split(/\\s+/).slice(0,2).join('.');
              if (cls) s += '.' + cls;
            }
            return s;
          })(),
          tagName: el.tagName.toLowerCase(),
          classes: Array.from(el.classList),
          id: el.id || undefined
        };
      })()
      `,
      (result) => {
        if (!result[0] && !result) return
        const data = result[0] ?? result
        if (data && data.tagName) {
          currentElement = data
          history = [[...data.classes]]
          historyIndex = 0
          updateSidebarContent(pane)
        }
      }
    )
  })

  // Listen for extension messages
  chrome.runtime.onMessage.addListener((msg: { type: string; payload?: unknown }) => {
    if (msg.type === 'GIMLI_CLASSES_UPDATED' && currentElement) {
      currentElement.classes = msg.payload as string[]
      updateSidebarContent(pane)
    }
  })

  // Watch for DOM changes to update on class changes
  chrome.devtools.inspectedWindow.eval(
    `(${observeChanges.toString()})()`,
    () => {}
  )
})

// ─── Inject observer into the page ────────────────────────────────────────────

function observeChanges() {
  const observer = new MutationObserver(() => {
    // Notify the extension that classes may have changed
    chrome.runtime.sendMessage({ type: 'GIMLI_PAGE_CHANGED' })
  })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true })
}

// ─── Render Sidebar ────────────────────────────────────────────────────────────

function updateSidebarContent(pane: chrome.devtools.panels.ExtensionSidebarPane) {
  if (!currentElement) {
    pane.setObject({ message: '👆 Select an element in the Elements panel' })
    return
  }

  const html = buildSidebarHTML()
  pane.setContent(html)
}

function buildSidebarHTML(): string {
  if (!currentElement) return ''

  const { tagName, selector, classes, id } = currentElement

  return `
    <style>
      .gimli-dt { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; color: #e2e8f0; background: #1a1d27; padding: 0; margin: 0; }
      .gimli-dt * { box-sizing: border-box; }
      .gimli-dt-header { padding: 10px 12px; border-bottom: 1px solid #2e3352; display: flex; align-items: center; gap: 8px; }
      .gimli-dt-logo { font-size: 16px; filter: drop-shadow(0 0 4px rgba(99,102,241,0.6)); }
      .gimli-dt-title { font-size: 13px; font-weight: 700; background: linear-gradient(135deg, #818cf8, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .gimli-dt-info { padding: 8px 12px; border-bottom: 1px solid #2e3352; display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
      .gimli-dt-tag { background: #6366f1; color: white; padding: 2px 7px; border-radius: 4px; font-weight: 600; font-size: 11px; }
      .gimli-dt-id { background: #232738; color: #06b6d4; padding: 2px 7px; border-radius: 4px; font-size: 10px; border: 1px solid #2e3352; }
      .gimli-dt-sel { font-family: monospace; font-size: 10px; color: #64748b; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .gimli-dt-classes { padding: 8px 12px; border-bottom: 1px solid #2e3352; min-height: 36px; display: flex; flex-wrap: wrap; gap: 4px; }
      .gimli-dt-chip { display: inline-flex; align-items: center; gap: 3px; padding: 2px 7px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: all 0.1s; }
      .gimli-dt-chip:hover { opacity: 0.8; transform: scale(0.97); }
      .gimli-dt-chip.layout { background: rgba(99,102,241,0.15); color: #a5b4fc; border-color: rgba(99,102,241,0.3); }
      .gimli-dt-chip.position { background: rgba(139,92,246,0.15); color: #c4b5fd; border-color: rgba(139,92,246,0.3); }
      .gimli-dt-chip.spacing { background: rgba(6,182,212,0.15); color: #67e8f9; border-color: rgba(6,182,212,0.3); }
      .gimli-dt-chip.size { background: rgba(245,158,11,0.15); color: #fcd34d; border-color: rgba(245,158,11,0.3); }
      .gimli-dt-chip.flexbox { background: rgba(16,185,129,0.15); color: #6ee7b7; border-color: rgba(16,185,129,0.3); }
      .gimli-dt-chip.grid { background: rgba(20,184,166,0.15); color: #5eead4; border-color: rgba(20,184,166,0.3); }
      .gimli-dt-chip.typography { background: rgba(236,72,153,0.15); color: #f9a8d4; border-color: rgba(236,72,153,0.3); }
      .gimli-dt-chip.colors { background: rgba(249,115,22,0.15); color: #fdba74; border-color: rgba(249,115,22,0.3); }
      .gimli-dt-chip.borders { background: rgba(168,85,247,0.15); color: #d8b4fe; border-color: rgba(168,85,247,0.3); }
      .gimli-dt-chip.effects { background: rgba(14,165,233,0.15); color: #7dd3fc; border-color: rgba(14,165,233,0.3); }
      .gimli-dt-chip.transitions { background: rgba(100,116,139,0.15); color: #94a3b8; border-color: rgba(100,116,139,0.3); }
      .gimli-dt-chip.transform { background: rgba(132,204,22,0.15); color: #bef264; border-color: rgba(132,204,22,0.3); }
      .gimli-dt-chip.interactivity { background: rgba(244,63,94,0.15); color: #fda4af; border-color: rgba(244,63,94,0.3); }
      .gimli-dt-chip.svg { background: rgba(124,58,237,0.15); color: #c4b5fd; border-color: rgba(124,58,237,0.3); }
      .gimli-dt-chip.aspect { background: rgba(180,83,9,0.15); color: #fde68a; border-color: rgba(180,83,9,0.3); }
      .gimli-dt-chip.other { background: rgba(100,116,139,0.15); color: #94a3b8; border-color: rgba(100,116,139,0.3); }
      .gimli-dt-chip-remove { opacity: 0.5; font-size: 9px; }
      .gimli-dt-chip:hover .gimli-dt-chip-remove { opacity: 1; }
      .gimli-dt-empty { color: #64748b; font-style: italic; font-size: 11px; padding: 4px 0; }
      .gimli-dt-actions { padding: 6px 12px; display: flex; gap: 4px; border-bottom: 1px solid #2e3352; }
      .gimli-dt-btn { display: inline-flex; align-items: center; gap: 4px; padding: 4px 9px; border-radius: 5px; font-size: 11px; font-weight: 600; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; }
      .gimli-dt-btn-undo { background: #232738; border-color: #2e3352; color: #8892b0; }
      .gimli-dt-btn-undo:disabled { opacity: 0.3; cursor: not-allowed; }
      .gimli-dt-btn-copy { background: #10b981; color: white; }
      .gimli-dt-btn-copy:hover { background: #059669; }
      .gimli-dt-btn-clear { background: #232738; border-color: #2e3352; color: #8892b0; }
      .gimli-dt-btn-clear:hover { border-color: #ef4444; color: #ef4444; }
      .gimli-dt-btn-add { background: #6366f1; color: white; }
      .gimli-dt-btn-add:hover { background: #818cf8; }
      .gimli-dt-input-row { padding: 6px 12px; display: flex; gap: 5px; border-bottom: 1px solid #2e3352; }
      .gimli-dt-input { flex: 1; background: #232738; border: 1px solid #2e3352; border-radius: 5px; color: #e2e8f0; font-family: 'JetBrains Mono', monospace; font-size: 10.5px; padding: 5px 8px; outline: none; }
      .gimli-dt-input:focus { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99,102,241,0.15); }
      .gimli-dt-input::placeholder { color: #505a77; }
      .gimli-dt-cats { padding: 8px 12px; }
      .gimli-dt-cat-label { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
      .gimli-dt-cat-scroll { display: flex; flex-wrap: wrap; gap: 3px; max-height: 160px; overflow-y: auto; }
      .gimli-dt-utl { padding: 2px 7px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 9.5px; cursor: pointer; border: 1px solid #2e3352; background: #232738; color: #8892b0; transition: all 0.1s; }
      .gimli-dt-utl:hover { border-color: #6366f1; color: #818cf8; }
      .gimli-dt-utl.applied { background: rgba(99,102,241,0.15); border-color: #6366f1; color: #818cf8; font-weight: 600; }
      .gimli-dt-copy-toast { position: fixed; bottom: 12px; left: 50%; transform: translateX(-50%); background: #10b981; color: white; padding: 6px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; pointer-events: none; z-index: 9999999; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
    </style>
    <div class="gimli-dt">
      <div class="gimli-dt-header">
        <span class="gimli-dt-logo">⚡</span>
        <span class="gimli-dt-title">Gimli Studio</span>
      </div>

      <div class="gimli-dt-info">
        <span class="gimli-dt-tag">&lt;${tagName}&gt;</span>
        ${id ? `<span class="gimli-dt-id">#${id}</span>` : ''}
        <span class="gimli-dt-sel" title="${selector}">${selector}</span>
      </div>

      <div class="gimli-dt-actions">
        <button class="gimli-dt-btn gimli-dt-btn-undo" id="gimli-undo" ${historyIndex <= 0 ? 'disabled' : ''} onclick="gimliUndo()">↩ Undo</button>
        <button class="gimli-dt-btn gimli-dt-btn-clear" onclick="gimliClearAll()">✕ Clear</button>
        <button class="gimli-dt-btn gimli-dt-btn-copy" onclick="gimliCopyCode()">📋 Copy</button>
      </div>

      <div class="gimli-dt-input-row">
        <input class="gimli-dt-input" id="gimli-class-input" placeholder="Add class… e.g. bg-blue-500" onkeydown="if(event.key==='Enter') gimliAddClass()" />
        <button class="gimli-dt-btn gimli-dt-btn-add" onclick="gimliAddClass()">+ Add</button>
      </div>

      <div class="gimli-dt-classes" id="gimli-class-list">
        ${classes.length === 0 ? '<span class="gimli-dt-empty">No classes — add some below</span>' : ''}
        ${classes.map((cls: string) => {
          const cat = categorizeClass(cls)
          return `<span class="gimli-dt-chip ${cat}" onclick="gimliRemoveClass('${cls}')" title="Click to remove">${cls}<span class="gimli-dt-chip-remove"> ✕</span></span>`
        }).join('')}
      </div>

      <div class="gimli-dt-cats">
        <div class="gimli-dt-cat-label">Utilities — click to toggle</div>
        <div class="gimli-dt-cat-scroll">
          ${['layout','spacing','flexbox','grid','typography','colors','borders','effects','transform','transitions','position','size'].map((catKey) => {
            const cat = TAILWIND_CATEGORIES.find(c => c.key === catKey)
            if (!cat) return ''
            return cat.utilities.slice(0, 30).map((util: string) => {
              const applied = classes.includes(util)
              return `<button class="gimli-dt-utl ${applied ? 'applied' : ''}" onclick="gimliToggleClass('${util}')" style="--cat-color:'${cat.color}'">${util}</button>`
            }).join('')
          }).join('')}
        </div>
      </div>
    </div>
    <script>
      const _classes = ${JSON.stringify(classes)};
      const _history = ${JSON.stringify(history)};
      let _historyIndex = ${historyIndex};

      window.gimliToggleClass = function(cls) {
        const idx = _classes.indexOf(cls)
        if (idx >= 0) {
          _classes.splice(idx, 1)
        } else {
          _classes.push(cls)
        }
        _historyIndex++
        _history.splice(_historyIndex)
        _history.push([..._classes])
        gimliApplyAndUpdate()
      }

      window.gimliRemoveClass = function(cls) {
        const idx = _classes.indexOf(cls)
        if (idx >= 0) {
          _classes.splice(idx, 1)
          _historyIndex++
          _history.splice(_historyIndex)
          _history.push([..._classes])
          gimliApplyAndUpdate()
        }
      }

      window.gimliAddClass = function() {
        const input = document.getElementById('gimli-class-input')
        if (!input || !input.value.trim()) return
        const toAdd = input.value.trim().split(/\\s+/).filter(c => c && !_classes.includes(c))
        _classes.push(...toAdd)
        input.value = ''
        _historyIndex++
        _history.splice(_historyIndex)
        _history.push([..._classes])
        gimliApplyAndUpdate()
      }

      window.gimliClearAll = function() {
        _classes.length = 0
        _historyIndex++
        _history.splice(_historyIndex)
        _history.push([..._classes])
        gimliApplyAndUpdate()
      }

      window.gimliUndo = function() {
        if (_historyIndex <= 0) return
        _historyIndex--
        _classes.length = 0
        _classes.push(..._history[_historyIndex])
        gimliApplyAndUpdate()
      }

      window.gimliCopyCode = function() {
        const clsStr = _classes.join(' ')
        const code = 'className="' + clsStr + '"'
        navigator.clipboard.writeText(code).then(() => {
          const toast = document.createElement('div')
          toast.className = 'gimli-dt-copy-toast'
          toast.textContent = '✓ Copied!'
          document.body.appendChild(toast)
          setTimeout(() => toast.remove(), 1500)
        })
      }

      function gimliApplyAndUpdate() {
        // Apply to the actual element in the page
        chrome.devtools.inspectedWindow.eval(
          '($0.className = "' + _classes.join(' ') + '")',
          () => {}
        )
        // Update the sidebar
        chrome.runtime.sendMessage({
          type: 'GIMLI_DEVTOOLS_UPDATE',
          payload: { classes: [..._classes] }
        })
        // Refresh sidebar content
        window.postMessage({ type: 'GIMLI_DT_REFRESH' }, '*')
        location.reload()
      }

      // Listen for refresh requests
      window.addEventListener('message', (e) => {
        if (e.data?.type === 'GIMLI_DT_REFRESH') location.reload()
      })
    </script>
  `
}

// ─── Listen for updates from the page ──────────────────────────────────────────

chrome.runtime.onMessage.addListener((msg: { type: string; payload?: unknown }) => {
  if (msg.type === 'GIMLI_DEVTOOLS_UPDATE') {
    currentElement = { ...currentElement!, classes: msg.payload as string[] }
    // Will be picked up by next setContent call
  }
})
