module.exports = (path, options) => { return options.defaultResolver(path, { ...options, packageFilter: pkg => { if (pkg.exports) { delete pkg.exports; } return pkg; } }); };
