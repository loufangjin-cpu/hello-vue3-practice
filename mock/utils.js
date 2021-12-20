function requireUncached(path) {
    delete require.cache[require.resolve(path)];
    return require(path);
}

module.exports = {
    requireUncached,
};

module.exports.default = module.exports;
