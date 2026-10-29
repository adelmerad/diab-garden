module.exports = function (api) {
  api.cache(true)
  return {
    // zustand's middleware uses import.meta, which the web bundle cannot run as-is
    presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
  }
}
