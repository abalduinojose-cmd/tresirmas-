/**
 * Gera docs/sobre/index.html para a rota /sobre funcionar no GitHub Pages.
 * A cópia ganha <base href="../"> (para os assets relativos do build
 * resolverem a partir da raiz) e recebe título, descrição, canonical e OG
 * próprios, senão a página nasce como duplicata da home para os buscadores.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const SITE = 'https://terraplanagemtresirmas.com.br'
const TITULO = 'Sobre a Terraplanagem Três Irmãs | Empresa familiar desde 2008'
const DESCRICAO =
  'Empresa familiar de terraplanagem fundada em 2008 em Uberlândia, MG. Conheça a história, a estrutura e o compromisso da Terraplanagem Três Irmãs com prazo, segurança e qualidade.'

const html = readFileSync('docs/index.html', 'utf8')
  .replace(/<head>/i, '<head><base href="../">')
  .replace(/<title>[\s\S]*?<\/title>/i, `<title>${TITULO}</title>`)
  .replace(
    /(<meta\s+name="description"\s+content=")[\s\S]*?(")/i,
    `$1${DESCRICAO}$2`,
  )
  .replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/i,
    `$1${SITE}/sobre$2`,
  )
  .replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*(")/i,
    `$1${TITULO}$2`,
  )
  .replace(
    /(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/i,
    `$1${DESCRICAO}$2`,
  )
  .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/i, `$1${SITE}/sobre$2`)

mkdirSync('docs/sobre', { recursive: true })
writeFileSync('docs/sobre/index.html', html)
console.log('pos-build: docs/sobre/index.html gerado com meta própria')
