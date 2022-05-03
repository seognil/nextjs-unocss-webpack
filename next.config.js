const UnoCSS = require('@unocss/webpack').default
const presetUno = require('@unocss/preset-uno').default

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config, context) {
    config.plugins.push(UnoCSS({ presets: [presetUno()] }))

    return config
  },
}

module.exports = nextConfig
