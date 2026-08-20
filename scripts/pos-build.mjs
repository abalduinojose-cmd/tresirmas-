/**
 * Gera docs/sobre/index.html para a rota /sobre funcionar no GitHub Pages.
 * A cópia ganha <base href="../"> para os assets relativos do build ('./')
 * continuarem resolvendo a partir da raiz do site.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync('docs/index.html', 'utf8').replace(
  /<head>/i,
  '<head><base href="../">',
)
mkdirSync('docs/sobre', { recursive: true })
writeFileSync('docs/sobre/index.html', html)
console.log('pos-build: docs/sobre/index.html gerado')
