module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,code
    };

    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
      issuer: /\.(js|ts|mjs)x?$/,
    });

    if (!isServer) {
      config.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      });
    }

    // Add the new rule for handling Sass files
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    });

    // Add this additional configuration for wasm
    config.resolve.extensions.push('.wasm');

    return config;
  },
};
