// @ts-nocheck
// Content Script - Gimli Tailwind Studio
// Injected into web pages; handles DOM inspection and class application

import type { ElementInfo } from '../types'

// ─── State ────────────────────────────────────────────────────────────────────

let inspectorActive = false
let selectedElement: Element | null = null
let overlayEl: HTMLElement | null = null
let tooltipEl: HTMLElement | null = null

// ─── Inline CSS ────────────────────────────────────────────────────────────────

const INLINE_CSS = `
.gimli-overlay-highlight {
  outline: 2px solid #3b82f6 !important;
  outline-offset: 1px !important;
  cursor: crosshair !important;
}
.gimli-selected-element {
  outline: 2px solid #8b5cf6 !important;
  outline-offset: 2px !important;
  background-color: rgba(139, 92, 246, 0.05) !important;
}
.gimli-overlay-tooltip {
  position: fixed;
  z-index: 2147483646;
  background: #1e293b;
  color: #f1f5f9;
  font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;
  pointer-events: none;
  white-space: nowrap;
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  border: 1px solid #334155;
}
.gimli-overlay-tooltip::after {
  content: '';
  position: absolute;
  top: -5px;
  left: 12px;
  width: 9px;
  height: 9px;
  background: #1e293b;
  transform: rotate(45deg);
  border-left: 1px solid #334155;
  border-top: 1px solid #334155;
}
.gimli-inspector-active *,
.gimli-inspector-active *::before,
.gimli-inspector-active *::after {
  cursor: crosshair !important;
}
`

function injectStyles() {
  if (document.getElementById('gimli-inline-styles')) return
  const style = document.createElement('style')
  style.id = 'gimli-inline-styles'
  style.textContent = INLINE_CSS
  document.head.appendChild(style)
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  injectStyles()

  // Load pending state from storage via background
  chrome.runtime.sendMessage({ type: 'GIMLI_GET_STORAGE' }, (storage) => {
    if (storage?.settings?.showTooltips !== false) {
      // ready to go
    }
  })

  // Listen for messages from popup/background
  chrome.runtime.onMessage.addListener((msg: { type: string; payload?: unknown }) => {
    switch (msg.type) {
      case 'GIMLI_TOGGLE_INSPECTOR':
        toggleInspector()
        break
      case 'GIMLI_INSPECT_START':
        startInspector()
        break
      case 'GIMLI_INSPECT_STOP':
        stopInspector()
        break
      case 'GIMLI_APPLY_CLASSES':
        if (selectedElement) applyClasses(selectedElement, msg.payload as string[])
        break
      case 'GIMLI_REMOVE_CLASS':
        if (selectedElement) removeClass(selectedElement, msg.payload as string)
        break
      case 'GIMLI_UPDATE_CLASSES':
        if (selectedElement) updateClasses(selectedElement, msg.payload as string[])
        break
      case 'GIMLI_TAB_ACTIVATED':
        break
    }
  })

  // Load Tailwind v4 CDN stylesheet if not present
  injectTailwindCDN()
}

// ─── Tailwind CDN ─────────────────────────────────────────────────────────────

function injectTailwindCDN() {
  if (document.querySelector('#gimli-tailwind-cdn')) return
  const link = document.createElement('link')
  link.id = 'gimli-tailwind-cdn'
  link.rel = 'stylesheet'
  link.href = 'https://cdn.tailwindcss.com'
  document.head.appendChild(link)
}

// ─── Inspector ───────────────────────────────────────────────────────────────

function startInspector() {
  if (inspectorActive) return
  inspectorActive = true
  document.body.classList.add('gimli-inspector-active')

  // Add listener to capture clicks
  document.addEventListener('mouseover', onMouseOver as EventListener, true)
  document.addEventListener('mouseout', onMouseOut as EventListener, true)
  document.addEventListener('click', onClick as EventListener, true)
  document.addEventListener('keydown', onKeyDown, true)

  createOverlayElements()
}

function stopInspector() {
  inspectorActive = false
  document.body.classList.remove('gimli-inspector-active')

  document.removeEventListener('mouseover', onMouseOver as EventListener, true)
  document.removeEventListener('mouseout', onMouseOut as EventListener, true)
  document.removeEventListener('click', onClick as EventListener, true)
  document.removeEventListener('keydown', onKeyDown, true)

  clearHighlights()
  removeOverlayElements()

  selectedElement = null
}

function toggleInspector() {
  if (inspectorActive) {
    stopInspector()
  } else {
    startInspector()
  }
  chrome.runtime.sendMessage({
    type: 'GIMLI_STATE_UPDATE',
    payload: { inspectorActive },
  })
}

// ─── Hover Effects ────────────────────────────────────────────────────────────

function onMouseOver(e: MouseEvent) {
  if (!inspectorActive) return
  const target = e.target as HTMLElement
  if (!target || target === overlayEl || target === tooltipEl || target.classList.contains('gimli-overlay-highlight')) return
  clearHighlights()
  target.classList.add('gimli-overlay-highlight')
  showTooltip(target, e)
}

function onMouseOut(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (selectedElement !== target) {
    target.classList.remove('gimli-overlay-highlight')
  }
  hideTooltip()
}

function onClick(e: MouseEvent) {
  if (!inspectorActive) return
  e.preventDefault()
  e.stopPropagation()
  const target = e.target as HTMLElement
  if (target) selectElement(target)
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    stopInspector()
    chrome.runtime.sendMessage({
      type: 'GIMLI_STATE_UPDATE',
      payload: { inspectorActive: false },
    })
  }
}

// ─── Element Selection ────────────────────────────────────────────────────────

function selectElement(el: HTMLElement) {
  clearHighlights()
  selectedElement = el
  el.classList.add('gimli-selected-element')

  const info = extractElementInfo(el)
  hideTooltip()

  chrome.runtime.sendMessage({
    type: 'GIMLI_ELEMENT_CLICKED',
    payload: info,
  })

  // Stop inspector once element is selected (like Gimli)
  stopInspector()
}

function extractElementInfo(el: HTMLElement): ElementInfo {
  const computed = window.getComputedStyle(el)
  const rect = el.getBoundingClientRect()

  // Build a unique selector
  const selector = buildSelector(el)

  // Count children
  const children = el.children.length

  // Depth from body
  let depth = 0
  let parent = el.parentElement
  while (parent && parent !== document.body) {
    depth++
    parent = parent.parentElement
  }

  return {
    selector,
    tagName: el.tagName.toLowerCase(),
    classes: Array.from(el.classList),
    id: el.id || undefined,
    inlineStyles: {
      width: el.style.width || computed.width,
      height: el.style.height || computed.height,
      backgroundColor: el.style.backgroundColor || computed.backgroundColor,
      color: el.style.color || computed.color,
      fontSize: el.style.fontSize || computed.fontSize,
      display: el.style.display || computed.display,
      padding: el.style.padding || computed.padding,
      margin: el.style.margin || computed.margin,
    },
    computedStyles: {
      display: computed.display,
      position: computed.position,
      flexDirection: computed.flexDirection,
      alignItems: computed.alignItems,
      justifyContent: computed.justifyContent,
      gap: computed.gap,
      gridTemplateColumns: computed.gridTemplateColumns,
    },
    rect: rect as DOMRect,
    children,
    depth,
  }
}

function buildSelector(el: HTMLElement): string {
  if (el.id) return `#${el.id}`

  let sel = el.tagName.toLowerCase()
  if (el.className && typeof el.className === 'string' && el.className.trim()) {
    const classes = el.className.trim().split(/\s+/).slice(0, 2).join('.')
    if (classes) sel += `.${classes}`
  }

  // Add nth-child if needed for uniqueness
  const parent = el.parentElement
  if (parent) {
    const siblings = Array.from(parent.children).filter(
      (c) => c.tagName === el.tagName
    )
    if (siblings.length > 1) {
      const idx = siblings.indexOf(el) + 1
      sel += `:nth-child(${idx})`
    }
  }

  return sel
}

// ─── Class Application ────────────────────────────────────────────────────────

function applyClasses(el: HTMLElement, classes: string[]) {
  // Apply fresh classes
  el.className = ''
  classes.forEach((cls) => el.classList.add(cls))
}

function removeClass(el: HTMLElement, cls: string) {
  el.classList.remove(cls)
}

function updateClasses(el: HTMLElement, classes: string[]) {
  el.className = classes.join(' ')
}

// ─── Overlay Elements ─────────────────────────────────────────────────────────

function createOverlayElements() {
  if (overlayEl) return

  overlayEl = document.createElement('div')
  overlayEl.id = 'gimli-overlay'
  overlayEl.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 2147483645;
  `
  document.body.appendChild(overlayEl)

  tooltipEl = document.createElement('div')
  tooltipEl.className = 'gimli-overlay-tooltip'
  document.body.appendChild(tooltipEl)
}

function removeOverlayElements() {
  overlayEl?.remove()
  overlayEl = null
  tooltipEl?.remove()
  tooltipEl = null
}

function clearHighlights() {
  document.querySelectorAll('.gimli-overlay-highlight, .gimli-selected-element').forEach((el) => {
    el.classList.remove('gimli-overlay-highlight', 'gimli-selected-element')
  })
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

function showTooltip(el: HTMLElement, e: MouseEvent) {
  if (!tooltipEl) return
  const info = extractElementInfo(el)
  const classCount = info.classes.length
  const html = `<strong>${info.tagName}</strong>${info.id ? ` #${info.id}` : ''} · ${classCount} class${classCount !== 1 ? 'es' : ''}`
  tooltipEl.innerHTML = html

  const rect = el.getBoundingClientRect()
  tooltipEl.style.top = `${rect.bottom + window.scrollY + 8}px`
  tooltipEl.style.left = `${rect.left + window.scrollX}px`
}

function hideTooltip() {
  if (tooltipEl) tooltipEl.style.display = 'none'
}

// ─── Start ─────────────────────────────────────────────────────────────────────

init()
