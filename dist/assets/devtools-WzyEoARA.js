import"./modulepreload-polyfill-Dezn_h7o.js";import{n as e,t}from"./tailwindUtils-BM2i0Zr-.js";var n=null,r=[[]],i=0;chrome.devtools.panels.elements.createSidebarPane(`Tailwind Studio`,e=>{e.setExpression(`({})`).then(()=>{e.setHeight(`300px`),o(e)}),chrome.devtools.inspectedWindow.onSelectionChanged.addListener(()=>{chrome.devtools.inspectedWindow.eval(`
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
      `,t=>{if(!t[0]&&!t)return;let a=t[0]??t;a&&a.tagName&&(n=a,r=[[...a.classes]],i=0,o(e))})}),chrome.runtime.onMessage.addListener(t=>{t.type===`GIMLI_CLASSES_UPDATED`&&n&&(n.classes=t.payload,o(e))}),chrome.devtools.inspectedWindow.eval(`(${a.toString()})()`,()=>{})});function a(){new MutationObserver(()=>{chrome.runtime.sendMessage({type:`GIMLI_PAGE_CHANGED`})}).observe(document.body,{attributes:!0,attributeFilter:[`class`],subtree:!0})}function o(e){if(!n){e.setObject({message:`👆 Select an element in the Elements panel`});return}let t=s();e.setContent(t)}function s(){if(!n)return``;let{tagName:a,selector:o,classes:s,id:c}=n;return`
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
        <span class="gimli-dt-tag">&lt;${a}&gt;</span>
        ${c?`<span class="gimli-dt-id">#${c}</span>`:``}
        <span class="gimli-dt-sel" title="${o}">${o}</span>
      </div>

      <div class="gimli-dt-actions">
        <button class="gimli-dt-btn gimli-dt-btn-undo" id="gimli-undo" ${i<=0?`disabled`:``} onclick="gimliUndo()">↩ Undo</button>
        <button class="gimli-dt-btn gimli-dt-btn-clear" onclick="gimliClearAll()">✕ Clear</button>
        <button class="gimli-dt-btn gimli-dt-btn-copy" onclick="gimliCopyCode()">📋 Copy</button>
      </div>

      <div class="gimli-dt-input-row">
        <input class="gimli-dt-input" id="gimli-class-input" placeholder="Add class… e.g. bg-blue-500" onkeydown="if(event.key==='Enter') gimliAddClass()" />
        <button class="gimli-dt-btn gimli-dt-btn-add" onclick="gimliAddClass()">+ Add</button>
      </div>

      <div class="gimli-dt-classes" id="gimli-class-list">
        ${s.length===0?`<span class="gimli-dt-empty">No classes — add some below</span>`:``}
        ${s.map(t=>`<span class="gimli-dt-chip ${e(t)}" onclick="gimliRemoveClass('${t}')" title="Click to remove">${t}<span class="gimli-dt-chip-remove"> ✕</span></span>`).join(``)}
      </div>

      <div class="gimli-dt-cats">
        <div class="gimli-dt-cat-label">Utilities — click to toggle</div>
        <div class="gimli-dt-cat-scroll">
          ${[`layout`,`spacing`,`flexbox`,`grid`,`typography`,`colors`,`borders`,`effects`,`transform`,`transitions`,`position`,`size`].map(e=>{let n=t.find(t=>t.key===e);return n?n.utilities.slice(0,30).map(e=>`<button class="gimli-dt-utl ${s.includes(e)?`applied`:``}" onclick="gimliToggleClass('${e}')" style="--cat-color:'${n.color}'">${e}</button>`).join(``):``}).join(``)}
        </div>
      </div>
    </div>
    <script>
      const _classes = ${JSON.stringify(s)};
      const _history = ${JSON.stringify(r)};
      let _historyIndex = ${i};

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
    <\/script>
  `}chrome.runtime.onMessage.addListener(e=>{e.type===`GIMLI_DEVTOOLS_UPDATE`&&(n={...n,classes:e.payload})});