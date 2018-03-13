export default (...mods) => (fileInfo, api, options) =>
  mods.reduce(
    (source, mod) =>
      source && mod({ path: fileInfo.path, source }, api, options) || source,
    fileInfo.source
  )
