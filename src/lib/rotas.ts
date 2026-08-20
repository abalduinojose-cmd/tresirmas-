/**
 * Rotas sem framework: o site vive na raiz e a página institucional em
 * /sobre. Os caminhos são calculados a partir da URL atual para funcionar
 * tanto em localhost quanto na subpasta do GitHub Pages.
 */

/** Caminho da raiz do site (ex.: "/" ou "/tresirmas-/"). */
export const raizDoSite = () => window.location.pathname.replace(/sobre\/?$/, '')

/** Caminho da página Sobre. */
export const rotaSobre = () => `${raizDoSite()}sobre`

/** A URL atual é a página Sobre? */
export const estaNoSobre = () => /\/sobre\/?$/.test(window.location.pathname)
