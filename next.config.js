/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  './i18n.ts'
);
const webpack = require('webpack');

const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $     : 'jquery',
        jQuery: 'jquery'
      })
    );

    return config;
  },
}

module.exports = withNextIntl({
  ...nextConfig
})
