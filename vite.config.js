import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// WSL's /mnt/c (DrvFs) rejects the copy_file_range syscall that Node's
// fs.copyFileSync/cpSync use, failing with EPERM. Vite's built-in public
// dir copy relies on copyFileSync, so we disable it and copy manually
// with read/write, which doesn't hit that syscall path.
function copyPublicDirPlugin(publicDir, outDir) {
  function copyRecursive(src, dest) {
    fs.mkdirSync(dest, { recursive: true })
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)
      if (entry.isDirectory()) {
        copyRecursive(srcPath, destPath)
      } else {
        fs.writeFileSync(destPath, fs.readFileSync(srcPath))
      }
    }
  }

  return {
    name: 'copy-public-dir-readwrite',
    apply: 'build',
    closeBundle() {
      if (fs.existsSync(publicDir)) copyRecursive(publicDir, outDir)
    },
  }
}

export default defineConfig(({ command }) => ({
  // Served from https://<user>.github.io/tarot_simple/, so production
  // builds need the repo name as the base path. Dev server keeps using '/'.
  base: command === 'build' ? '/tarot_simple/' : '/',
  // publicDir stays enabled (default) so the dev server keeps serving
  // public/ directly; only the build-time copy (which used copyFileSync)
  // is disabled, replaced by copyPublicDirPlugin below.
  build: {
    copyPublicDir: false,
  },
  plugins: [react(), copyPublicDirPlugin(path.resolve('public'), path.resolve('dist'))],
}))
