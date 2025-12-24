import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mark these packages as external to prevent bundling their test files
  serverExternalPackages: [
    'thread-stream',
    'pino',
    '@walletconnect/sign-client',
    '@walletconnect/ethereum-provider',
    '@walletconnect/universal-provider'
  ],
  
  // Configure Turbopack to ignore test files
  turbopack: {
    resolveAlias: {
      // Ignore thread-stream test files
      'thread-stream/test/helper.js': '@vercel/turbopack-ecmascript-runtime/empty',
      'thread-stream/test/helper': '@vercel/turbopack-ecmascript-runtime/empty',
    },
  },
  
  // Keep webpack config for when building with --webpack flag
  webpack: (config, { isServer }) => {
    // Ignore test files in node_modules
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    config.module.rules.push({
      test: /node_modules.*\.test\.(js|mjs|ts|tsx)$/,
      use: 'ignore-loader',
    });

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Ignore specific problematic test files
      'thread-stream/test/helper.js': false,
      'thread-stream/test/helper': false,
    };
    
    return config;
  },
};

export default nextConfig;