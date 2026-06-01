// Tailwind utility data for the class editor
import type { ClassCategory } from '../types'

// ─── Tailwind v4 categories ────────────────────────────────────────────────────

export const TAILWIND_CATEGORIES: ClassCategory[] = [
  {
    label: 'Layout',
    key: 'layout',
    color: '#6366f1',
    utilities: [
      'block', 'inline-block', 'inline', 'flex', 'inline-flex',
      'grid', 'inline-grid', 'hidden', 'contents', 'list-item',
      'flow-root',
    ],
  },
  {
    label: 'Position',
    key: 'position',
    color: '#8b5cf6',
    utilities: [
      'static', 'fixed', 'absolute', 'relative', 'sticky',
      'inset-0', 'inset-x-0', 'inset-y-0', 'top-0', 'right-0', 'bottom-0', 'left-0',
      'inset-1', 'inset-2', 'inset-4', 'inset-auto',
      'z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50',
    ],
  },
  {
    label: 'Spacing',
    key: 'spacing',
    color: '#06b6d4',
    utilities: [
      'p-0', 'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-8', 'p-10', 'p-12', 'p-16', 'p-20', 'p-24', 'px-1', 'px-2', 'px-3', 'px-4', 'px-6', 'px-8',
      'py-1', 'py-2', 'py-3', 'py-4', 'py-6', 'py-8',
      'pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-6', 'pt-8',
      'pr-1', 'pr-2', 'pr-3', 'pr-4', 'pr-6', 'pr-8',
      'pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-6', 'pb-8',
      'pl-1', 'pl-2', 'pl-3', 'pl-4', 'pl-6', 'pl-8',
      'm-0', 'm-1', 'm-2', 'm-3', 'm-4', 'm-5', 'm-6', 'm-8', 'mx-auto', 'my-auto',
      'gap-1', 'gap-2', 'gap-3', 'gap-4', 'gap-6', 'gap-8',
      'space-x-1', 'space-x-2', 'space-x-3', 'space-x-4', 'space-x-6', 'space-x-8',
      'space-y-1', 'space-y-2', 'space-y-3', 'space-y-4', 'space-y-6', 'space-y-8',
    ],
  },
  {
    label: 'Size',
    key: 'size',
    color: '#f59e0b',
    utilities: [
      'w-0', 'w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-8', 'w-10', 'w-12', 'w-16', 'w-20', 'w-24', 'w-32', 'w-40', 'w-48', 'w-56', 'w-64',
      'w-full', 'w-screen', 'w-auto', 'w-fit', 'w-min', 'w-max',
      'h-0', 'h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-8', 'h-10', 'h-12', 'h-16', 'h-20', 'h-24', 'h-32', 'h-40', 'h-48', 'h-64',
      'h-full', 'h-screen', 'h-auto', 'h-fit',
      'min-h-0', 'min-h-full', 'min-h-screen', 'max-h-0', 'max-h-full', 'max-h-screen',
      'min-w-0', 'min-w-full', 'max-w-0', 'max-w-full', 'max-w-xs', 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-3xl', 'max-w-4xl', 'max-w-5xl', 'max-w-6xl', 'max-w-7xl', 'max-w-full', 'max-w-screen-sm', 'max-w-screen-md', 'max-w-screen-lg', 'max-w-screen-xl',
      'max-w-none', 'max-w-prose', 'max-w-fit',
    ],
  },
  {
    label: 'Flexbox',
    key: 'flexbox',
    color: '#10b981',
    utilities: [
      'flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse',
      'flex-wrap', 'flex-wrap-reverse', 'flex-nowrap',
      'flex-1', 'flex-auto', 'flex-initial', 'flex-none',
      'grow', 'grow-0', 'shrink', 'shrink-0',
      'flex-1', 'flex-auto', 'flex-none',
      'justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly', 'justify-stretch',
      'items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch',
      'self-start', 'self-end', 'self-center', 'self-stretch',
      'place-items-start', 'place-items-end', 'place-items-center', 'place-items-stretch',
      'place-content-start', 'place-content-end', 'place-content-center', 'place-content-between', 'place-content-around', 'place-content-evenly', 'place-content-stretch',
      'place-self-auto', 'place-self-start', 'place-self-end', 'place-self-center', 'place-self-stretch',
    ],
  },
  {
    label: 'Grid',
    key: 'grid',
    color: '#14b8a6',
    utilities: [
      'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-7', 'grid-cols-8', 'grid-cols-9', 'grid-cols-10', 'grid-cols-11', 'grid-cols-12', 'grid-cols-none',
      'row-span-1', 'row-span-2', 'row-span-3', 'row-span-4', 'row-span-5', 'row-span-6', 'row-span-full',
      'col-span-1', 'col-span-2', 'col-span-3', 'col-span-4', 'col-span-5', 'col-span-6', 'col-span-7', 'col-span-8', 'col-span-9', 'col-span-10', 'col-span-11', 'col-span-12', 'col-span-full',
      'col-start-1', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7', 'col-start-auto',
      'col-end-1', 'col-end-2', 'col-end-3', 'col-end-4', 'col-end-5', 'col-end-6', 'col-end-7', 'col-end-auto',
      'grid-rows-1', 'grid-rows-2', 'grid-rows-3', 'grid-rows-4', 'grid-rows-6', 'grid-rows-none',
    ],
  },
  {
    label: 'Typography',
    key: 'typography',
    color: '#ec4899',
    utilities: [
      'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl',
      'font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black',
      'italic', 'not-italic',
      'normal-case', 'uppercase', 'lowercase', 'capitalize',
      'tracking-tighter', 'tracking-tight', 'tracking-normal', 'tracking-wide', 'tracking-wider', 'tracking-widest',
      'leading-none', 'leading-tight', 'leading-snug', 'leading-normal', 'leading-relaxed', 'leading-loose',
      'text-left', 'text-center', 'text-right', 'text-justify', 'text-start', 'text-end',
      'whitespace-normal', 'whitespace-nowrap', 'whitespace-pre', 'whitespace-pre-line', 'whitespace-pre-wrap',
      'break-normal', 'break-words', 'break-all', 'break-keep',
    ],
  },
  {
    label: 'Colors',
    key: 'colors',
    color: '#f97316',
    utilities: [
      'text-inherit', 'text-current', 'text-black', 'text-white', 'text-transparent',
      'text-slate-50', 'text-slate-100', 'text-slate-200', 'text-slate-300', 'text-slate-400', 'text-slate-500', 'text-slate-600', 'text-slate-700', 'text-slate-800', 'text-slate-900', 'text-slate-950',
      'text-gray-50', 'text-gray-100', 'text-gray-200', 'text-gray-300', 'text-gray-400', 'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900', 'text-gray-950',
      'text-zinc-50', 'text-zinc-100', 'text-zinc-200', 'text-zinc-300', 'text-zinc-400', 'text-zinc-500', 'text-zinc-600', 'text-zinc-700', 'text-zinc-800', 'text-zinc-900', 'text-zinc-950',
      'text-neutral-50', 'text-neutral-100', 'text-neutral-200', 'text-neutral-300', 'text-neutral-400', 'text-neutral-500', 'text-neutral-600', 'text-neutral-700', 'text-neutral-800', 'text-neutral-900', 'text-neutral-950',
      'text-stone-50', 'text-stone-100', 'text-stone-200', 'text-stone-300', 'text-stone-400', 'text-stone-500', 'text-stone-600', 'text-stone-700', 'text-stone-800', 'text-stone-900', 'text-stone-950',
      'text-red-50', 'text-red-100', 'text-red-200', 'text-red-300', 'text-red-400', 'text-red-500', 'text-red-600', 'text-red-700', 'text-red-800', 'text-red-900', 'text-red-950',
      'text-orange-50', 'text-orange-100', 'text-orange-200', 'text-orange-300', 'text-orange-400', 'text-orange-500', 'text-orange-600', 'text-orange-700', 'text-orange-800', 'text-orange-900', 'text-orange-950',
      'text-amber-50', 'text-amber-100', 'text-amber-200', 'text-amber-300', 'text-amber-400', 'text-amber-500', 'text-amber-600', 'text-amber-700', 'text-amber-800', 'text-amber-900', 'text-amber-950',
      'text-yellow-50', 'text-yellow-100', 'text-yellow-200', 'text-yellow-300', 'text-yellow-400', 'text-yellow-500', 'text-yellow-600', 'text-yellow-700', 'text-yellow-800', 'text-yellow-900', 'text-yellow-950',
      'text-lime-50', 'text-lime-100', 'text-lime-200', 'text-lime-300', 'text-lime-400', 'text-lime-500', 'text-lime-600', 'text-lime-700', 'text-lime-800', 'text-lime-900', 'text-lime-950',
      'text-green-50', 'text-green-100', 'text-green-200', 'text-green-300', 'text-green-400', 'text-green-500', 'text-green-600', 'text-green-700', 'text-green-800', 'text-green-900', 'text-green-950',
      'text-emerald-50', 'text-emerald-100', 'text-emerald-200', 'text-emerald-300', 'text-emerald-400', 'text-emerald-500', 'text-emerald-600', 'text-emerald-700', 'text-emerald-800', 'text-emerald-900', 'text-emerald-950',
      'text-teal-50', 'text-teal-100', 'text-teal-200', 'text-teal-300', 'text-teal-400', 'text-teal-500', 'text-teal-600', 'text-teal-700', 'text-teal-800', 'text-teal-900', 'text-teal-950',
      'text-cyan-50', 'text-cyan-100', 'text-cyan-200', 'text-cyan-300', 'text-cyan-400', 'text-cyan-500', 'text-cyan-600', 'text-cyan-700', 'text-cyan-800', 'text-cyan-900', 'text-cyan-950',
      'text-sky-50', 'text-sky-100', 'text-sky-200', 'text-sky-300', 'text-sky-400', 'text-sky-500', 'text-sky-600', 'text-sky-700', 'text-sky-800', 'text-sky-900', 'text-sky-950',
      'text-blue-50', 'text-blue-100', 'text-blue-200', 'text-blue-300', 'text-blue-400', 'text-blue-500', 'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900', 'text-blue-950',
      'text-indigo-50', 'text-indigo-100', 'text-indigo-200', 'text-indigo-300', 'text-indigo-400', 'text-indigo-500', 'text-indigo-600', 'text-indigo-700', 'text-indigo-800', 'text-indigo-900', 'text-indigo-950',
      'text-violet-50', 'text-violet-100', 'text-violet-200', 'text-violet-300', 'text-violet-400', 'text-violet-500', 'text-violet-600', 'text-violet-700', 'text-violet-800', 'text-violet-900', 'text-violet-950',
      'text-purple-50', 'text-purple-100', 'text-purple-200', 'text-purple-300', 'text-purple-400', 'text-purple-500', 'text-purple-600', 'text-purple-700', 'text-purple-800', 'text-purple-900', 'text-purple-950',
      'text-fuchsia-50', 'text-fuchsia-100', 'text-fuchsia-200', 'text-fuchsia-300', 'text-fuchsia-400', 'text-fuchsia-500', 'text-fuchsia-600', 'text-fuchsia-700', 'text-fuchsia-800', 'text-fuchsia-900', 'text-fuchsia-950',
      'text-pink-50', 'text-pink-100', 'text-pink-200', 'text-pink-300', 'text-pink-400', 'text-pink-500', 'text-pink-600', 'text-pink-700', 'text-pink-800', 'text-pink-900', 'text-pink-950',
      'text-rose-50', 'text-rose-100', 'text-rose-200', 'text-rose-300', 'text-rose-400', 'text-rose-500', 'text-rose-600', 'text-rose-700', 'text-rose-800', 'text-rose-900', 'text-rose-950',
      'bg-inherit', 'bg-current', 'bg-black', 'bg-white', 'bg-transparent',
    ],
  },
  {
    label: 'Backgrounds',
    key: 'backgrounds',
    color: '#64748b',
    utilities: [
      'bg-fixed', 'bg-local', 'bg-scroll', 'bg-repeat', 'bg-no-repeat', 'bg-repeat-x', 'bg-repeat-y', 'bg-repeat-round', 'bg-repeat-space',
      'bg-auto', 'bg-cover', 'bg-contain', 'bg-bottom', 'bg-center', 'bg-left', 'bg-left-bottom', 'bg-left-top', 'bg-right', 'bg-right-bottom', 'bg-right-top', 'bg-top',
      'bg-origin-border', 'bg-origin-padding', 'bg-origin-content',
      'bg-blur-none', 'bg-blur', 'bg-blur-0', 'bg-blur-sm', 'bg-blur-md', 'bg-blur-lg', 'bg-blur-xl', 'bg-blur-2xl', 'bg-blur-3xl',
    ],
  },
  {
    label: 'Borders',
    key: 'borders',
    color: '#a855f7',
    utilities: [
      'border', 'border-0', 'border-2', 'border-4', 'border-8', 'border-none',
      'border-solid', 'border-dashed', 'border-dotted', 'border-double', 'border-hidden', 'border-transparent',
      'border-inherit', 'border-current', 'border-black', 'border-white',
      'border-slate-50', 'border-slate-100', 'border-slate-200', 'border-slate-300', 'border-slate-400', 'border-slate-500', 'border-slate-600', 'border-slate-700', 'border-slate-800', 'border-slate-900', 'border-slate-950',
      'border-x', 'border-x-0', 'border-x-2', 'border-x-4', 'border-x-8',
      'border-y', 'border-y-0', 'border-y-2', 'border-y-4', 'border-y-8',
      'border-t', 'border-t-0', 'border-t-2', 'border-t-4', 'border-t-8',
      'border-r', 'border-r-0', 'border-r-2', 'border-r-4', 'border-r-8',
      'border-b', 'border-b-0', 'border-b-2', 'border-b-4', 'border-b-8',
      'border-l', 'border-l-0', 'border-l-2', 'border-l-4', 'border-l-8',
      'rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full',
      'rounded-t-none', 'rounded-t-sm', 'rounded-t', 'rounded-t-md', 'rounded-t-lg', 'rounded-t-xl', 'rounded-t-2xl', 'rounded-t-3xl', 'rounded-t-full',
      'rounded-r-none', 'rounded-r-sm', 'rounded-r', 'rounded-r-md', 'rounded-r-lg', 'rounded-r-xl', 'rounded-r-2xl', 'rounded-r-3xl', 'rounded-r-full',
      'rounded-b-none', 'rounded-b-sm', 'rounded-b', 'rounded-b-md', 'rounded-b-lg', 'rounded-b-xl', 'rounded-b-2xl', 'rounded-b-3xl', 'rounded-b-full',
      'rounded-l-none', 'rounded-l-sm', 'rounded-l', 'rounded-l-md', 'rounded-l-lg', 'rounded-l-xl', 'rounded-l-2xl', 'rounded-l-3xl', 'rounded-l-full',
      'rounded-tl-none', 'rounded-tr-none', 'rounded-br-none', 'rounded-bl-none',
      'outline-none', 'outline', 'outline-0', 'outline-1', 'outline-2', 'outline-4', 'outline-8',
      'outline-offset-0', 'outline-offset-1', 'outline-offset-2', 'outline-offset-4', 'outline-offset-8',
      'ring', 'ring-0', 'ring-1', 'ring-2', 'ring-4', 'ring-8', 'ring-inset',
      'ring-slate-50', 'ring-slate-100', 'ring-slate-200', 'ring-slate-300', 'ring-slate-400', 'ring-slate-500', 'ring-slate-600', 'ring-slate-700', 'ring-slate-800', 'ring-slate-900',
      'ring-white', 'ring-black',
    ],
  },
  {
    label: 'Effects',
    key: 'effects',
    color: '#0ea5e9',
    utilities: [
      'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl', 'shadow-none',
      'opacity-0', 'opacity-5', 'opacity-10', 'opacity-15', 'opacity-20', 'opacity-25', 'opacity-30', 'opacity-35', 'opacity-40', 'opacity-45', 'opacity-50', 'opacity-55', 'opacity-60', 'opacity-65', 'opacity-70', 'opacity-75', 'opacity-80', 'opacity-85', 'opacity-90', 'opacity-95', 'opacity-100',
      'mix-blend-normal', 'mix-blend-multiply', 'mix-blend-screen', 'mix-blend-overlay', 'mix-blend-darken', 'mix-blend-lighten', 'mix-blend-color-dodge', 'mix-blend-color-burn', 'mix-blend-hard-light', 'mix-blend-soft-light', 'mix-blend-difference', 'mix-blend-exclusion', 'mix-blend-hue', 'mix-blend-saturation', 'mix-blend-color', 'mix-blend-luminosity',
      'blur-none', 'blur-0', 'blur-sm', 'blur', 'blur-md', 'blur-lg', 'blur-xl', 'blur-2xl', 'blur-3xl',
      'backdrop-blur-none', 'backdrop-blur-0', 'backdrop-blur-sm', 'backdrop-blur', 'backdrop-blur-md', 'backdrop-blur-lg', 'backdrop-blur-xl', 'backdrop-blur-2xl', 'backdrop-blur-3xl',
      'saturate-0', 'saturate-50', 'saturate-100', 'saturate-150', 'saturate-200',
      'sepia-0', 'sepia', 'sepia-0', 'sepia-none',
      'contrast-0', 'contrast-50', 'contrast-75', 'contrast-100', 'contrast-125', 'contrast-150', 'contrast-200',
      'grayscale-0', 'grayscale', 'grayscale-50', 'grayscale-100',
      'brightness-0', 'brightness-50', 'brightness-75', 'brightness-90', 'brightness-95', 'brightness-100', 'brightness-105', 'brightness-110', 'brightness-125', 'brightness-150', 'brightness-200',
    ],
  },
  {
    label: 'Transitions',
    key: 'transitions',
    color: '#64748b',
    utilities: [
      'transition-none', 'transition-all', 'transition', 'transition-colors', 'transition-opacity', 'transition-shadow', 'transition-transform', 'transition-bounce',
      'duration-0', 'duration-75', 'duration-100', 'duration-150', 'duration-200', 'duration-300', 'duration-500', 'duration-700', 'duration-1000',
      'ease-linear', 'ease-in', 'ease-out', 'ease-in-out', 'ease-bounce',
      'delay-0', 'delay-75', 'delay-100', 'delay-150', 'delay-200', 'delay-300', 'delay-500', 'delay-700', 'delay-1000',
      'animate-none', 'animate-spin', 'animate-ping', 'animate-pulse', 'animate-bounce',
      'animate-none', 'animate-spin', 'animate-pulse', 'animate-bounce',
      'hover:animate-none', 'hover:animate-spin', 'hover:animate-ping', 'hover:animate-pulse', 'hover:animate-bounce',
    ],
  },
  {
    label: 'Transform',
    key: 'transform',
    color: '#84cc16',
    utilities: [
      'transform', 'transform-gpu', 'transform-cpu', 'transform-none',
      'translate-x-0', 'translate-x-1', 'translate-x-2', 'translate-x-3', 'translate-x-4', 'translate-x-5', 'translate-x-6', 'translate-x-8', 'translate-x-10', 'translate-x-12', 'translate-x-16', 'translate-x-full', 'translate-x-1/2', 'translate-x-1/3', 'translate-x-2/3', 'translate-x-1/4', 'translate-x-3/4', '-translate-x-0', '-translate-x-1', '-translate-x-2', '-translate-x-3', '-translate-x-4', '-translate-x-5', '-translate-x-6', '-translate-x-8', '-translate-x-10', '-translate-x-12', '-translate-x-16', '-translate-x-full', '-translate-x-1/2', '-translate-x-1/3', '-translate-x-2/3', '-translate-x-1/4', '-translate-x-3/4',
      'translate-y-0', 'translate-y-1', 'translate-y-2', 'translate-y-3', 'translate-y-4', 'translate-y-5', 'translate-y-6', 'translate-y-8', 'translate-y-10', 'translate-y-12', 'translate-y-16', 'translate-y-full', 'translate-y-1/2', 'translate-y-1/3', 'translate-y-2/3', 'translate-y-1/4', 'translate-y-3/4', '-translate-y-0', '-translate-y-1', '-translate-y-2', '-translate-y-3', '-translate-y-4', '-translate-y-5', '-translate-y-6', '-translate-y-8', '-translate-y-10', '-translate-y-12', '-translate-y-16', '-translate-y-full', '-translate-y-1/2', '-translate-y-1/3', '-translate-y-2/3', '-translate-y-1/4', '-translate-y-3/4',
      'rotate-0', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-6', 'rotate-12', 'rotate-45', 'rotate-90', 'rotate-180', '-rotate-1', '-rotate-2', '-rotate-3', '-rotate-6', '-rotate-12', '-rotate-45', '-rotate-90', '-rotate-180',
      'scale-0', 'scale-50', 'scale-75', 'scale-90', 'scale-95', 'scale-100', 'scale-105', 'scale-110', 'scale-125', 'scale-150', 'scale-x-0', 'scale-x-50', 'scale-x-75', 'scale-x-90', 'scale-x-95', 'scale-x-100', 'scale-x-105', 'scale-x-110', 'scale-x-125', 'scale-x-150', 'scale-y-0', 'scale-y-50', 'scale-y-75', 'scale-y-90', 'scale-y-95', 'scale-y-100', 'scale-y-105', 'scale-y-110', 'scale-y-125', 'scale-y-150',
      'origin-center', 'origin-top', 'origin-top-right', 'origin-right', 'origin-bottom-right', 'origin-bottom', 'origin-bottom-left', 'origin-left', 'origin-top-left',
      'perspective-none', 'perspective-orphan', 'perspective-950', 'perspective-1080', 'perspective-1280', 'perspective-1480', 'perspective-1670',
      'preserve-3d', 'preserve-flat', 'preserve-trim',
    ],
  },
  {
    label: 'Interactivity',
    key: 'interactivity',
    color: '#f43f5e',
    utilities: [
      'pointer-events-none', 'pointer-events-auto',
      'select-none', 'select-text', 'select-all', 'select-auto',
      'resize-none', 'resize', 'resize-y', 'resize-x',
      'scroll-auto', 'scroll-smooth', 'scroll-lock',
      'snap-none', 'snap-mandatory', 'snap-proximity',
      'snap-start', 'snap-end', 'snap-center', 'snap-align-none',
      'touch-none', 'touch-auto', 'touch-pan-x', 'touch-pan-y', 'touch-pan-left', 'touch-pan-right', 'touch-pan-up', 'touch-pan-down', 'touch-pinch-zoom', 'touch-manipulation',
      'cursor-auto', 'cursor-default', 'cursor-pointer', 'cursor-wait', 'cursor-text', 'cursor-move', 'cursor-help', 'cursor-not-allowed', 'cursor-none', 'cursor-context-menu', 'cursor-progress', 'cursor-cell', 'cursor-vertical-text', 'cursor-alias', 'cursor-copy', 'cursor-no-drop', 'cursor-grab', 'cursor-grabbing', 'cursor-all-scroll', 'cursor-col-resize', 'cursor-row-resize', 'cursor-n-resize', 'cursor-e-resize', 'cursor-s-resize', 'cursor-w-resize', 'cursor-ne-resize', 'cursor-nw-resize', 'cursor-se-resize', 'cursor-sw-resize', 'cursor-ew-resize', 'cursor-ns-resize', 'cursor-nesw-resize', 'cursor-nwse-resize', 'cursor-zoom-in', 'cursor-zoom-out',
    ],
  },
  {
    label: 'SVG',
    key: 'svg',
    color: '#7c3aed',
    utilities: [
      'fill-none', 'fill-current', 'fill-black', 'fill-white',
      'stroke-none', 'stroke-current', 'stroke-black', 'stroke-white',
      'stroke-0', 'stroke-1', 'stroke-2', 'stroke-3', 'stroke-4', 'stroke-6', 'stroke-8',
    ],
  },
  {
    label: 'Sizing',
    key: 'aspect',
    color: '#b45309',
    utilities: [
      'aspect-auto', 'aspect-video', 'aspect-square',
      'object-contain', 'object-cover', 'object-fill', 'object-none', 'object-scale-down',
      'object-bottom', 'object-center', 'object-left', 'object-left-bottom', 'object-left-top', 'object-right', 'object-right-bottom', 'object-right-top', 'object-top',
    ],
  },
]

// ─── Categorize a class ────────────────────────────────────────────────────────

export function categorizeClass(cls: string): string {
  for (const cat of TAILWIND_CATEGORIES) {
    if (cat.utilities.some((u) => u === cls || cls.startsWith(u.split('-')[0] + '-'))) {
      // Rough heuristic
      if (cls.startsWith('text-') || cls.startsWith('font-') || cls.includes('tracking') || cls.includes('leading') || cls.includes('whitespace') || cls.includes('break-')) return 'typography'
      if (cls.startsWith('w-') || cls.startsWith('h-') || cls.startsWith('min-w') || cls.startsWith('max-w') || cls.startsWith('min-h') || cls.startsWith('max-h')) return 'size'
      if (cls.startsWith('p-') || cls.startsWith('m-') || cls.startsWith('gap') || cls.startsWith('space')) return 'spacing'
      if (cls.startsWith('border') || cls.includes('rounded')) return 'borders'
      if (cls.startsWith('bg-') || cls.includes('bg-')) return 'colors'
      if (cls.includes('shadow') || cls.includes('opacity') || cls.includes('blur') || cls.includes('mix-blend')) return 'effects'
      if (cls.includes('flex') || cls.includes('justify') || cls.includes('items') || cls.includes('self-')) return 'flexbox'
      if (cls.includes('grid') || cls.includes('col-') || cls.includes('row-') || cls.includes('place-')) return 'grid'
      if (cls.includes('translate') || cls.includes('rotate') || cls.includes('scale') || cls.includes('origin') || cls.includes('perspective')) return 'transform'
      if (cls.includes('transition') || cls.includes('duration') || cls.includes('ease') || cls.includes('delay') || cls.includes('animate')) return 'transitions'
      if (cls.includes('ring') || cls.includes('outline')) return 'borders'
      return cat.key
    }
  }
  return 'other'
}

// ─── Generate code output ─────────────────────────────────────────────────────

export function generateHTML(tagName: string, classes: string[], id?: string): string {
  const idAttr = id ? ` id="${id}"` : ''
  return `<${tagName} class="${classes.join(' ')}"${idAttr}></${tagName}>`
}

export function generateComponent(classes: string[], componentName = 'MyComponent'): string {
  return `const ${componentName} = () => (\n  <div className="${classes.join(' ')}">\n    {/* content */}\n  </div>\n)\n\nexport default ${componentName}`
}

export function generateHTMLDocument(classes: string[]): string {
  return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Tailwind Demo</title>\n  <script src="https://cdn.tailwindcss.com"></script>\n</head>\n<body>\n  <div class="${classes.join(' ')}">\n    Hello, Tailwind!\n  </div>\n</body>\n</html>`
}

export function generateReactComponent(classes: string[]): string {
  return `import React from 'react'\n\nexport const Demo = () => (\n  <div className="${classes.join(' ')}">\n    Hello, Tailwind!\n  </div>\n)\n\nexport default Demo`
}
