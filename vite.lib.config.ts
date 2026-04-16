import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const isExternal = (id: string) => {
  const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf8'))

  const dependencies = new Set<string>([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {})
  ])

  for (const dependency of dependencies) {
    if (id === dependency || id.startsWith(`${dependency}/`)) {
      return true
    }
  }

  return false
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      include: ['src/package/DatePicker/**/*'],
      outDir: 'dist',
      entryRoot: 'src/package/DatePicker'
    })
  ],
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/package/DatePicker/index.tsx'),
      formats: ['es'],
      fileName: () => 'index.js',
      cssFileName: 'style'
    },
    rollupOptions: {
      external: isExternal
    }
  }
})
