import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// Dev-only: permite salvar posters gerados no navegador direto em /public
// (POST /__save-poster com { name, data: dataURL }). Não entra no build.
function savePoster(): Plugin {
  return {
    name: 'save-poster',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__save-poster', (req, res) => {
        let body = ''
        req.on('data', (c) => (body += c))
        req.on('end', () => {
          try {
            const { name, data } = JSON.parse(body) as { name: string; data: string }
            const safe = path.basename(name)
            fs.writeFileSync(path.resolve('public', safe), Buffer.from(data.split(',')[1], 'base64'))
            res.end('ok')
          } catch {
            res.statusCode = 400
            res.end('bad request')
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), savePoster()],
  server: { port: Number(process.env.PORT) || 5202 },
  base: './',
  build: { outDir: 'docs' },
})
