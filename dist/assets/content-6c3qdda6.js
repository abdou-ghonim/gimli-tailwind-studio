var e=!1,t=null,n=null,r=null,i=`
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
`;function a(){if(document.getElementById(`gimli-inline-styles`))return;let e=document.createElement(`style`);e.id=`gimli-inline-styles`,e.textContent=i,document.head.appendChild(e)}function o(){a(),chrome.runtime.sendMessage({type:`GIMLI_GET_STORAGE`},e=>{e?.settings?.showTooltips}),chrome.runtime.onMessage.addListener(e=>{switch(e.type){case`GIMLI_TOGGLE_INSPECTOR`:u();break;case`GIMLI_INSPECT_START`:c();break;case`GIMLI_INSPECT_STOP`:l();break;case`GIMLI_APPLY_CLASSES`:t&&v(t,e.payload);break;case`GIMLI_REMOVE_CLASS`:t&&y(t,e.payload);break;case`GIMLI_UPDATE_CLASSES`:t&&b(t,e.payload);break;case`GIMLI_TAB_ACTIVATED`:break}}),s()}function s(){if(document.querySelector(`#gimli-tailwind-cdn`))return;let e=document.createElement(`link`);e.id=`gimli-tailwind-cdn`,e.rel=`stylesheet`,e.href=`https://cdn.tailwindcss.com`,document.head.appendChild(e)}function c(){e||(e=!0,document.body.classList.add(`gimli-inspector-active`),document.addEventListener(`mouseover`,d,!0),document.addEventListener(`mouseout`,f,!0),document.addEventListener(`click`,p,!0),document.addEventListener(`keydown`,m,!0),x())}function l(){e=!1,document.body.classList.remove(`gimli-inspector-active`),document.removeEventListener(`mouseover`,d,!0),document.removeEventListener(`mouseout`,f,!0),document.removeEventListener(`click`,p,!0),document.removeEventListener(`keydown`,m,!0),C(),S(),t=null}function u(){e?l():c(),chrome.runtime.sendMessage({type:`GIMLI_STATE_UPDATE`,payload:{inspectorActive:e}})}function d(t){if(!e)return;let i=t.target;!i||i===n||i===r||i.classList.contains(`gimli-overlay-highlight`)||(C(),i.classList.add(`gimli-overlay-highlight`),w(i,t))}function f(e){let n=e.target;t!==n&&n.classList.remove(`gimli-overlay-highlight`),T()}function p(t){if(!e)return;t.preventDefault(),t.stopPropagation();let n=t.target;n&&h(n)}function m(e){e.key===`Escape`&&(l(),chrome.runtime.sendMessage({type:`GIMLI_STATE_UPDATE`,payload:{inspectorActive:!1}}))}function h(e){C(),t=e,e.classList.add(`gimli-selected-element`);let n=g(e);T(),chrome.runtime.sendMessage({type:`GIMLI_ELEMENT_CLICKED`,payload:n}),l()}function g(e){let t=window.getComputedStyle(e),n=e.getBoundingClientRect(),r=_(e),i=e.children.length,a=0,o=e.parentElement;for(;o&&o!==document.body;)a++,o=o.parentElement;return{selector:r,tagName:e.tagName.toLowerCase(),classes:Array.from(e.classList),id:e.id||void 0,inlineStyles:{width:e.style.width||t.width,height:e.style.height||t.height,backgroundColor:e.style.backgroundColor||t.backgroundColor,color:e.style.color||t.color,fontSize:e.style.fontSize||t.fontSize,display:e.style.display||t.display,padding:e.style.padding||t.padding,margin:e.style.margin||t.margin},computedStyles:{display:t.display,position:t.position,flexDirection:t.flexDirection,alignItems:t.alignItems,justifyContent:t.justifyContent,gap:t.gap,gridTemplateColumns:t.gridTemplateColumns},rect:n,children:i,depth:a}}function _(e){if(e.id)return`#${e.id}`;let t=e.tagName.toLowerCase();if(e.className&&typeof e.className==`string`&&e.className.trim()){let n=e.className.trim().split(/\s+/).slice(0,2).join(`.`);n&&(t+=`.${n}`)}let n=e.parentElement;if(n){let r=Array.from(n.children).filter(t=>t.tagName===e.tagName);if(r.length>1){let n=r.indexOf(e)+1;t+=`:nth-child(${n})`}}return t}function v(e,t){e.className=``,t.forEach(t=>e.classList.add(t))}function y(e,t){e.classList.remove(t)}function b(e,t){e.className=t.join(` `)}function x(){n||(n=document.createElement(`div`),n.id=`gimli-overlay`,n.style.cssText=`
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 2147483645;
  `,document.body.appendChild(n),r=document.createElement(`div`),r.className=`gimli-overlay-tooltip`,document.body.appendChild(r))}function S(){n?.remove(),n=null,r?.remove(),r=null}function C(){document.querySelectorAll(`.gimli-overlay-highlight, .gimli-selected-element`).forEach(e=>{e.classList.remove(`gimli-overlay-highlight`,`gimli-selected-element`)})}function w(e,t){if(!r)return;let n=g(e),i=n.classes.length,a=`<strong>${n.tagName}</strong>${n.id?` #${n.id}`:``} · ${i} class${i===1?``:`es`}`;r.innerHTML=a;let o=e.getBoundingClientRect();r.style.top=`${o.bottom+window.scrollY+8}px`,r.style.left=`${o.left+window.scrollX}px`}function T(){r&&(r.style.display=`none`)}o();