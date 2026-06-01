import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync, copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, 'dist')
const PUBLIC = resolve(__dirname, 'public')

function buildExtensionPlugin() {
  return {
    name: 'build-extension',
    closeBundle() {
      const assetsDir = resolve(DIST, 'assets')
      if (!existsSync(assetsDir)) return
      const { readdirSync } = require('fs')
      const files = readdirSync(assetsDir)

      const backgroundFile = files.find((f: string) =>
        f.startsWith('background') && f.endsWith('.js')
      )
      const contentFile = files.find((f: string) =>
        f.startsWith('content') && f.endsWith('.js')
      )

      const manifestSrc = resolve(PUBLIC, 'manifest.json')
      const manifestDst = resolve(DIST, 'manifest.json')
      const manifest = JSON.parse(readFileSync(manifestSrc, 'utf-8'))

      if (backgroundFile) manifest.background.service_worker = `assets/${backgroundFile}`
      if (contentFile) manifest.content_scripts[0].js = [`assets/${contentFile}`]

      writeFileSync(manifestDst, JSON.stringify(manifest, null, 2))

      const iconsDst = resolve(DIST, 'icons')
      mkdirSync(iconsDst, { recursive: true })
      for (const f of ['icon16.png', 'icon32.png', 'icon48.png', 'icon128.png']) {
        const src = resolve(PUBLIC, 'icons', f)
        if (existsSync(src)) copyFileSync(src, resolve(iconsDst, f))
      }

      console.log('\n✅ Extension built!')
      if (backgroundFile) console.log(`   Background → assets/${backgroundFile}`)
      if (contentFile) console.log(`   Content    → assets/${contentFile}`)
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    buildExtensionPlugin(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        options: resolve(__dirname, 'options.html'),
        content: resolve(__dirname, 'src/content/contentScript.ts'),
        background: resolve(__dirname, 'src/background/serviceWorker.ts'),
      },
    },
  },
})
