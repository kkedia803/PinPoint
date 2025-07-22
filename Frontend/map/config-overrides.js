module.exports = function override(config, env) {
  const workerRule = {
    test: /mapbox-gl\/dist\/mapbox-gl-csp-worker\.js$/,
    use: { loader: 'worker-loader' },
  };

  config.module.rules.unshift(workerRule);

  return config;
};
