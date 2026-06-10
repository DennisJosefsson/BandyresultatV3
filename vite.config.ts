import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    nitro(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    {
      name: 'markdown-loader',
      transform(code, id) {
        if (id.slice(-3) === '.md') {
          // For .md files, get the raw content
          return `export default ${JSON.stringify(code)};`
        }
      },
    },
  ],
  optimizeDeps: {
    include: ['cookie'],
  },
})

export default config
