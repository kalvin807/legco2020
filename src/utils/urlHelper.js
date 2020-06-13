/**
 * No import syntax as this is needed for gatsby-node.js (dont want to setup babel lol)
 */

const getPath = (lang, path) =>
  removePathTrailingSlash(`${lang === "zh" ? "" : `/${lang}`}${path}`)

const removePathTrailingSlash = _path =>
  _path === `/` ? _path : _path.replace(/\/$/, ``)


module.exports = {
  getPath,
  removePathTrailingSlash,
}
